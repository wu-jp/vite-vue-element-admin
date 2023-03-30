import { constantRoutes } from '@/router/index';

import { defineStore } from 'pinia';
import { reactive } from 'vue';

// Setup Stores
// 当定义一个 setup store 时，你几乎可以使用任何组合式函数，因为每一个属性都会被辨别为 state 、action 或者 getter
export const useMemberCenter = defineStore('memberCenter', () => {
  const state = reactive({
    routes: constantRoutes,
    activeRoute: null,
    viewRoutes: [],
    authNode: new Map(),
  });

  // 按钮权限
  const setAuthNode = (key, data) => {
    state.authNode.set(key, data);
  };

  // 路由菜单
  const setViewRoutes = (data) => {
    state.viewRoutes = data;
    state.routes = constantRoutes.concat(data);
  };

  // 当前路由
  const setActiveRoute = (route) => {
    state.activeRoute = route;
  };

  return { state, setAuthNode, setViewRoutes, setActiveRoute };
});
