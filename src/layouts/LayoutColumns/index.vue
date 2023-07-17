<template>
  <el-container class="layout">
    <el-header>
      <Logo />
      <el-container class="header-ri">
        <Collapse style="margin: 0 15px 0 0" />
        <el-menu
          mode="horizontal"
          :default-active="activeMenu"
          :router="false"
          :unique-opened="true"
        >
          <template
            v-for="subItem in menu"
            :key="subItem.path"
          >
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
      </el-container>
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
      <el-container class="columns-main">
        <Main />
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from 'vue';
  import {useRouter, useRoute, onBeforeRouteUpdate} from 'vue-router';
  import { useAuthStore } from '@/store/modules/auth';
  import { useConfigStore } from '@/store/modules/config';
  import Collapse from '@/layouts/components/Header/components/Collapse.vue';
  import Logo from '../components/Logo/index.vue';
  import ToolBarRight from '../components/Header/ToolBarRight.vue';
  import ToolBarLeft from '../components/Header/ToolBarLeft.vue';
  import Main from '../components/Main/index.vue';
  import MenuTree from '../components/menus/menuTree.vue';
  import {currentRouteTopActivity} from "@/layouts/LayoutColumns/helper";

  const router = useRouter();
  const route = useRoute();
  const configStore = useConfigStore();
  const authStore = useAuthStore();

  const isCollapse = computed(() => configStore.isCollapse);
  const menu = computed(() => authStore.showMenuListGet);
  // menu 默认选中的路由，如果是详情页面则会使用 meta.activeMenu 否则使用 route.path
  const activeMenu = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.path));

  const subMenuList = ref([]);

  const currentRouteActive = (currentRoute) => {
    let routeChildren = currentRouteTopActivity(currentRoute.path, menu.value)
    if(routeChildren) {
      if(routeChildren.children && routeChildren.children.length > 0) {
        subMenuList.value = routeChildren.children
      }else {
        subMenuList.value = [routeChildren]
      }
    }else if(!subMenuList.value) {
      subMenuList.value = menu.value
    }
  }

  onMounted(() => {
    currentRouteActive(route)
  })

  onBeforeRouteUpdate((to) => {
    console.log(to)
    currentRouteActive(to)
  })
</script>

<style scoped lang="scss">
  @import 'index';
  .layout {
    min-width: 730px;
  }
</style>
