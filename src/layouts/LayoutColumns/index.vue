<template>
  <el-container class="layout">
    <el-header>
      <!--<el-scrollbar></el-scrollbar>-->

      <!--<ToolBarLeft />-->
      <Logo />
      <Collapse />
      <div class="split-list">
        <div
          v-for="item in menu"
          :key="item.path"
          class="split-item"
          @click="changeSubMenu(item)"
          :class="{
            'split-active':
              splitActive === item.path || `/${splitActive.split('/')[1]}` === item.path,
          }"
        >
          <span class="title"> {{ item.meta.title }}</span>
        </div>
      </div>
      <ToolBarRight />
    </el-header>

    <el-container>
      <el-aside
        :class="{ 'not-aside': !subMenuList.length }"
        :style="{ width: !isCollapse ? '64px' : '260px' }"
      >
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :collapse="!isCollapse"
            :router="false"
            :unique-opened="true"
            :collapse-transition="false"
          >
            <MenuTree :menus="subMenuList" />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <Main />
    </el-container>
  </el-container>

  <!--主题设置-->
  <ThemeDrawer />
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAuthStore } from '@/store/modules/auth';
  import { useConfigStore } from '@/store/modules/config';
  import Collapse from '@/layouts/components/Header/components/Collapse.vue';
  import Logo from '../components/Logo/index.vue';
  import ToolBarRight from '../components/Header/ToolBarRight.vue';
  import ToolBarLeft from '../components/Header/ToolBarLeft.vue';
  import Main from '../components/Main/index.vue';
  import MenuTree from '../components/menus/menuTree.vue';
  import ThemeDrawer from '@/layouts/components/ThemeDrawer/index.vue';

  const router = useRouter();
  const route = useRoute();
  const configStore = useConfigStore();
  const authStore = useAuthStore();

  const isCollapse = computed(() => configStore.isCollapse);
  const menu = computed(() => authStore.showMenuListGet);
  // menu 默认选中的路由，如果是详情页面则会使用 meta.activeMenu 否则使用 route.path
  const activeMenu = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.path));

  const subMenuList = ref([]);
  const splitActive = ref('');
  const changeSubMenu = (item) => {
    splitActive.value = item.path;
    if (item.children?.length) return (subMenuList.value = item.children);
    subMenuList.value = [];
    router.push(item.path);
  };
</script>

<style scoped lang="scss">
  @import 'index';
  .layout {
    min-width: 730px;
  }
</style>
