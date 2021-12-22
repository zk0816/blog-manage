import useInitial from '@/hooks/useInitail';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import React, { useRef } from 'react';
import * as API from '../../api';
import styles from './index.less';

const Category: React.FC = () => {
  const { data: categorylist, setLoading } = useInitial(API.getCategory, [], '');
  const content = useRef('');
  return (
    <div>
      <h1>分类</h1>
      <div style={{ display: 'flex' }}>
        <Input
          placeholder="请输入新的分类..."
          onChange={(v: any) => (content.current = v.target.value)}
        />
        <Button
          type="primary"
          style={{ marginLeft: 20 }}
          onClick={() => {
            API.createCategory({ categoryName: content.current })
              .then(() => {
                message.success('新建成功');
                content.current = '';
                setLoading(true);
              })
              .catch((e: any) => message.error(e.message));
          }}
        >
          新建
        </Button>
      </div>
      <div>
        {categorylist.map((e: any) => (
          <div
            key={e.categoryId}
            style={{
              display: 'flex',
              height: 40,
              borderBottom: '1px solid #f0f0f0',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1, fontSize: 15 }}>{e.categoryName}</div>
            <EditOutlined className={styles.color} style={{ marginRight: 10 }} />
            <DeleteOutlined
              className={styles.color}
              style={{ marginRight: 10 }}
              onClick={() => {
                API.deleteCategory({ categoryId: e.categoryId })
                  .then(() => {
                    message.success('新建成功');
                    content.current = '';
                    setLoading(true);
                  })
                  .catch((err: any) => message.error(err.message));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
