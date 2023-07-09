import { defineStore } from 'pinia';

// 全局配置需要加到缓存中（持久化）
export const useConfigStore = defineStore('config', {
  state: () => ({
    // 折叠菜单
    isCollapse: true,
    isDark: false,
    primary: '#30336b', // 主题色
    language: 'zh',
    assemblySize: 'default',
  }),
  getters: {},
  actions: {
    setConfigState(...args) {
      console.log(args);
      this.$patch({ [args[0]]: args[1] });
    },
  },
  persist: true,
});
