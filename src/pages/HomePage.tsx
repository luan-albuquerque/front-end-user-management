import React from "react";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const HomePage = () => {
  return (
    <Content style={{ backgroundColor: "white", padding: '50px', textAlign: 'center' }}>
      <Title level={2}>Bem-vindo ao Sistema de Gerenciamento de Usuários</Title>
      <Paragraph>
        Este sistema permite que você gerencie os usuários de sua aplicação de forma eficiente e organizada.
      </Paragraph>
      <Paragraph>
        Comece explorando as funcionalidades disponíveis na barra de navegação acima.
      </Paragraph>
    </Content>
  );
};
