// 处理动态路由
import router from "@/router/index";
import { usePermissionStore } from '@/store/permission';

const modules  = import.meta.glob("@/views/**/*.vue")
console.log(modules, 'modules')

export const initDynamicRouter = async () => {
  const permissionStore = usePermissionStore();
  console.log('扁平路由', permissionStore.flatMenuListGet)
  console.log('左侧菜单', permissionStore.showMenuListGet)

  // * 1.获取菜单列表 && 获取权限列表

  // 2. 判断当前用户有没有菜单权限

  // 3.添加动态路由
  permissionStore.flatMenuListGet.forEach(item => {
    item.children && delete item.children;
    if(item.component && typeof item.component === 'string') {
      item.component = modules['/src/views/' + item.component + '.vue']
    }
    router.addRoute('layout', item)
  })
  console.log(router.getRoutes())
}
