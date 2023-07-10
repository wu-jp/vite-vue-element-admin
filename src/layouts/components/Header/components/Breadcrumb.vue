<template>
  <el-breadcrumb separator="/" style="margin-left: 20px">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
  import { computed } from 'vue';
  import { useAuthStore } from '@/store/modules/auth';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const authStore = useAuthStore();
  const breadcrumbList = computed(() => {
    let breadcrumbData =
      authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? [];
    return breadcrumbData;
  });
</script>

<style lang="scss" scoped></style>
