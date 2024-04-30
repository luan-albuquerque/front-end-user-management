import { Divider, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { PieChartComponent } from "../components/dashborad/PieChartComponent";
import Title from "antd/es/typography/Title";


export const DashboradPage: React.FC = () => {
    const data = [
        {
          status: true,
          type: "Admin", //Admin
          count: "13"
        },
        {
            status: false,
            type: "Admin", // admin
            count: "5"
          },
          {
            status: true,
            type: "Standard", // STANDARD
            count: "7"
          },
        {
          status: false,
          type: "Standard",
          count: "2"
        }
      ]

    return (
        <Layout>
            <Content style={{ padding: "50px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <div>
                    <Title level={2}>Dashboard</Title>
                    <Divider />
                    <div style={{ display: "flex", gap: 3, justifyContent: "center", alignItems: "center", minWidth: "100vw", textAlign: "center" }}  >
                        <div>
                            <Title level={3}>Todos</Title>
                            <PieChartComponent data={data} />
                        </div>
                        <div>
                            <Title level={3}>Usuarios Admin</Title>
                            <PieChartComponent data={data.filter((e)=> e.type == "Admin")} />
                        </div>
                        <div>
                            <Title level={3}>Usuarios Standard</Title>
                            <PieChartComponent data={data.filter((e)=> e.type == "Standard")} />
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};
