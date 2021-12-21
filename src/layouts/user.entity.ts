export interface MenuItem {
  domain?: string;
  icon?: string;
  name?: string;
  path?: string;
  children?: MenuItem[];
}

// 模拟动态渲染
export const menuData: MenuItem[] = [
  { name: '首页', path: '/' },
  {
    name: '文章',
    children: [
      { name: '文章管理', path: '/articles/manage' },
      { name: '分类管理', path: '/articles/category' },
      { name: '标签管理', path: '/articles/tag' },
    ],
  },
];
