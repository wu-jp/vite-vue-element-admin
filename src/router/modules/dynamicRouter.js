// 处理动态路由
import router from '@/router/index';
import { useAuthStore } from '@/store/modules/auth';

const modules = import.meta.glob('@/views/**/*.vue');

/**
 * 初始化动态路由 用 addRoute 全部添加为 Layout 组件的子组件
 * @returns {Promise<void>}
 */
export const initDynamicRouter = async () => {
  const permissionStore = useAuthStore();
  // * 1.获取菜单列表 && 获取权限列表

  // 2. 判断当前用户有没有菜单权限

  // 3. 添加动态路由
  permissionStore.flatMenuListGet.forEach((item) => {
    item.children && delete item.children;
    if (item.component && typeof item.component === 'string') {
      item.component = modules['/src/views' + item.component + '.vue'];
    }
    router.addRoute('layout', item);
  });
};
