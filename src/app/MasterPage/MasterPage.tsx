import React, { ReactNode, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { DatabaseOutlined, GithubOutlined } from '@ant-design/icons';
import { Home } from '../../pages';
import Styles from '../../shared/Layouts/styles';

const { Content, Sider } = Layout;

function MasterPage() {
  const [collapsed, setCollapsed] = useState(false);
  const styles = Styles();
  const { i18n } = useTranslation();
  const items = [
    getItem('Pets', 'pets', <GithubOutlined />, '/pets'),
    getItem('Orders', 'orders', <DatabaseOutlined />, '/orders'),
  ];

  const PetsList = () => <h1>PetsList</h1>;
  const OrdersList = () => <h1>OrdersList</h1>;

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';

    i18n.changeLanguage(savedLang);
  }, [i18n]);

  return (
    <Layout hasSider style={{ height: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        style={styles.Sider}
      >
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>

      <Content style={styles.Main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetsList />} />
          <Route path="/orders" element={<OrdersList />} />
        </Routes>
      </Content>
    </Layout>
  );
}

function getItem(label: string, key: string, icon: ReactNode, path: string, children?: ReactNode) {
  return {
    key,
    icon,
    children,
    label: <Link to={path}>{label}</Link>,
  };
}

export default MasterPage;

