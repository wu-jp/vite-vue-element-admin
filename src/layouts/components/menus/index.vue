<template>
  <el-menu
    active-text-color="#409eff"
    background-color="#fff"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#333"
    :collapse="!isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <MenuTree :menus="menu" />
  </el-menu>
</template>
<!--#B4D5FF-->
<script setup>
  import MenuTree from './menuTree.vue';
  import menuData from '@/assets/menus.json';
  import { ref, watch } from 'vue';
  import { useMemberCenter } from '@/store/memberCenter';

  const props = defineProps(['isCollapse']);

  watch(
    () => props.isCollapse,
    (value) => {
      console.log('watch', value);
    },
  );

  const menu = ref([]);

  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath);
  };
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath);
  };

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
          mate: {
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
      const memberCenter = useMemberCenter();
      memberCenter.setAuthNode(parent, authNode);
    }
    console.log(parent);
    return menuRule;
  };

  menu.value = handleMenuRule(menuData);
</script>

<style scoped>
  .el-menu-vertical-demo {
    border: 0;
  }
</style>
