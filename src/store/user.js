import { defineStore } from 'pinia';
import { getInfo, login, logout } from '@/api/base';
import { getAuthCache, setAuthCache, clearAuthCache } from '@/utils/auth';
import { usePermissionStore } from '@/store/permission';
import router from '@/router';

export const useUser = defineStore('user', {
  state: () => {
    return {
      token: null,
      userInfo: null,
      roleList: [],
      sessionTimeout: false,
    };
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo || getAuthCache('userInfo');
    },
    getToken(state) {
      return state.token || getAuthCache('token');
    },
    getRuleList(state) {
      return state.roleList || getAuthCache('ruleList');
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
    setRoleList(ruleList) {
      this.roleList = ruleList;
      setAuthCache('ruleList', ruleList);
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
      this.roleList = [];
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
      // const sessionTimeout = this.sessionTimeout;

      // 调用 usePermissionStore 的方法设置路由
      const permissionStore = usePermissionStore();
      const routes = await permissionStore.buildRoutesAction();

      routes.forEach((item) => {
        router.addRoute(item);
      });
      return userInfo;
    },
    async getUserInfoAction() {
      if (!this.token) return null;
      const res = await getInfo();
      const { code, data } = res;
      if (code === 0) {
        const userInfo = data;
        console.log('userInfo', userInfo);
        const { roles = [] } = userInfo;
        if (Array.isArray(roles)) {
          this.setRoleList(roles);
        } else {
          userInfo.rules = [];
          this.setRoleList([]);
        }

        this.setUserInfo(userInfo);
        return userInfo;
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
