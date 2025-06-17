import React, { ReactNode, useEffect, useState, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { MenuItemType } from 'antd/lib/menu/interface';
import { useTranslation } from 'react-i18next';
import { DatabaseOutlined, GithubOutlined } from '@ant-design/icons';
import { Home } from '@pages/Home';
import { PetList, PetCard } from '@pages/Pet';
import Styles from '@shared/Layouts/styles';

const { Content, Sider } = Layout;

function getItem(label: string, key: string, icon: ReactNode, path: string, children?: ReactNode) {
  return {
    key,
    icon,
    children,
    path,
    label: <Link to={path}>{label}</Link>,
  };
}

function OrdersList() {
  return <h1>OrdersList</h1>;
}

function MasterPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeyMenu, setSelectedKeyMenu] = useState<string>();
  const styles = Styles();
  const { i18n } = useTranslation();
  const items = useMemo(() => [
    getItem('Pets', 'pets', <GithubOutlined />, '/pets'),
    getItem('Orders', 'orders', <DatabaseOutlined />, '/orders'),
  ], []);

  useEffect(() => {
    const { pathname } = window.location;
    const defaultItem = items.find(item => pathname.startsWith(item.path));
    setSelectedKeyMenu(defaultItem?.key);
  }, [items]);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';

    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const handleItemMenuChange = ({ key }: MenuItemType) => {
    setSelectedKeyMenu(key.toString());
  };

  return (
    <Layout hasSider style={{ height: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        style={styles.Sider}
      >
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[selectedKeyMenu || '']}
          onClick={handleItemMenuChange}
        />
      </Sider>

      <Content style={styles.Main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetList />} />
          <Route path="/pets/:petId" element={<PetCard />} />
          <Route path="/orders" element={<OrdersList />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default MasterPage;
