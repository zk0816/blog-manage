import { Form, Input, message, Modal, Radio, Select, Tooltip, Upload } from 'antd';
import React, { createContext, useContext, useEffect } from 'react';
import * as API from '../../../api';
import { observer } from 'mobx-react-lite';
import ArticleStore from '@/store/Article';
import { toJS } from 'mobx';
import type { Categorty, Tag } from '../../../enitiy';
import useInitial from '@/hooks/useInitail';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/lib/upload/interface';
import COS from '@/utils/COS';

const Store = createContext(ArticleStore);

const Release: React.FC = () => {
  const { current, visible, setVisible, content } = useContext(Store);
  const [form] = Form.useForm();
  const _current = toJS(current);
  const _content = toJS(content);

  const { data: categorylist } = useInitial(API.getCategory, [], '');
  const { data: taglist } = useInitial(API.getTag, [], '');

  useEffect(() => {
    if (_current.artid) {
      form.setFieldsValue({
        categoryId: _current.category && _current.category.categoryId,
        tagId:
          _current.tag &&
          _current.tag.length > 0 &&
          _current.tag.map((e: any) => {
            return { label: e.tagName, value: e.tagId };
          }),
        thumb_url: _current.thumb_url,
        cover_url: _current.cover_url,
      });
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_current]);

  const onSumbit = (value: any) => {
    console.log('博客后台管理系统', value, 'dsdsds', _current);
    const params = {
      ...value,
      artid: _current.artid,
      title: _current.title,
      content: _content,
      categoryId: value.categoryId,
      tagId: value.tagId.map((e: any) => e.value),
    };
    console.log('ppp', params);
    API.createArticle(params)
      .then(() => {
        message.success('发布成功');
        setVisible(false);
        history.back();
      })
      .catch((e: any) => message.error(e.message));
  };

  const beforeUpload = (file: UploadFile) => {
    const imgTypeArr = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const isImg = imgTypeArr.indexOf(file.type || '') > -1;
    if (!isImg) {
      message.error('请选择png、jpg、gif、jpeg图片！');
    }
    const isLt2M = (file.size || 0) / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
    }
    return isImg && isLt2M;
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    // @ts-ignore
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <Modal
      title={
        <span
          style={{
            color: '#1d2129',
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          发布文章
        </span>
      }
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={form.submit}
      okText="确定并发布"
      width={558}
    >
      <Form form={form} onFinish={onSumbit} labelCol={{ span: 4 }} wrapperCol={{ span: 22 }}>
        <Form.Item name="categoryId" label="分类" rules={[{ required: true }]}>
          <Radio.Group>
            {categorylist.map((v: Categorty) => (
              <Tooltip title={v.categoryName} key={v.categoryId}>
                <Radio.Button
                  value={v.categoryId}
                  style={{
                    backgroundColor: '#f4f5f5',
                    width: 88,
                    marginLeft: 5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    marginBottom: 15,
                    border: 'none',
                  }}
                >
                  {v.categoryName}
                </Radio.Button>
              </Tooltip>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item name="tagId" label="标签" rules={[{ required: true }]}>
          <Select
            labelInValue
            placeholder="请选择标签"
            //onPopupScroll={(e) => onLoad(e)}
            mode="multiple"
            onSearch={() => {}}
            showSearch
            filterOption={(input: any, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 380 }}
          >
            {taglist.map((item: Tag) => (
              <Select.Option value={item.tagId} key={item.tagId}>
                {item.tagName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="thumb_url" label="文章链接">
          <Input style={{ width: 380 }} />
        </Form.Item>
        <Form.Item name="cover_url" label="封面">
          {/* <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload> */}
          <Upload
            listType="picture-card"
            showUploadList={{
              showRemoveIcon: true,
            }}
            customRequest={(data: any) => COS.cosUpload(data, `conver_${data.file.name}`)}
            beforeUpload={beforeUpload}
            onPreview={onPreview}
            maxCount={1}
          >
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">上传封面</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(Release);
