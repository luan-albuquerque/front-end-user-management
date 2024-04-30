import React from "react";
import { Layout } from "antd";
import "./App.css";
import { Container } from "./App.styles";
import { NavBarComponent } from "./components/NavBarComponent";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {

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
