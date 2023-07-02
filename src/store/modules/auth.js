import { defineStore } from 'pinia';
import { useUser } from '@/store/modules/user';
import { formatMenuData, getShowMenuList, getFlatMenuList, getAllBreadcrumbList } from '@/utils';
import { staticRouter, errorRouter } from '@/router/modules/staticRouter';
import { createLocalStorage } from '@/utils/cache';
const ls = createLocalStorage();

export const useAuthStore = defineStore('permission', {
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
    showMenuListGet: (state) => getShowMenuList(state.menuList),
    flatMenuListGet: (state) => getFlatMenuList(state.menuList),
    breadcrumbListGet: (state) => getAllBreadcrumbList(state.menuList),
  },
  actions: {
    setPermCodeList(codeList) {
      this.permCodeList = codeList;
    },
    setMenuList(menuList) {
      this.menuList = menuList;
    },
    setActiveRoute(route) {
      this.activeRoute = route;
    },
    // 构建路由
    async buildRoutesAction() {
      const userStore = useUser();
      // 个人信息的路由
      const { menu } = userStore.getUserInfo;
      // 转换路由
      console.log('格式化前的路由', menu);
      const routes = formatMenuData(menu);
      console.log('格式化后的路由', routes);
      this.setMenuList(routes);
      this.setPermCodeList(routes);
      return routes;
    },
  },
});
