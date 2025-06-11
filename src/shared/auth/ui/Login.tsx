import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Segmented, Typography } from 'antd';
import { useAuth } from '../context/AuthProvider';
import { login } from '../api';
import { LoginFields } from '../model';

const { Title } = Typography;

function Login() {
  const { authState, setAuthState } = useAuth();
  const [lang, setLang] = useState<string>('En');

  if (authState.isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = async ({ username, password }: LoginFields) => {
    const data = await login({ username, password });

    if (data?.code === 200) {
      setAuthState({
        token: data.message,
        isAuthenticated: true,
      });

      localStorage.setItem('token', JSON.stringify(data.message));
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Form
        id="LoginForm"
        layout="vertical"
        preserve={false}
        clearOnDestroy
        onFinish={handleLogin}
        style={{ width: '360px', padding: '32px', borderRadius: '8px', boxShadow: '0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)' }}
      >
        <Form.Item>
          <Flex justify="space-between">
            <Title level={3} style={{ margin: '0px' }}>Log in</Title>
            <Segmented options={['Ru', 'En']} value={lang} onChange={value => setLang(value)} />
          </Flex>
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true },
          ]}
        >
          <Input
            maxLength={38}
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ width: '100%' }}>Enter</Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default Login;
