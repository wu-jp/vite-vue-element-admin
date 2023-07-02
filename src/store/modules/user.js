import { defineStore } from 'pinia';
import { getInfo, login, logout } from '@/api/base';
import { getAuthCache, setAuthCache, clearAuthCache } from '@/utils/auth';
import { useAuthStore } from '@/store/modules/auth';
import { initDynamicRouter } from '@/router/modules/dynamicRouter';

export const useUser = defineStore('user', {
  state: () => ({
    token: null,
    userInfo: null,
    sessionTimeout: false,
  }),
  getters: {
    getUserInfo(state) {
      return state.userInfo || getAuthCache('userInfo');
    },
    getToken(state) {
      return state.token || getAuthCache('token');
    },
    getSessionTimeout(state) {
      return !!state.sessionTimeout;
    },
  },
  actions: {
    setToken(info) {
      this.token = info;
      setAuthCache('token', info);
    },

    setUserInfo(info) {
      this.undefined = info;
      setAuthCache('userInfo', info);
    },
    setSessionTimeout(flag) {
      this.setSessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = undefined;
      this.sessionTimeout = false;
    },
    // login
    async login(params) {
      try {
        const { code, data, msg } = await login(params);
        if (code === 0) {
          this.setToken(data.token);
        }

        return this.afterLoginAction();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction() {
      if (!this.token) return null;
      const userInfo = await this.getUserInfoAction();
      const permissionStore = useAuthStore();
      await permissionStore.buildRoutesAction();
      await initDynamicRouter();
      return userInfo;
    },
    async getUserInfoAction() {
      if (!this.token) return null;
      const res = await getInfo();
      const { code, data } = res;
      if (code === 0) {
        this.setUserInfo(data);
        return data;
      }
    },
    async logout() {
      await logout();
      this.afterLogout();
    },
    afterLogout() {
      clearAuthCache();
      this.resetState();
    },
  },
});
