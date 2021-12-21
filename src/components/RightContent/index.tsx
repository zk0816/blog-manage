import { Space } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

interface Props {
  data: any;
  setData: Function;
  theme?: SiderTheme | 'realDark' | undefined;
  layout?: 'side' | 'top' | 'mix';
}

const GlobalHeaderRight: React.FC<Props> = (props) => {
  const { data, setData, theme, layout = 'side' } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <Avatar data={data} setData={setData} />
    </Space>
  );
};
export default GlobalHeaderRight;
