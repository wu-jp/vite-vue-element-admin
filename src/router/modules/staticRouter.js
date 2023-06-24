// 静态路由
export const staticRouter = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: 'Dashboard',
      icon: '',
      type: '',
    },
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '工作台',
          icon: '',
          type: 'tab',
        },
      },
    ],
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    redirect: '/dashboard',
    children: []
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    hidden: true,
  },
]


export const errorRouter = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    hidden: true,
  },
]
