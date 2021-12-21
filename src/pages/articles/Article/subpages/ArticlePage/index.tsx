import React, { createContext, useContext } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/vs.css';
import highlight from '@bytemd/plugin-highlight-ssr';
import { Button, Input } from 'antd';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import styles from './index.less';
import Release from './components/Release';
import { observer } from 'mobx-react-lite';
import ArticleStore from '@/store/Article';
import { toJS } from 'mobx';

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];
const Store = createContext(ArticleStore);

const ArticlePage: React.FC = observer(() => {
  const { current, setCurrent, setVisible, content, setContent } = useContext(Store);
  const _current = toJS(current);

  return (
    <div className={styles.content}>
      <div className={styles.row} style={{ backgroundColor: 'white' }}>
        <Input
          placeholder="输入文章标题..."
          size="large"
          style={{ border: 'none', boxShadow: 'none' }}
          value={_current.title}
          onChange={(value: any) => {
            setCurrent({ ..._current, title: value.target.value });
          }}
        />
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
        onChange={(v: any) => setContent(v)}
      />
      <Release />
    </div>
  );
});
export default ArticlePage;
