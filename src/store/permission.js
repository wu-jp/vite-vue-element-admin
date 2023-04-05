import { defineStore } from 'pinia';
import { useUser } from '@/store/user';
import { generateIndexRouter } from '@/utils';
import { createLocalStorage } from '@/utils/cache';
import { constantRoutes } from '@/router/index';

const ls = createLocalStorage();

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permCodeList: [],
    menuList: [],
  }),
  getters: {
    getPermCodeList(state) {
      return state.permCodeList;
    },
    getMenuList(state) {
      return state.menuList;
    },
  },
  actions: {
    setPermCodeList(codeList) {
      this.permCodeList = codeList;
    },
    setMenuList(menuList) {
      this.menuList = constantRoutes.concat(menuList);
    },
    async buildRoutesAction() {
      const userStore = useUser();
      const { menu } = userStore.getUserInfo;

      // TODO: 1.返回动态路由用于添加  2.设置菜单列表
      const routes = generateIndexRouter(menu);
      this.setPermCodeList(routes);
      this.setMenuList(routes);
      return routes;
    },
  },
});
