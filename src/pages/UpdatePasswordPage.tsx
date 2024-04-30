import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { authServices } from "../services/api/auth.service";
import { redirect } from "../redirect.navigate";

interface UpdatePasswordValues {
  password: string;
  confirmPassword: string;
}

interface TokenValues {
  token: string;
}

export const UpdatePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFirstFormSubmitted, setIsFirstFormSubmitted] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState("");

  const onFinish = ({password, confirmPassword}: UpdatePasswordValues) => {
    console.log({password,confirmPassword, isTokenValid});
    
    authServices
      .updatePassword(isTokenValid, password, confirmPassword)
      .then((response: any) => {
        message.success("Senha alterada com sucesso.");

        navigate(redirect.loginPage);
      })
      .catch((error: any) => {
        if (error.response.data.statusCode === 409) {
          message.error("Senha não são iguais");
        }

        if (error.response.data.statusCode === 404) {
          message.error("Dados de usuario não encontrado.");
        }

        if (error.response.data.statusCode === 401) {
          message.error("Token invalido!");
        }

        if (error.response.data.statusCode === 400) {
          message.error("Token expirado!");
          navigate(redirect.repairPasswordPage);
        }
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {

  };

  const onVerify = ({ token }: TokenValues) => {
    
    authServices
      .verifyToken(token)
      .then(() => {
        message.success("Token valido.");
        setIsTokenValid(token)
        setIsFirstFormSubmitted(true);
      })
      .catch((error: any) => {
        if (error.response.data.statusCode === 401) {
          message.error("Token invalido!");
        }

        if (error.response.data.statusCode === 400) {
          message.error("Token expirado!");
          navigate(redirect.repairPasswordPage);
        }
        console.log(error);
      });


  };

  const onVerifyFailed = (errorInfo: any) => {
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
        {!isFirstFormSubmitted && (
          <Form
            name="basic"
            onFinish={onVerify}
            onFinishFailed={onVerifyFailed}
            layout="vertical"
            style={{ width: "350px", borderStyle: "solid", borderColor: "#e5e7eb", padding: "1.5rem", borderWidth: "1px", borderRadius: "0.5rem" }}
          >
            <Form.Item>
              <h3 style={{ textAlign: "center", fontWeight: 600, fontSize: "1.5rem" }} className="text-2xl font-semibold leading-none tracking-tight">
                Verificar Token
              </h3>
              <p className="text-sm text-muted-foreground">Copie o token enviado para seu email para continuar.</p>
            </Form.Item>
            <Form.Item
              label="Token de Confirmação"
              name="token"
              rules={[{ required: true, message: "Por favor, insira seu token!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ display: "flex", fontWeight: 500, justifyContent: "space-evenly", alignItems: "center" }}>
              <Button htmlType="submit" >
                Verificar
              </Button>
            </Form.Item>
          </Form>
        )}

        {isFirstFormSubmitted && (
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            style={{ width: "350px", borderStyle: "solid", borderColor: "#e5e7eb", padding: "1.5rem", borderWidth: "1px", borderRadius: "0.5rem" }}
          >
            <Form.Item>
              <h3 style={{ textAlign: "center", fontWeight: 600, fontSize: "1.5rem" }} className="text-2xl font-semibold leading-none tracking-tight">
                Atualizar Senha
              </h3>
              <p className="text-sm text-muted-foreground">Digite sua nova senha para continuar.</p>
            </Form.Item>
            <Form.Item
              label="Nova Senha"
              name="password"
              rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirme a Senha"
              name="confirmPassword"
              rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ display: "flex", fontWeight: 500, justifyContent: "space-evenly", alignItems: "center" }}>
              <Button htmlType="submit" >
                Atualizar
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};
