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
  CompassOutlined,
  DashOutlined,
  DotChartOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

const menuItems = [
  { key: 'dashboard', icon: <DotChartOutlined />, label: 'Dashboard', path: '/dashboard' },
  { key: 'admins', icon: <UserOutlined />, label: 'Admins', path: '/admins' },
  { key: 'assistants', icon: <TeamOutlined />, label: 'Assistants', path: '/assistants' },
  // { key: 'branches', icon: <ShopOutlined />, label: 'Branches', path: '/branches' },
  { key: 'city', icon: <EnvironmentOutlined />, label: 'City', path: '/city' },
  // { key: 'containers', icon: <InboxOutlined />, label: 'Containers', path: '/containers' },
  { key: 'clients', icon: <SolutionOutlined />, label: 'Clients', path: '/customers' },
  { key: 'drivers', icon: <CarOutlined />, label: 'Drivers', path: '/drivers' },
  { key: 'jobs', icon: <FileDoneOutlined />, label: 'Jobs', path: '/jobs' },
  { key: 'jobstops', icon: <PartitionOutlined />, label: 'Job Stops', path: '/stops' },
  { key: 'trip', icon: <CompassOutlined />, label: 'Trip', path: '/trip' },
  // { key: 'load', icon: <AppstoreOutlined />, label: 'Load', path: '/load' },
  { key: 'lorry', icon: <TruckOutlined />, label: 'Lorry', path: '/lorry' },
];


import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  // Admin authentication check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const admin = localStorage.getItem('eshiftAdmin');
      const customer = localStorage.getItem('eshiftCustomer');
      if (customer && !admin) {
        // If a normal user is logged in, redirect to user dashboard
        router.replace('/user');
        return;
      }
      if (!admin) {
        router.replace('/auth/admin');
      }
    }
  }, [router]);

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
      {
        collapsed ? <img src="/mini.png" alt="Logo" style={{ width: 'auto', height: 30, margin: '16px auto', display: 'block' }} /> : <>
          <img src="/app.jpeg" alt="Logo" style={{ width: 'auto', height: 30, margin: '16px auto', display: 'block' }} />
        </>
      }
      <Menu
        theme="light" mode="inline" selectedKeys={[selectedKey]}>
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
