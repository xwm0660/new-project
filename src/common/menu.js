import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '统计',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '概览',
        path: 'Overview',
      },
      {
        name: '数据统计',
        path: 'dataReduce',
      },
      {
        name: '用户行为分析',
        path: 'actionAnal',
      },
      {
        name: '用户生命周期',
        path: 'monitor',
      },
      {
        name: '数据统计',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '渠道',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '渠道统计',
        path: 'basic-form',
      },
      {
        name: '渠道列表',
        path: 'step-form',
      },
      // {
      //   name: '高级表单',
      //   authority: 'admin',
      //   path: 'advanced-form',
      // },
    ],
  },
  {
    name: '事件',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '页面访问',
        path: 'view-visit',
      },
      {
        name: '自定义事件',
        path: 'basic-defined',
      },
      {
        name: '页面列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '系统',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '账号管理',
        path: 'basic',
      },
      {
        name: '用户管理',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  // {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   path: 'result',
  //   children: [
  //     {
  //       name: '成功',
  //       path: 'success',
  //     },
  //     {
  //       name: '失败',
  //       path: 'fail',
  //     },
  //   ],
  // },
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     {
  //       name: '404',
  //       path: '404',
  //     },
  //     {
  //       name: '500',
  //       path: '500',
  //     },
  //     {
  //       name: '触发异常',
  //       path: 'trigger',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
