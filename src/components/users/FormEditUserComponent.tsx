import React, { useEffect  } from "react";
import { Button, Form, Input, Radio,  Switch, message } from "antd";
import { User } from "../../services/models/User.model";
import { usersServices } from "../../services/api/users.service";

type FieldType = {
  name: string;
  surname: string;
  email: string;
  newpassword: string;
  confirmPassword: string;
  access_level: number;
  is_enabled: boolean

};

interface EditUserFormComponentProps {
  onUserEditSuccess: () => void;
  selectedUser: User;
}

export const EditUserFormComponent: React.FC<EditUserFormComponentProps> = ({
  onUserEditSuccess,
  selectedUser,
}) => {

  const [form] = Form.useForm();   
  
  useEffect(() => {
    form.setFieldsValue(selectedUser.props); // Define os valores iniciais do formulário com base nos dados do selectedUser
  }, [selectedUser]); // Executa quando o selectedUser é alterado

  const onFinish = async (values: FieldType) => {
    try {
        
     await usersServices.updateUser({
         id: selectedUser.id,
         name: values.name,
         surname: values.surname,
         email: values.email,
         access_level: values.access_level,
         is_enabled: values.is_enabled,
         password: values.newpassword
       });
      message.success("Usuário atualizado com sucesso!");
      onUserEditSuccess();
    } catch (error) {
      message.error(`Erro ao atualizar o usuário: ${error}`);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
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
          { type: "email", message: "O formato do e-mail é inválido!" },
          { required: true, message: "Por favor, insira o e-mail!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nivel de acesso"
        name="access_level"
        rules={[{ required: true, message: "Por favor, selecione o nivel de acesso!" }]}
      >
        <Radio.Group>
          <Radio  value={1}>ADMIN</Radio>
          <Radio value={2}>STANDARD</Radio>
        </Radio.Group>
      </Form.Item>
      
      <Form.Item label="Ativo" name="is_enabled" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="newpassword"
        
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmar Senha"
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
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
          Atualizar
        </Button>
      </Form.Item>
    </Form>
  );
};
