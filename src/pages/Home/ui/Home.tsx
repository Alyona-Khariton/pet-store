import React from 'react';
import { Flex, Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Styles from '@shared/Layouts/styles';

const { Paragraph, Title } = Typography;

function Home() {
  const { t } = useTranslation();
  const styles = Styles();

  return (
    <Layout style={{ ...styles.Content }}>
      <Flex vertical align="center" justify="center" style={{ height: '100%' }}>
        <Title>{t('homePage.title')}</Title>
        <Paragraph>{t('homePage.description')}</Paragraph>
      </Flex>
    </Layout>
  );
}

export default Home;
