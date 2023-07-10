// 静态路由
export const staticRouter = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      isHide: true,
    },
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/LayoutVertical/index.vue'),
    // component: () => import('@/layouts/LayoutTransverse/index.vue'),
    // component: () => import('@/layouts/LayoutClassic/index.vue'),
    // component: () => import('@/layouts/LayoutColumns/index.vue'),
    meta: {
      title: '工作台',
    },
    redirect: '/dashboard',
    // 所以的动态路由都添加到这里
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '数据可视化',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: {
      isHide: true,
    },
  },
];

export const errorRouter = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      isHide: true,
    },
  },
];
