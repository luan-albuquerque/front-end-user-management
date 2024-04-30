/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { usersServices } from "../../services/api/users.service";

type FieldType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  access_level: number;
};

type FormCreateUserComponentProps = {
  onUserCreationSuccess: () => void;
};

export const FormCreateUserComponent: React.FC<
FormCreateUserComponentProps
> = ({ onUserCreationSuccess }) => {

  useEffect(() => {

  },
  []);

  const onFinish = (values: FieldType) => {
    const createUserDto = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      access_level: values.access_level,
    };

     usersServices
       .createUser(createUserDto)
       .then(() => {
         message.success("Usuário criado com sucesso!");
         onUserCreationSuccess();
       })
       .catch((error) => {
         message.error(error.response.data.message);
       });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="createUser"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      style={{ maxWidth: 400, margin: "auto" }}
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Por favor, insira o nome!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Sobrenome"
        name="surname"
        rules={[{ required: true, message: "Por favor, insira o sobrenome!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { type: "email", message: "Formato de e-mail inválido" },
          { required: true, message: "Por favor, insira o e-mail!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nivel de acesso"
        name="access_level"
        rules={[{ required: true, message: "Por favor, selecione um cargo!" }]}
      >
        <Radio.Group>
          <Radio  value={1}>ADMIN</Radio>
          <Radio value={2}>STANDARD</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[
          { required: true, message: "Por favor, insira uma senha!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmar Senha"
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Por favor, confirme a senha!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("As duas senhas que você digitou não coincidem!")
              );
            },
          }),
        ]}
      >
        <Input.Password />

      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
};
