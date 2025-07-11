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

const SideNav = () => (
  <Sider breakpoint="lg" collapsedWidth="0">
    <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)' }} />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['admins']}>
      {menuItems.map(item => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link href={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  </Sider>
);

export default SideNav;
