/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { authServices } from "../services/api/auth.service";
import { redirect } from "../redirect.navigate";
interface RepairPasswordValues {
  email: string;
}

export const RepairPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = ({ email }: RepairPasswordValues) => {
     authServices.emailRepairPassword(email).then((response: any) => {
         message.success("Email enviado com sucesso para " + email);

         navigate(redirect.redefinePasswordPage);
       })
       .catch((error: any) => {
           message.error("Error ao enviar email ");
       });

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#white",
  
      }}
    >
      <div
        style={{ backgroundColor: "white", padding: "2rem", borderRadius: 5 }}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ width: "350px", borderStyle:"solid", borderColor: "#e5e7eb", padding: "1.5rem", borderWidth: "1px", borderRadius: "0.5rem" }}
          
        >

          <Form.Item>
        <h3  style={{ textAlign: "center", fontWeight: 600, fontSize: "1.5rem"}}
         className="text-2xl font-semibold leading-none tracking-tight">
         Esqueci minha senha
          </h3>
        <p className="text-sm text-muted-foreground">Digite seu email para continuar.</p>
        </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu e-mail!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

    
          <Form.Item style={{ display: "flex", fontWeight: 500, justifyContent: "space-evenly", alignItems: "center"}}>
            <Button htmlType="submit" >
              Continuar
            </Button>
    
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
