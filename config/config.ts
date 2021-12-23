// https://umijs.org/config/
import { defineConfig } from 'umi';

import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  // layout: {
  //   // https://umijs.org/zh-CN/plugins/plugin-layout
  //   locale: false,
  //   siderWidth: 208,
  //   ...defaultSettings,
  // },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  // dynamicImport: {
  //   loading: '@ant-design/pro-layout/es/PageLoading',
  // },
  targets: {
    chrome: 79,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    //'root-entry-name': 'default',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  base: '/',
  history: {
    type: 'hash',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: {
    type: process.env.NODE_ENV == 'development' ? 'none' : 'all',
    exclude: [],
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
