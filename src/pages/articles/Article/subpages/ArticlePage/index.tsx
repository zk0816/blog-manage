import React, { createContext, useContext, useEffect, useRef } from 'react';
import { Editor } from '@bytemd/react';
import { Button, Form, Input, message } from 'antd';
import Release from './components/Release';
import { observer } from 'mobx-react-lite';
import ArticleStore from '@/store/Article';
import { toJS } from 'mobx';
import * as API from '../../api';
import _ from 'lodash';
import gfm from '@bytemd/plugin-gfm';
import highlightssr from '@bytemd/plugin-highlight-ssr';
import highlight from '@bytemd/plugin-highlight';
import breaks from '@bytemd/plugin-breaks';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import math from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import mermaid_zhHans from '@bytemd/plugin-mermaid/lib/locales/zh_Hans.json';
import math_zhHans from '@bytemd/plugin-math/lib/locales/zh_Hans.json';
import gfm_zhHans from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json';

import 'bytemd/dist/index.min.css';
import 'juejin-markdown-themes/dist/channing-cyan.min.css';
import 'highlight.js/styles/a11y-dark.css';
import styles from './index.less';

const plugins = [
  breaks(),
  footnotes(),
  frontmatter(),
  gemoji(),
  gfm({ locale: gfm_zhHans }),
  highlight(),
  highlightssr(),
  math({ locale: math_zhHans }),
  mermaid({ locale: mermaid_zhHans }),
  mediumZoom(),
  // Add more plugins here
];
const Store = createContext(ArticleStore);

const ArticlePage: React.FC = observer(() => {
  const { current, setCurrent, setVisible, content, setContent } = useContext(Store);
  const [form] = Form.useForm();
  const _current = toJS(current);

  const _test = useRef({});

  useEffect(() => {
    if (_current.title) {
      _test.current = _current;
      form.setFieldsValue({
        title: _current.title,
      });
    }
  }, [_current]);

  /**
   * 填写标题时候加入防抖写入草稿箱，
   * 使用useRef来保存草稿箱数据，
   * 是因为掘金的组件采用useRef获取的dom，
   * 无法直接使用useState保存数据
   */
  const onTitle = _.debounce((value: any) => {
    setCurrent({ ..._current, title: value });
    API.saveDraft({ ..._test.current, title: value })
      .then((res: any) => (_test.current = res.data))
      .catch((e: any) => message.error(e.message));
  }, 1000);

  const onContent = _.debounce((v: any) => {
    setContent(v);
    API.saveDraft({ ..._test.current, content: v })
      .then((res: any) => {
        _test.current = res.data;
      })
      .catch((e: any) => message.error(e.message));
  }, 1000);

  return (
    <div className={styles.content}>
      <div className={styles.row} style={{ backgroundColor: 'white' }}>
        <Form form={form} style={{ flex: 1 }}>
          <Form.Item name="title">
            <Input
              placeholder="输入文章标题..."
              size="large"
              style={{ border: 'none', boxShadow: 'none', height: 63 }}
              onChange={(e: any) => onTitle(e.target.value)}
            />
          </Form.Item>
        </Form>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <Button style={{ height: '32px', color: '#1890ff', borderColor: '#1890ff' }}>
            草稿箱
          </Button>
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Button type="primary" onClick={() => setVisible(true)}>
            发布
          </Button>
        </div>
      </div>
      <Editor
        locale={zhHans}
        value={content}
        plugins={plugins}
        onChange={(v: any) => onContent(v)}
      />
      <Release />
    </div>
  );
});
export default ArticlePage;
