import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import apiExecutions from "../../api/apiExecutions";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const { Title } = Typography;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await apiExecutions.adminLogin({
        username: values.username,
        passwordHash: values.password,
      });
      if (res?.status === 200 || res.status === 201) {
        localStorage.setItem("eshiftAdmin", JSON.stringify(res.data));
        toast.success(<span style={{ fontSize: '14px' }} className='textStyle-small'>Login successful!</span>);
        router.push("/dashboard");
      } else {
        toast.error(<span style={{ fontSize: '14px' }} className='textStyle-small'>Login failed. Please check your credentials.</span>);
      }
    } catch (err) {
      toast.error(<span style={{ fontSize: '14px' }} className='textStyle-small'>Login failed. Please check your credentials.</span>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ToastContainer />
      <Card
        style={{
          width: 400,
          height: 300,
          borderRadius: 16,
          boxShadow: "0 2px 16px 0 rgba(50,10,107,0.10)",
        }}
      >
         <img src="/app.jpeg" alt="Logo" style={{ width: 150, marginBottom: 20, display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: 40 }} />
        <Form
          name="admin_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
              autoComplete="username"
              className="custom-Input-Field"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              className="custom-Input-Field"
              autoComplete="current-password"
            />
          </Form.Item>
          {/* <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{
                background: "#320A6B",
                borderColor: "#320A6B",
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              Login
            </Button>
          </Form.Item> */}
                        <Form.Item>
                          <Button type="primary" htmlType="submit" loading={loading} className="login-button" style={{ width: '100%', borderRadius: 12 }}>
                            <span className='textStyle-small'>
                              Log In
                            </span>
                          </Button>
                        </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;