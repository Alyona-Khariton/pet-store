import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Segmented, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthProvider';
import { login } from '../api';
import { LoginFields } from '../model';

const { Title } = Typography;

function Login() {
  const { t, i18n } = useTranslation();
  const { authState, setAuthState } = useAuth();
  const [lang, setLang] = useState<string>();

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLang(savedLang);
  }, []);

  useEffect(() => {
    if (!lang) return;

    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  }, [lang, i18n]);

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

  const handleLanguageChange = (lang: string) => {
    setLang(lang);
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
            <Title level={3} style={{ margin: '0px' }}>{t('loginPage.title')}</Title>
            <Segmented
              options={[
                {
                  label: 'Ru',
                  value: 'ru',
                },
                {
                  label: 'En',
                  value: 'en',
                },
              ]}
              value={lang}
              onChange={handleLanguageChange} 
            />
          </Flex>
        </Form.Item>

        <Form.Item
          label={t('loginPage.usernameLbl')}
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
          label={t('loginPage.passwordLbl')}
          name="password"
          rules={[
            { required: true },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ width: '100%' }}>{t('loginPage.submitBtn')}</Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default Login;
