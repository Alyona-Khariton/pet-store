import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Layout, Segmented, Space, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { findByStatus } from '@entities/pet/api';
import useRequest from '@shared/hooks/useRequest';
import { Status, Pet } from '@entities/pet/model';
import Styles from '@shared/Layouts/styles';

/* eslint-disable camelcase */
const { Title } = Typography;

interface IStatusItem {
  value: Status,
  label: string,
}

function PetList() {
  const styles = Styles();
  const { t } = useTranslation();
  const [curStatus, setCurStatus] = useState<Status>('available');

  const statusItems: IStatusItem[] = [
    {
      value: 'available',
      label: t('petList.segmentedLabel.available'),
    },
    {
      value: 'pending',
      label: t('petList.segmentedLabel.pending'),
    },
    {
      value: 'sold',
      label: t('petList.segmentedLabel.sold'),
    },
  ];

  const { isLoading, request, data } = useRequest({
    request: async (status: Status) => {
      const res = await findByStatus(status) || [];
      return res;
    },
    autoRun: false,
  });

  useEffect(() => {
    request(curStatus);
  }, [curStatus]);

  const handleStatusChange = (value : Status) => {
    setCurStatus(value);
  };

  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id',
      ellipsis: true,
      width: 200,
      render: (_: any, { id }: Pet) => <Link to={`/pets/${id}`}>{id}</Link>,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'name',
      ellipsis: true,
      width: 200,
      render: (_: any, { name }: Pet) => name,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'status',
      ellipsis: true,
      width: 200,
      render: (_: any, { status }: Pet) => status,
    },
    {
      key: 'category',
      dataIndex: 'category',
      title: 'category',
      ellipsis: true,
      width: 200,
      render: (_: any, { category }: Pet) => category?.name,
    },
    {
      key: 'photoUrls',
      dataIndex: 'photoUrls',
      title: 'photoUrls',
      ellipsis: true,
      width: 200,
      render: (_: any, { photoUrls }: Pet) => photoUrls.length,
    },
    {
      key: 'tags',
      dataIndex: 'tags',
      title: 'tags',
      ellipsis: true,
      width: 200,
      render: (_: any, { tags }: Pet) => tags.length,
    },
  ];

  return (
    <Layout>
      <Layout style={{ ...styles.Header, ...styles.ToolBar }}>
        <Space split={<Divider type="vertical" />} align="baseline">
          <Title level={3}>
            {t('petList.title')}
          </Title>

          <Segmented options={statusItems} value={curStatus} onChange={handleStatusChange} />
        </Space>
      </Layout>

      <Table
        style={{ width: '100%' }}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="rowId"
        size="small"
        scroll={{ x: '100%', y: 'calc(100vh - 69px - 39px - 56px)' }}
      />
    </Layout>
  );
}

export default PetList;
