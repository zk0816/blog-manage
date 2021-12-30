import React, { createContext, useContext } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Table, Popconfirm, message, Select } from 'antd';
import * as API from './api';
import usePagination from '@/hooks/usePagination';
import useInitial from '@/hooks/useInitail';
import moment from 'moment';
import { history } from 'umi';
import { observer } from 'mobx-react-lite';
import ArticleStore from '@/store/Article';

const { Column } = Table;
const { Option } = Select;

const Store = createContext(ArticleStore);

const Article: React.FC = observer(() => {
  const { setCurrent, setContent } = useContext(Store);
  const { list, paginationConfig, setLoading, setParams } = usePagination(API.getArticle, {
    current: 1,
    pageSize: 10,
  });
  const { data: categorylist } = useInitial(API.getCategory, [], '');
  const { data: taglist } = useInitial(API.getTag, [], '');

  function deleteHandle(id: number) {
    API.deleteArticle({ artid: id })
      .then(() => {
        message.success('删除成功');
        setLoading(true);
      })
      .catch((e: any) => {
        message.error(e.message);
      });
  }

  const onSelect = (value: any) => {
    setParams({ addrType: value }, true);
  };

  return (
    <PageHeaderWrapper title="文章管理">
      <Card>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Select
              style={{ width: 200 }}
              placeholder="请选择"
              onChange={(value) => onSelect(value)}
              allowClear
            >
              {categorylist.map((item: any) => (
                <Option key={item.categoryId} value={item.categoryId}>
                  {item.categoryName}
                </Option>
              ))}
            </Select>
            <Select
              style={{ width: 200, marginLeft: 30 }}
              placeholder="请选择"
              onChange={(value) => onSelect(value)}
              allowClear
            >
              {taglist.map((item: any) => (
                <Option key={item.tagId} value={item.tagId}>
                  {item.tagName}
                </Option>
              ))}
            </Select>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setCurrent({ title: '', content: '' });
              setContent('');
              history.push('/articles/articlepage');
            }}
          >
            写文章
          </Button>
        </div>
        <Table dataSource={list} rowKey="artid" pagination={paginationConfig}>
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
            render={(text, record: any) => <div>{record.category.categoryName}</div>}
          />
          <Column
            title="标签"
            dataIndex="tag"
            align="center"
            render={(text, record: any) => (
              <div>{record.tag.map((e: any) => e.tagName).join(',')}</div>
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
                    setContent(record.content);
                    history.push('/articles/articlepage');
                  }}
                >
                  修改
                </Button>
                <Popconfirm
                  placement="top"
                  title="确认删除？"
                  onConfirm={() => deleteHandle(record.artid)}
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

export default Article;
