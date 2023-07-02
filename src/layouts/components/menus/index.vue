<template>
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="activeMenu"
    :collapse="!isCollapse"
    active-text-color="#B33771"
    background-color="#fff"
    text-color="#333"
  >
    <MenuTree :menus="menu" />
  </el-menu>
</template>
<!--#B4D5FF-->
<script setup>
  import { useRoute } from 'vue-router';
  import MenuTree from './menuTree.vue';
  import menuData from '@/assets/menus.json';
  import { computed, ref, watch } from 'vue';
  import { useAuthStore } from '@/store/modules/auth';

  const route = useRoute();
  const props = defineProps(['isCollapse']);

  const authStore = useAuthStore();

  const menu = computed(() => authStore.showMenuListGet);
  // menu 默认选中的路由，如果是详情页面则会使用 meta.activeMenu 否则使用 route.path
  const activeMenu = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.path));

  const handleMenuRule = (routes, pathPrefix = '/', parent = '/') => {
    const menuRule = []; //这是菜单
    const authNode = []; //这是按钮

    for (const key in routes) {
      if (routes[key].type === 'menu' || routes[key].type === 'menu_dir') {
        if (
          routes[key].type === 'menu_dir' &&
          routes[key].children &&
          !routes[key].children.length
        ) {
          continue;
        }
        const currentPath = pathPrefix + routes[key].path;

        let children = [];

        if (routes[key].children && routes[key].children.length > 0) {
          children = handleMenuRule(routes[key].children, pathPrefix, currentPath);
        }

        menuRule.push({
          path: currentPath,
          name: routes[key].name,
          component: routes[key].component,
          meta: {
            title: routes[key].title,
            icon: routes[key].icon,
            keepalive: routes[key].keepalive,
            type: routes[key].menu_type,
          },
          children,
        });
      } else {
        authNode.push(pathPrefix + routes[key].name);
      }
    }

    if (authNode.length) {
      // 设置按钮节点
    }
    console.log(parent);
    return menuRule;
  };

  // 这里是从json文件拿的菜单
  // menu.value = handleMenuRule(menuData);
</script>

<style scoped>
  .el-menu-vertical-demo {
    border: 0;
  }
</style>
