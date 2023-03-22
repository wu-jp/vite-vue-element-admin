import { defineStore } from 'pinia';
import { reactive } from 'vue';

// Setup Stores
// 当定义一个 setup store 时，你几乎可以使用任何组合式函数，因为每一个属性都会被辨别为 state 、action 或者 getter
export const useMemberCenter = defineStore('memberCenter', () => {
  const state = reactive({
    activeRoute: null,
    viewRoutes: [],
    authNode: new Map(),
  });

  const setAuthNode = (key, data) => {
    state.authNode.set(key, data);
  };

  const setViewRoutes = (data) => {
    state.viewRoutes = data;
  };

  const setActiveRoute = (route) => {
    state.activeRoute = route;
  };

  return { state, setAuthNode, setViewRoutes, setActiveRoute };
});
