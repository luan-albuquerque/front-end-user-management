import React, { useState } from "react";
import { Layout } from "antd";
import "./App.css";
import { Container } from "./App.styles";
import { NavBarComponent } from "./components/NavBarComponent";
import { Outlet } from "react-router-dom";
// import { ContentComponent } from "./components/common/Content";

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Container>
      <Layout >
       <NavBarComponent  />
       <Outlet />
      </Layout>
    </Container>
  );
};

export default App;
