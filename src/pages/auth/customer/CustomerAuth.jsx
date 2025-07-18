import React, { useState } from 'react';
import { Tabs, Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import apiExecutions from '@/pages/api/apiExecutions';

const { TabPane } = Tabs;

const passwordRules = [
  { required: true, message: 'Please input your password!' },
  { min: 8, message: 'Password must be at least 8 characters.' },
  { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter.' },
  { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter.' },
  { pattern: /[0-9]/, message: 'Password must contain at least one number.' },
  { pattern: /[^A-Za-z0-9]/, message: 'Password must contain at least one special character.' },
];

const CustomerAuth = () => {
  const [loading, setLoading] = useState(false);

  const onLogin = async (values) => {
    setLoading(true);
    try {
      const response = await apiExecutions.loginCustomer(values);
      setLoading(false);
      toast.success(response?.message || 'Login successful!');
      localStorage.setItem('eshiftCustomer', JSON.stringify(response.data));
      window.location.href = '/user';
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Failed to login');
    }
  };

  const onSignUp = async (values) => {
    let json = {
      name: values.name,
      fullName: values.fullName,
      address: values.address,
      emailAddress: values.emailAddress,
      phoneNumber: values.phoneNumber,
      password: values.password
    }
    setLoading(true);
    try {
      let response = await apiExecutions.createNewCustomer(json);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success(response?.message || 'Sign up successful!');
        localStorage.setItem('eshiftCustomer', JSON.stringify(response.data));
        window.location.href = '/user';
      } else {
        toast.error(response?.message || 'Failed to sign up');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Failed to sign up');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ToastContainer />
      <div style={{ maxWidth: 500, width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #f0f1f2', padding: 32 }}>
        <img src="/app.jpeg" alt="Logo" style={{ width: 150, marginBottom: 20, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
        <Tabs defaultActiveKey="1" centered size='small'>
          <TabPane tab="Login" key="1">
            <Form
              name="login"
              onFinish={onLogin}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item name="emailAddress" label="Email Address" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email!' }]}>
                <Input prefix={<MailOutlined />} className="custom-Input-Field" placeholder="Email Address" />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password prefix={<LockOutlined />} className="custom-Input-Field" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="login-button" style={{ width: '100%', borderRadius: 12 }}>
                  <span className='textStyle-small'>
                    Log In
                  </span>
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <Form
              name="signup"
              onFinish={onSignUp}
              layout="vertical"
              requiredMark={false}
            >
              <Row span={24}>
                <Col span={12}>
                  <Form.Item name="name" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input prefix={<UserOutlined />} className="custom-Input-Field" placeholder="Username" style={{ width: '98%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please input your full name!' }]}>
                    <Input prefix={<UserOutlined />} className="custom-Input-Field" placeholder="Full Name" style={{ width: '98%' }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!' }]}>
                    <Input prefix={<HomeOutlined />} className="custom-Input-Field" placeholder="Address" style={{ width: '98%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="emailAddress" label="Email Address" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email!' }]}>
                    <Input prefix={<MailOutlined />} className="custom-Input-Field" placeholder="Email Address" style={{ width: '98%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }, { pattern: /^\d{10,15}$/, message: 'Invalid phone number!' }]}>
                    <Input prefix={<PhoneOutlined />} className="custom-Input-Field" placeholder="Phone Number" style={{ width: '98%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback>
                    <Input.Password prefix={<LockOutlined />} className="custom-Input-Field" placeholder="Password" style={{ width: '98%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      { required: true, message: 'Please confirm your password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} className="custom-Input-Field" placeholder="Confirm Password" style={{ width: '98%' }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="login-button" style={{ width: '100%' }}>
                      <span className='textStyle-small'>
                        Sign Up
                      </span>
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerAuth;
