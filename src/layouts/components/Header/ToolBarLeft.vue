<template>
  <div style="display: flex; align-items: center">
    <el-icon v-if="!isCollapse" :size="20" @click="changeCollapse">
      <Expand />
    </el-icon>
    <el-icon v-else :size="20" @click="changeCollapse">
      <Fold />
    </el-icon>

    <el-breadcrumb separator="/" style="margin-left: 20px">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { useConfigStore } from '@/store/modules/config';
  import { useAuthStore } from '@/store/modules/auth';
  const route = useRoute();
  const configStore = useConfigStore();
  const isCollapse = computed(() => configStore.isCollapse);

  const changeCollapse = () => {
    configStore.setConfigState('isCollapse', !configStore.isCollapse);
  };

  const authStore = useAuthStore();
  const breadcrumbList = computed(() => {
    let breadcrumbData =
      authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? [];
    return breadcrumbData;
  });
</script>

<style lang="scss" scoped></style>
