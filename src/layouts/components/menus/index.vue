<template>
  <el-menu
    active-text-color="#30336b"
    background-color="#fff"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#333"
    :collapse="!isCollapse"
  >
    <MenuTree :menus="menu" />
  </el-menu>
</template>
<!--#B4D5FF-->
<script setup>
  import MenuTree from './menuTree.vue';
  import menuData from '@/assets/menus.json';
  import { ref, watch } from 'vue';
  import { useAuthStore } from '@/store/modules/auth';

  const props = defineProps(['isCollapse']);

  const menu = ref([]);
  const permissionStore = useAuthStore();
  menu.value = permissionStore.showMenuListGet;
  console.log('💥💥💥', menu.value);

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
