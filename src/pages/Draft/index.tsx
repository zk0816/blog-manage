import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { createContext, useContext } from 'react';
import * as API from './api';
import usePagination from '@/hooks/usePagination';
import { Button, Card, message, Popconfirm, Table } from 'antd';
import moment from 'moment';
import { history } from 'umi';
import { observer } from 'mobx-react-lite';
import ArticleStore from '@/store/Article';

const Store = createContext(ArticleStore);

const Draft: React.FC = observer(() => {
  const { setCurrent, setContent } = useContext(Store);
  const { list, paginationConfig, setLoading } = usePagination(API.getDraft, {
    current: 1,
    pageSize: 10,
  });

  const { Column } = Table;

  function deleteHandle(id: number) {
    API.deleteDraft({ id })
      .then(() => {
        message.success('删除成功');
        setLoading(true);
      })
      .catch((e: any) => {
        message.error(e.message);
      });
  }

  return (
    <PageHeaderWrapper title="草稿箱">
      <Card>
        <Table dataSource={list} rowKey="id" pagination={paginationConfig}>
          <Column title="标题" dataIndex="title" align="center" width="30%" />
          <Column
            title="发布时间"
            dataIndex="time"
            align="center"
            render={(text, record: any) => (
              <span>{moment(record.time).format('YYYY-MM-DD HH:mm')}</span>
            )}
          />
          <Column
            title="分类"
            dataIndex="category"
            align="center"
            render={(text, record: any) => <div>{record.category.categoryName || '--'}</div>}
          />
          <Column
            title="标签"
            dataIndex="tag"
            align="center"
            render={(text, record: any) => (
              <div>{record.tag.map((e: any) => e && e.tagName).join(',') || '--'}</div>
            )}
          />
          <Column
            title="文章链接"
            dataIndex="thumb_url"
            align="center"
            render={(text, record: any) => <div>{record.thumb_url || '--'}</div>}
          />
          <Column
            title="文章封面"
            dataIndex="cover_url"
            align="center"
            render={(text, record: any) => <div>{record.cover_url || '--'}</div>}
          />
          <Column
            title="操作"
            align="center"
            render={(text, record: any) => (
              <>
                <Button
                  type="link"
                  onClick={() => {
                    setCurrent(record);
                    setContent(record.content || '');
                    history.push('/articles/articlepage');
                  }}
                >
                  修改
                </Button>
                <Popconfirm
                  placement="top"
                  title="确认删除？"
                  onConfirm={() => deleteHandle(record.id)}
                >
                  <Button type="link" danger>
                    删除
                  </Button>
                </Popconfirm>
              </>
            )}
          />
        </Table>
      </Card>
    </PageHeaderWrapper>
  );
});

export default Draft;
