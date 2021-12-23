export default [
  {
    path: '/user',
    //component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user/login',
        component: './Login',
      },
    ],
    // // 不展示顶栏
    // headerRender: false,
    // // 不展示页脚
    // footerRender: false,
    // // 不展示菜单
    // menuRender: false,
    // // 不展示菜单顶栏
    // menuHeaderRender: false,
  },
  {
    path: '/',
    //authority: ['admin', 'user'],
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: './',
        component: './home',
      },
      {
        path: '/articles',
        routes: [
          {
            path: './categorytag',
            component: './articles/CategoryTag',
          },
          {
            path: './manage',
            component: './articles/Article',
          },
          {
            path: './articlepage',
            component: './articles/Article/subpages/ArticlePage',
          },
        ],
      },
      {
        path: '/draft',
        component: './Draft',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
