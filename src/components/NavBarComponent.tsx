import { Layout, Menu } from "antd";
import {
  UserOutlined,
  BarChartOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { redirect } from "../redirect.navigate";

const { Header } = Layout;

export const NavBarComponent = () => {
  const navigate = useNavigate();

  const handleMenuClick = (redirectPath: string) => {
    navigate(redirectPath);
  };

  return (
    <Header style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}>
      <div className="logo" />
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]} style={{ justifyContent: 'flex-end' }}>
        <Menu.Item key="1" onClick={() => handleMenuClick(redirect.homePage)} icon={<HomeOutlined />} style={{ color: "#000000" }}>
          Pagina Inicial
        </Menu.Item>
        <Menu.Item key="2" onClick={() => handleMenuClick(redirect.dashboradPage)} icon={<BarChartOutlined />} style={{ color: "#000000" }}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="3" onClick={() => handleMenuClick(redirect.usersPage)} icon={<UserOutlined />} style={{ color: "#000000" }}>
          Usuários
        </Menu.Item>
        <Menu.Item key="4" onClick={() => handleMenuClick(redirect.loginPage)} icon={<LogoutOutlined />} style={{ color: "#000000" }}>
          Sair
        </Menu.Item>
      </Menu>
    </Header>
  );
};
