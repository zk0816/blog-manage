import { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import * as API from '../../../api';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  current: any;
  setLoading: (v: boolean) => void;
}

const CateModal = (props: Props) => {
  const { visible, setVisible, current, setLoading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        categoryName: current.categoryName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const onSumbit = (value: any) => {
    API.createCategory({ categoryName: value.categoryName, categoryId: current.categoryId })
      .then(() => {
        setLoading(true);
        setVisible(false);
      })
      .catch((err: any) => message.error(err.message));
  };

  return (
    <Modal title="修改分类" visible={visible} onCancel={() => setVisible(false)} onOk={form.submit}>
      <Form onFinish={onSumbit} form={form}>
        <Form.Item name="categoryName" label="分类">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CateModal;
