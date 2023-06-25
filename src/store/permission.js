import { defineStore } from 'pinia';
import { useUser } from '@/store/user';
import { generateIndexRouter } from '@/utils';
import { createLocalStorage } from '@/utils/cache';
import { getShowMenuList, getFlatMenuList } from '@/utils';
import { staticRouter, errorRouter } from '@/router/modules/staticRouter';

const ls = createLocalStorage();

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    // 按钮权限列表
    permCodeList: [],
    // 菜单权限列表
    menuList: [],
    // 活动路由（当前路由）
    activeRoute: null,
  }),
  getters: {
    getPermCodeList(state) {
      return state.permCodeList;
    },
    showMenuListGet: state => getShowMenuList(state.menuList),
    flatMenuListGet: state => getFlatMenuList(state.menuList),
  },
  actions: {
    setPermCodeList(codeList) {
      this.permCodeList = codeList;
    },
    setMenuList(menuList) {
      this.menuList = menuList
    },
    setActiveRoute(route) {
      this.activeRoute = route
    },
    async buildRoutesAction() {
      const userStore = useUser();
      const { menu } = userStore.getUserInfo;
      // TODO: 1.返回动态路由用于添加  2.设置菜单列表
      const routes = generateIndexRouter(menu);

      console.log('permission', routes)

      this.setMenuList(routes)
      this.setPermCodeList(routes)
      return routes;
    },
  },
});
