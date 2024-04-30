import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import { redirect } from "../redirect.navigate";

export const ErrorPage = () => {
  const location = useLocation();
  const state = location.state as { errorType?: string };
  const navigate = useNavigate();
  return (
    <Result
      status={state?.errorType === "unauthorized" ? "403" : "404"}
      title={state?.errorType === "unauthorized" ? "Erro 401: Acesso não autorizado" : "Erro 404: Página não encontrada"}
      subTitle={state?.errorType === "unauthorized" ? "Você não tem permissão para acessar esta página." : "A página que você está procurando não foi encontrada."}
      extra={[
        <Button type="primary" onClick={() => navigate(redirect.homePage)}>
          <Link to="/">Voltar à Página Inicial</Link>
        </Button>,
      ]}
    />
  );
};
