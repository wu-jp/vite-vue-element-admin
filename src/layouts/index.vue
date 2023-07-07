<template>
  <el-container class="layout">
    <el-aside>
      <div class="aside-box" :style="{ width: isCollapse ? '260px' : '64px' }">
        <Logo />
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :collapse="!isCollapse"
            :router="false"
            :unique-opened="true"
            :collapse-transition="false"
          >
            <MenuTree :menus="menu" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>

  <!--主题设置-->
  <ThemeDrawer />
</template>

<script setup>
  import { computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAuthStore } from '@/store/modules/auth';
  import { useConfigStore } from '@/store/modules/config';
  import Logo from './components/Logo/index.vue';
  import ToolBarLeft from './components/Header/ToolBarLeft.vue';
  import ToolBarRight from './components/Header/ToolBarRight.vue';
  import Main from './components/Main/index.vue';
  import MenuTree from './components/menus/menuTree.vue';
  import ThemeDrawer from '@/layouts/components/ThemeDrawer/index.vue';

  const router = useRouter();
  const route = useRoute();
  const configStore = useConfigStore();
  const authStore = useAuthStore();

  const isCollapse = computed(() => configStore.isCollapse);
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
</script>

<style scoped lang="scss">
  @import './index.scss';
  .layout {
    min-width: 730px;
  }
</style>
