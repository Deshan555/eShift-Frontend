import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  InboxOutlined,
  SolutionOutlined,
  CarOutlined,
  FileDoneOutlined,
  PartitionOutlined,
  AppstoreOutlined,
  TruckOutlined,
  CompassOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

const menuItems = [
  { key: 'admins', icon: <UserOutlined />, label: 'Admins', path: '/admins' },
  { key: 'assistants', icon: <TeamOutlined />, label: 'Assistants', path: '/assistants' },
  { key: 'branches', icon: <ShopOutlined />, label: 'Branches', path: '/branches' },
  { key: 'city', icon: <EnvironmentOutlined />, label: 'City', path: '/city' },
  { key: 'containers', icon: <InboxOutlined />, label: 'Containers', path: '/containers' },
  { key: 'clients', icon: <SolutionOutlined />, label: 'Clients', path: '/clients' },
  { key: 'drivers', icon: <CarOutlined />, label: 'Drivers', path: '/drivers' },
  { key: 'jobs', icon: <FileDoneOutlined />, label: 'Jobs', path: '/jobs' },
  { key: 'jobstops', icon: <PartitionOutlined />, label: 'Job Stops', path: '/jobstops' },
  { key: 'load', icon: <AppstoreOutlined />, label: 'Load', path: '/load' },
  { key: 'lorry', icon: <TruckOutlined />, label: 'Lorry', path: '/lorry' },
  { key: 'trip', icon: <CompassOutlined />, label: 'Trip', path: '/trip' },
];


import { useState } from 'react';
import { useRouter } from 'next/router';

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  // Find the menu item whose path matches the current route
  const selectedKey = menuItems.find(item => router.pathname.startsWith(item.path))?.key || 'admins';
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="lg"
      theme='light'
      collapsedWidth={80}
      style={{ minHeight: '100vh' }}
    >
      <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)' }} />
      <Menu theme="light" mode="inline" selectedKeys={[selectedKey]}>
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link href={item.path}><span className='poppins-regular' style={{ fontSize: 12 }}>{item.label}</span></Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideNav;
