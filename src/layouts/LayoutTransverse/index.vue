<template>
  <el-container class="layout">
    <el-header>
      <Logo />
      <el-menu mode="horizontal" :default-active="activeMenu" :router="false" :unique-opened="true">
        <template v-for="subItem in menu" :key="subItem.path">
          <el-sub-menu
            v-if="subItem.children?.length"
            :key="subItem.path"
            :index="subItem.path + 'el-sub-menu'"
          >
            <template #title>
              <span>{{ subItem.meta.title }}</span>
            </template>
            <MenuTree :menus="subItem.children" />
          </el-sub-menu>

          <el-menu-item
            v-else
            :key="subItem.path + 'el-sub-item'"
            :index="subItem.path"
            @click="handleClickMenu(subItem)"
          >
            <template #title>
              <span>{{ subItem.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
      <ToolBarRight />
    </el-header>
    <Main />
  </el-container>

  <!--主题设置-->
  <ThemeDrawer />
</template>

<script setup>
  import Main from '@/layouts/components/Main/index.vue';
  import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
  import Logo from '@/layouts/components/Logo/index.vue';
  import MenuTree from '@/layouts/components/menus/menuTree.vue';
  import ThemeDrawer from '@/layouts/components/ThemeDrawer/index.vue';
  import { useAuthStore } from '@/store/modules/auth';
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();
  const route = useRoute();
  const menu = computed(() => authStore.showMenuListGet);
  const activeMenu = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.path));

  const handleClickMenu = (subItem) => {
    router.push(subItem.path);
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
