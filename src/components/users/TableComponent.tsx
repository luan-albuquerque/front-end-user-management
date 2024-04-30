import React, { useEffect, useState } from "react";
import { Button, Space, Table, message } from "antd";
import { AccessLevel, User } from "../../services/models/User.model";
import { usersServices } from "../../services/api/users.service";
import { FormEditModalComponent } from "./FormEditModalComponent";

export const TableComponent = ({
  data,
  updateUserList,
}: {
  data: User[];
  updateUserList: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const deleteUser = async (id: string) => {
    try {
       await usersServices.deleteUser(id);
      updateUserList();
      message.success("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      message.error("Erro ao deletar usuário");
    }
  };

  useEffect(() => {}, [updateUserList]);

  const columns = [
    {
      title: "Nome",
      dataIndex: ["props", "name"],
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Sobrenome",
      dataIndex: ["props", "surname"],
      key: "surname",
    },
    {
      title: "E-mail",
      dataIndex: ["props", "email"],
      key: "email",
    },
    {
      title: "Nível de Acesso",
      dataIndex: ["props", "access_level"],
      key: "access_level",
      render: (accessLevel: AccessLevel) => (accessLevel === AccessLevel.ADMIN ? "ADMIN" : "STANDARD"),
    },
    {
      title: "Status",
      dataIndex: ["props", "is_enabled"],
      key: "status",
      render: (isActivated: boolean) => (isActivated ? "ATIVO" : "DESATIVADO"),
    },
    {
      title: "Ação",
      key: "action",
      render: (record: User) => (
        <Space size="middle">
          <Button style={{ color: "orange" ,borderColor: "orange"}} onClick={() => openModal(record)}>
            Editar
          </Button>
          <Button style={{ color: "red", borderColor: "red"}} onClick={() => deleteUser(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
       {selectedUser && (
        <FormEditModalComponent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedUser={selectedUser}
          updateUserList={updateUserList}
        />
      )} 
    </>
  );
};
