import React from 'react';
import { Layout } from 'antd';
import SideNav from '../components/SideNav';

const { Content } = Layout;

const DashboardLayout = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <SideNav />
    <Layout>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          {children}
        </div>
      </Content>
    </Layout>
  </Layout>
);

export default DashboardLayout;
