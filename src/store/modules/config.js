import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => ({
    // 折叠菜单
    isCollapse: true,
    isDark: false,
    primary: '#30336b',
  }),
  getters: {},
  actions: {
    setConfigState(...args) {
      console.log(args);
      this.$patch({ [args[0]]: args[1] });
    },
  },
});
