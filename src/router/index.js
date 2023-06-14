import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';
import pageView from '@/layouts/page/index.vue';
import { useUserInfo } from '@/store/userInfo';
import { generateIndexRouter } from '@/utils';
import { useMemberCenter } from '@/store/memberCenter';
import { useUser } from '@/store/user';
import { usePermissionStore } from '@/store/permission';

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
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
    path: '/system',
    component: Layout,
    meta: {
      title: '我的系统',
      icon: '',
      type: 'tab',
    },
    children: [
      {
        path: '/system/auth',
        name: 'auth',
        meta: {
          title: '权限管理',
          icon: '',
          type: '',
        },
        component: pageView,
        children: [
          {
            path: '/system/auth/admin',
            meta: {
              title: '用户列表',
              icon: '',
              type: 'tab',
            },
            component: () => import('@/views/auth/admin/index.vue'),
          },
          {
            path: '/system/auth/menu',
            meta: {
              title: '菜单列表',
              icon: '',
              type: 'tab',
            },
            component: () => import('@/views/auth/menu/index.vue'),
          },
          {
            path: '/system/auth/role',
            meta: {
              title: '角色列表',
              icon: '',
              type: 'tab',
            },
            component: () => import('@/views/auth/role/index.vue'),
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

router.beforeEach(async (to, from, next) => {
  // 1. 进度条

  // 2. 设置标题

  // 3. 获取token
  const userInfo = useUserInfo();

  const memberCenter = useMemberCenter();

  // 4. 判断是否缓存路由

  // console.log('⬇️', router.getRoutes());

  // 5. 判断token
  // let isLogin = userInfo.isLogin();

  const userStore = useUser();
  const token = userStore.getToken;

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const permissionStore = usePermissionStore();
      let routes = permissionStore.getPermCodeList;
      if (routes.length === 0) {
        console.log('从个人信息中获取');
        // 重新添加路由
        routes = await permissionStore.buildRoutesAction();
        console.log(routes, '1111111111');
        routes.forEach((item) => {
          console.log('item', item);
          router.addRoute(item);
        });
        next({ ...to, replace: true });
      } else {
        console.log('直接跳转');
        next();
      }
      // if (memberCenter.state.viewRoutes.length === 0) {
      //   // 从登录的缓存中获取动态路由
      //   const routes = generateIndexRouter(userInfo.userInfo.menu);
      //
      //   routes.forEach((item) => {
      //     router.addRoute(item);
      //   });
      //
      //   memberCenter.setViewRoutes(routes);
      //
      //   next({ ...to, replace: true });
      // } else {
      //   next();
      // }
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
