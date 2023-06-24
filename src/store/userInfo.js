import { defineStore } from 'pinia';
import { login } from '@/api/base';
import { useMemberCenter } from '@/store/memberCenter';
import { usePermissionStore } from './permission';
import { generateIndexRouter } from '@/utils';

export const useUserInfo = defineStore('userInfo', {
  state: () => {
    return {
      id: 0,
      username: '',
      token: '',
      refreshToken: '',
      userInfo: '',
    };
  },
  getters: {},
  actions: {
    removeToken() {
      this.token = '';
      this.refreshToken = '';
    },
    setToken(token, type) {
      this[type] = token;
    },
    getToken(type) {
      return type === 'auth' ? this.token : this.refreshToken;
    },
    isLogin() {
      return this.id && this.token;
    },
    async login(params) {
      try {
        const { code, data, msg } = await login(params);
        if (code === 0) {
          this.token = data.token;
          this.refreshToken = data.token;
          this.id = data.id;
          this.username = data.username;
          this.userInfo = data;

          // const constRoutes = generateIndexRouter(data.menu);
          // console.log('constRoutes', constRoutes);
          // const memberCenter = useMemberCenter();
          // memberCenter.setViewRoutes(constRoutes);

          const permissionStore = usePermissionStore();
          permissionStore.buildRoutesAction()
          return true;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    logout() {
      // TODO 调用接口
    },
  },
  persist: {
    key: 'userInfo',
  },
});
