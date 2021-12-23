import { Button, Input, message, Tag } from 'antd';
import React, { useState } from 'react';
import * as API from '../../api';
import useInitial from '@/hooks/useInitail';

const TagPage: React.FC = () => {
  const { data: taglist, setLoading } = useInitial(API.getTag, [], '');
  const [content, setContent] = useState('');
  return (
    <div>
      <h1>标签</h1>
      <div style={{ display: 'flex' }}>
        <Input
          placeholder="请输入新的标签..."
          value={content}
          onChange={(v: any) => setContent(v.target.value)}
        />
        <Button
          type="primary"
          style={{ marginLeft: 20 }}
          onClick={() => {
            if (content === '') {
              message.warning('请输入新的标签');
            } else {
              API.createTag({ tagName: content })
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
        {taglist.map((e: any) => {
          return (
            <Tag
              closable
              key={e.tagId}
              style={{
                marginTop: 10,
                //height: 30,
                lineHeight: '30px',
              }}
              color={e.tagColor}
              onClose={() => {
                API.deleteTag({ tagId: e.tagId })
                  .then(() => {})
                  .catch((err: any) => message.error(err.message));
              }}
            >
              {e.tagName}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default TagPage;
