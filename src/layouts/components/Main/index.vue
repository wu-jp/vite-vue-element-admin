<template>
  <Tabs v-if="tabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup>
  import Tabs from '../Tabs/index.vue';
  import { useConfigStore } from '@/store/modules/config';
  import { computed, ref } from 'vue';
  const configStore = useConfigStore();
  const tabs = computed(() => configStore.tabs);

  const isRouterShow = ref(true);
</script>

<style scoped lang="scss">
  .el-main {
    box-sizing: border-box;
    padding: 10px 12px;
    overflow-x: hidden;
    background-color: var(--el-bg-color-page);
  }

  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.2s;
  }
  .fade-transform-enter-from {
    opacity: 0;
    transition: all 0.2s;
    transform: translateX(-30px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transition: all 0.2s;
    transform: translateX(30px);
  }
</style>
