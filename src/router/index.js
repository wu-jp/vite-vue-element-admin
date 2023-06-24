import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';
import { useUserInfo } from '@/store/userInfo';
import { generateIndexRouter } from '@/utils';
import { useMemberCenter } from '@/store/memberCenter';
import { useUser } from '@/store/user';
import { usePermissionStore } from '@/store/permission';
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
      let routes = permissionStore.permCodeList;
      if (routes.length === 0) {
        console.log('从个人信息中获取');
        // 重新添加路由
        routes = await permissionStore.buildRoutesAction();
        await initDynamicRouter()
        next({ ...to, replace: true });
      } else {
        console.log('直接跳转', to);
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
