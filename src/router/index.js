import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';
import pageView from '@/layouts/page/index.vue';
import { useUserInfo } from '@/store/userInfo';

const routes = [
  {
    path: '/',
    component: Layout,
  },
  {
    path: '/system',
    component: Layout,
    children: [
      {
        path: 'auth',
        // component: () => import('@/views/auth/index.vue'),
        component: pageView,
        // redirect: '/system/auth/group',
        children: [
          {
            path: 'group',
            component: () => import('@/views/auth/group.vue'),
          },
          {
            path: 'admin',
            component: () => import('@/views/auth/admin.vue'),
          },
        ],
      },
    ],
  },

  {
    path: '/about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/404',
    component: () => import('../views/404.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 1. 进度条

  // 2. 设置标题

  // 3. 获取token
  const userInfo = useUserInfo();
  let isLogin = userInfo.isLogin();
  console.log('isLogin', isLogin);

  // 4. 判断是否缓存路由
  if (true) {
    // 从登录的缓存中获取动态路由
  }

  // 5. 判断token

  if (isLogin) {
    if (to.path === '/login') {
      next({ path: '/' });
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({ name: 'Login' });
    }
  }
});

router.afterEach(() => {
  // 结束进度条
});

export default router;
