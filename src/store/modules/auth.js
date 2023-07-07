import { defineStore } from 'pinia';
import { useUser } from '@/store/modules/user';
import { formatMenuData, getShowMenuList, getFlatMenuList, getAllBreadcrumbList } from '@/utils';
import { staticRouter, errorRouter } from '@/router/modules/staticRouter';
import { createLocalStorage } from '@/utils/cache';
const ls = createLocalStorage();

// 菜单json文件
import menuData from '@/assets/json/authMenuList.json';
import { mockMenuListApi } from '../../api/modules/common';

export const useAuthStore = defineStore('permission', {
  state: () => ({
    // 按钮权限列表
    permCodeList: [],
    // 菜单权限列表 包含所有的路由菜单（无论在左侧菜单是否显示）
    menuList: [],
    // 活动路由（当前路由）
    activeRoute: null,
  }),
  getters: {
    // 按钮权限列表
    getPermCodeList(state) {
      return state.permCodeList;
    },
    // 菜单权限列表，这里的菜单没有经过任何处理
    authMenuListGet(state) {
      return state.menuList;
    },
    // 只会在左侧菜单显示的路由，需要过滤掉不显示的
    showMenuListGet: (state) => [
      ...getShowMenuList(staticRouter),
      ...getShowMenuList(state.menuList),
    ],
    // 扁平化之后的菜单，主要用于添加动态路由
    flatMenuListGet: (state) => getFlatMenuList(state.menuList),
    // 递归处理后的所有面包屑导航列表
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
      // 个人信息的路由菜单 && 格式化路由
      // const { menu } = userStore.getUserInfo;
      // const routes = formatMenuData(menu);
      // this.menuList = routes

      // 模拟路由
      const { data } = mockMenuListApi();
      console.log('data', data);
      this.menuList = data;
    },
  },
});
