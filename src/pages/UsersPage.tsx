import React, { useEffect, useState } from "react";
import { Button, Typography, Divider, Layout } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { User } from "../services/models/User.model";
import { TableComponent } from "../components/users/TableComponent";
import { usersServices } from "../services/api/users.service";
import { CreateModalComponent } from "../components/users/CreateModalComponent";

const { Title } = Typography;
const { Content } = Layout;

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        usersServices
            .listUsers()
            .then((response) => setUsers(response.data.details))
            .catch((error) => console.log(error));
    };

    return (
        
        <Layout>
      <CreateModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateUserList={fetchUsers}
      />
            <Content style={{ padding: "50px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                    <Title level={2}>Usuários</Title>
                    <Divider />
                    <Button
                    
                        icon={<PlusCircleOutlined />}
                        onClick={() => setIsModalOpen(true)}
                        style={{ marginBottom: "1rem", alignSelf: "flex-end" }}
                    >
                        Cadastrar novo usuário
                    </Button>
                    
                    <TableComponent data={users} updateUserList={fetchUsers} />
                </div>

            </Content>
        </Layout>
    );
};
