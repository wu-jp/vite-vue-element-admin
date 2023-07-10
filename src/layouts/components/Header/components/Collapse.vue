<template>
  <el-icon v-if="!isCollapse" :size="20" @click="changeCollapse">
    <Expand />
  </el-icon>
  <el-icon v-else :size="20" @click="changeCollapse">
    <Fold />
  </el-icon>
</template>

<script setup>
  import { useConfigStore } from '@/store/modules/config';
  import { computed } from 'vue';

  const configStore = useConfigStore();
  const isCollapse = computed(() => configStore.isCollapse);
  const changeCollapse = () => {
    configStore.setConfigState('isCollapse', !configStore.isCollapse);
  };
</script>

<style lang="scss" scoped></style>
