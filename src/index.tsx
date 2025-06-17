import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { I18nextProvider } from 'react-i18next';
import i18n from './shared/translate/i18n';
import './app/index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './shared/auth/context/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <I18nextProvider i18n={i18n}>
    <AuthProvider>
      <ConfigProvider
        form={{ requiredMark: false, scrollToFirstError: true }}
      >
        <App />
      </ConfigProvider>
    </AuthProvider>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
