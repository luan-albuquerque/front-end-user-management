import { Divider, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { PieChartComponent } from "../components/dashborad/PieChartComponent";
import Title from "antd/es/typography/Title";
import { usersServices } from "../services/api/users.service";

interface DataItem {
  status: boolean;
  type: number;
  count: string;
}


interface DataItemTransform {
    status: boolean;
    type: string;
    count: string;
  }

export const DashboradPage: React.FC = () => {

    const [users, setUsers] = useState<DataItemTransform[]>([]);

    function convertType(type: number) {
        switch (type) {
          case 1:
            return "Admin";
          case 2:
            return "Standard";
          default:
            return "";
        }
      }
      
      function transformData(data: DataItem[]) {
        return data.map((item: DataItem) => ({
          ...item,
          type: convertType(item.type)
        }));
      }


    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = () => {
        usersServices
            .listDataUsersDashboard()
            .then((response: any) => setUsers(transformData(response.data.details)))
            .catch((error: any) => console.log(error));
    };

      

    return (
        <Layout>
            <Content style={{ padding: "50px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <div>
                    <Title level={2}>Dashboard</Title>
                    <Divider />
                    <div style={{ display: "flex", gap: 3, justifyContent: "center", alignItems: "center", minWidth: "100vw", textAlign: "center" }}  >
                        <div>
                            <Title level={3}>Todos</Title>
                            <PieChartComponent data={users} />
                        </div>
                        <div>
                            <Title level={3}>Usuarios Admin</Title>
                            <PieChartComponent data={users.filter((e)=> e.type == "Admin")} />
                        </div>
                        <div>
                            <Title level={3}>Usuarios Standard</Title>
                            <PieChartComponent data={users.filter((e)=> e.type == "Standard")} />
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};
