import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => ({
    // 折叠菜单
    isCollapse: true,
  }),
  getters: {},
  actions: {
    setConfigState(...args) {
      console.log(args);
      this.$patch({ [args[0]]: args[1] });
    },
  },
});
