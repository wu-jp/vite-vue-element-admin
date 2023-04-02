import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';
import pageView from '@/layouts/page/index.vue';
import { useUserInfo } from '@/store/userInfo';
import { generateIndexRouter } from '@/utils';
import { useMemberCenter } from '@/store/memberCenter';

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    hidden: true,
  },
  {
    path: '/dashboard',
    meta: {
      title: '工作台',
      icon: '',
      type: '',
    },
    component: () => import('@/views/dashboard.vue'),
  },
  {
    path: '/system',
    component: Layout,
    meta: {
      title: '系统',
      icon: '',
      type: 'tab',
    },
    children: [
      {
        path: 'auth',
        name: 'auth',
        meta: {
          title: '权限管理',
          icon: '',
          type: '',
        },
        component: pageView,
        children: [
          {
            path: 'group',
            meta: {
              title: '角色管理',
              icon: '',
              type: 'tab',
            },
            component: () => import('@/views/auth/group.vue'),
          },
          {
            path: 'menu',
            meta: {
              title: '菜单管理',
              icon: '',
              type: 'tab',
            },
            component: () => import('@/views/auth/menu.vue'),
          },
          {
            path: 'admin',
            meta: {
              title: '管理员管理',
              icon: '',
              type: 'tab',
            },
            component: () => import('@/views/auth/admin.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    component: () => import('../views/404.vue'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue'),
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

router.beforeEach((to, from, next) => {
  // 1. 进度条

  // 2. 设置标题

  // 3. 获取token
  const userInfo = useUserInfo();

  const memberCenter = useMemberCenter();

  // 4. 判断是否缓存路由
  if (memberCenter.state.viewRoutes.length === 0) {
    // 从登录的缓存中获取动态路由
    const routes = generateIndexRouter(userInfo.userInfo.menu);

    routes.forEach((item) => {
      router.addRoute(item);
    });

    memberCenter.setViewRoutes(routes);

    next({ ...to, replace: true });
  }

  // console.log('⬇️', router.getRoutes());

  // 5. 判断token
  let isLogin = userInfo.isLogin();
  if (isLogin) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
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
