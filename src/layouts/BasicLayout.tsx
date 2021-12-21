import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import ProLayout, { WaterMark } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { useIntl, Link, history } from 'umi';
import RightContent from '@/components/RightContent';
import settings from '../../config/defaultSettings';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';
import { menuData } from './user.entity';
import { userInfoApi } from '@/common/api';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  settings: any;
  dispatch: any;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const loginPath = '/user/login';

const BasicLayout: React.FC<BasicLayoutProps> = ({ dispatch, children, ...other }) => {
  const { formatMessage } = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState({});

  async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: any;
    fetchUserInfo?: () => Promise<any>;
  }> {
    const fetchUserInfo = async () => {
      try {
        const msg = await userInfoApi();
        return msg.data;
      } catch (error) {
        history.push(loginPath);
      }
      return undefined;
    };
    // 如果是登录页面，不执行
    if (history.location.pathname !== loginPath) {
      const currentUser = await fetchUserInfo();
      return {
        fetchUserInfo,
        currentUser,
        settings: {},
      };
    }
    return {
      fetchUserInfo,
      settings: {},
    };
  }

  useEffect(() => {
    getInitialState().then((e: any) => setData(e));
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <ProLayout
        onCollapse={(playload) => setCollapsed(playload)}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path || ''}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        menuDataRender={() => menuData as MenuDataItem[]}
        formatMessage={formatMessage}
        rightContentRender={(rightProps) => (
          <RightContent
            theme={rightProps.navTheme}
            layout={rightProps.layout}
            data={data}
            setData={setData}
          />
        )}
        collapsed={collapsed}
        {...other}
        {...settings}
      >
        <WaterMark content="小康博客" fontSize={18}>
          {children}
        </WaterMark>
      </ProLayout>
    </ConfigProvider>
  );
};

export default BasicLayout;
