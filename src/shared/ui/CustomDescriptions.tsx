import React from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Text } = Typography;

function CustomDescriptions(props: any) {
  return (
    <ProDescriptions
      colon={false}
      column={1}
      emptyText={<Text disabled>Not specified</Text>}
      styles={{ label: { width: '50%' } }}
      {...props}
    />
  );
}

export default CustomDescriptions;
