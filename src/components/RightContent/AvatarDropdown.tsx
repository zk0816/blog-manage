import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history } from 'umi';
// import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import type { MenuInfo } from 'rc-menu/lib/interface';

export type GlobalHeaderRightProps = {
  data: any;
  setData: Function;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
// const loginOut = async () => {
//   await outLogin();
//   const { query = {}, search, pathname } = history.location;
//   const { redirect } = query;
//   // Note: There may be security issues, please note
//   if (window.location.pathname !== '/user/login' && !redirect) {
//     history.replace({
//       pathname: '/user/login',
//       search: stringify({
//         redirect: pathname + search,
//       }),
//     });
//   }
// };
const loginOut = () => {
  history.replace('/user/login');
  localStorage.clear();
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = (props) => {
  const { data, setData } = props;

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setData({});
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setData],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!data) {
    return loading;
  }

  const { currentUser } = data;

  if (!currentUser || !currentUser.userName) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.userName}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
