import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { authServices } from "../services/api/auth.service";
import { redirect } from "../redirect.navigate";

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = ({ email, password }: LoginFormValues) => {
    authServices
      .login(email, password)
      .then((response: any) => {
        localStorage.setItem("token", response.data);
        message.success("Login realizado com sucesso");
        navigate(redirect.homePage);
      })
      .catch((error: any) => {
        if (error.response.data.statusCode === 401) {
          message.error("Credenciais inválidas");
        }
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleForgotPassword = () => {
    navigate(redirect.repairPasswordPage);

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
          style={{
            width: "350px",
            borderStyle: "solid",
            borderColor: "#e5e7eb",
            padding: "1.5rem",
            borderWidth: "1px",
            borderRadius: "0.5rem",
          }}
        >
          <Form.Item>
            <h3
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "1.5rem",
              }}
              className="text-2xl font-semibold leading-none tracking-tight"
            >
              Gerenciamento de Usuarios
            </h3>
            <p className="text-sm text-muted-foreground">
              Faça login para continuar.
            </p>
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

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: "Por favor, insira sua senha!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              fontWeight: 500,
              justifyContent: "space-between",
            }}
          >
            <Button htmlType="submit">
              Entrar
            </Button>
            <Button  onClick={handleForgotPassword}>
              Esqueci minha senha
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
