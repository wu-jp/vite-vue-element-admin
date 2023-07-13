import { defineStore } from 'pinia';

export const useTabsStore = defineStore('tabs', {
  state: () => {
    tabsMenuList: [];
  },
  actions: {
    async addTabs(tabItem) {},
    async removeTabs(tabPath, isCurrent = true) {},
    async closeMultipleTab(tabsMenuValue) {},
    async setTabs(tabsMenuList) {},
    async setTabsTitle(title) {},
  },
  persist: true,
});
