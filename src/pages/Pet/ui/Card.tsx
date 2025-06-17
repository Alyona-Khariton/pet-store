import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Styles from '@shared/Layouts/styles';
import { Layout, Typography } from 'antd';
import useRequest from '@shared/hooks/useRequest';
import { getPetById } from '@entities/pet/api';
import { CustomDescriptions } from '@shared/ui';

const { Title } = Typography;

function PetCard() {
  const styles = Styles();
  const { petId } = useParams();
  const { isLoading, data, request } = useRequest({ request: getPetById, autoRun: false });

  useEffect(() => {
    request(petId);
  }, [petId]);

  const attributes = useMemo(() => {
    if (!data) return [];

    return [
      {
        key: 'name',
        label: 'name',
        children: data.name,
      },
    ];
  }, [data]);

  return (
    <Layout>
      <Layout style={{ ...styles.Header, ...styles.ToolBar }}>
        <Title level={3}>
          {data && data.name}
        </Title>
      </Layout>

      <Layout style={styles.Content}>
        <CustomDescriptions loading={isLoading} columns={attributes} style={{ width: 425 }} />
      </Layout>
    </Layout>
  );
}

export default PetCard;
