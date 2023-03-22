import { defineStore } from 'pinia';

export const useUserInfo = defineStore('userInfo', {
  state: () => {
    return {
      id: 0,
      username: '',
      nickname: '',
      token: '',
      refreshToken: '',
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
    logout() {
      // TODO 调用接口
    },
  },
});
