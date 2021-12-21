import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import React from 'react';
import { Link, useIntl } from 'umi';
import styles from './UserLayout.less';

const UserLayout: React.FC<any> = (props) => {
  const { formatMessage } = useIntl();
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);

  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.lang}>{/* <SelectLang /> */}</div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>小康博客后台管理系统</span>
              </Link>
            </div>
            <div className={styles.desc}>欢迎使用！</div>
          </div>
          {children}
        </div>
      </div>
    </DocumentTitle>
  );
};

export default UserLayout;
