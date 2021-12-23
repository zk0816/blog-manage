import useInitial from '@/hooks/useInitail';
import { BookOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, message, Popconfirm } from 'antd';
import React, { useState } from 'react';
import * as API from '../../api';
import styles from './index.less';
import CateModal from './components/CateModal';

const Category: React.FC = () => {
  const { data: categorylist, setLoading } = useInitial(API.getCategory, [], '');
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  return (
    <div>
      <h1>分类</h1>
      <div style={{ display: 'flex' }}>
        <Input
          placeholder="请输入新的分类..."
          value={content}
          onChange={(v: any) => setContent(v.target.value)}
        />
        <Button
          type="primary"
          style={{ marginLeft: 20 }}
          onClick={() => {
            if (content === '') {
              message.warning('请输入新的分类');
            } else {
              API.createCategory({ categoryName: content })
                .then(() => {
                  message.success('新建成功');
                  setContent('');
                  setLoading(true);
                })
                .catch((e: any) => message.error(e.message));
            }
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
            className={styles.icon}
          >
            <div style={{ flex: 1, fontSize: 15 }}>
              <BookOutlined style={{ color: '#1890ff' }} />
              {`《${e.categoryName}》`}
            </div>
            <EditOutlined
              className={styles.color}
              style={{ marginRight: 10 }}
              onClick={() => {
                setCurrent(e);
                setVisible(true);
              }}
            />
            <Popconfirm
              title="是否删除该分类？"
              onConfirm={() => {
                API.deleteCategory({ categoryId: e.categoryId })
                  .then(() => {
                    message.success('删除成功');
                    setLoading(true);
                  })
                  .catch((err: any) => message.error(err.message));
              }}
            >
              <DeleteOutlined className={styles.color} style={{ marginRight: 10 }} />
            </Popconfirm>
          </div>
        ))}
      </div>
      <CateModal
        visible={visible}
        setVisible={setVisible}
        current={current}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Category;
