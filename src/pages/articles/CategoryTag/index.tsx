import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';
import Category from '@/pages/articles/CategoryTag/components/Category';
import Tag from '@/pages/articles/CategoryTag/components/Tag';

const CategoryTag: React.FC = () => {
  return (
    <PageHeaderWrapper title="分类和标签管理">
      <div style={{ display: 'flex' }}>
        <Card style={{ flex: 1 }}>
          <Category />
        </Card>
        <Card style={{ flex: 1, marginLeft: 20 }}>
          <Tag />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default CategoryTag;
