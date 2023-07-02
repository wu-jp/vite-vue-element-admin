import { createRouter, createWebHistory } from 'vue-router';
import { useUser } from '@/store/modules/user';
import { useAuthStore } from '@/store/modules/auth';
import { initDynamicRouter } from '@/router/modules/dynamicRouter';

import { staticRouter, errorRouter } from './modules/staticRouter';

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRouter, ...errorRouter],
});

router.beforeEach(async (to, from, next) => {
  // 1. 进度条

  // 2. 设置标题

  // 3. 获取token

  // 4. 判断是否缓存路由

  // 5. 判断token

  const userStore = useUser();
  const token = userStore.getToken;

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const permissionStore = useAuthStore();
      let routes = permissionStore.permCodeList;
      if (routes.length === 0) {
        // 重新添加路由
        await permissionStore.buildRoutesAction();
        await initDynamicRouter();
        next({ ...to, replace: true });
      } else {
        const authStore = useAuthStore();
        authStore.setActiveRoute(to);
        next();
      }
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
