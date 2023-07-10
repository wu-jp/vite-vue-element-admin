<template>
  <component :is="LayoutComponents[layout]" />
  <ThemeDrawer />
</template>

<script setup>
  import { computed } from 'vue';
  import { useConfigStore } from '@/store/modules/config';
  import ThemeDrawer from '@/layouts/components/ThemeDrawer/index.vue';
  import LayoutClassic from '@/layouts/LayoutClassic/index.vue';
  import LayoutColumns from '@/layouts/LayoutColumns/index.vue';
  import LayoutTransverse from '@/layouts/LayoutTransverse/index.vue';
  import LayoutVertical from '@/layouts/LayoutVertical/index.vue';

  const LayoutComponents = {
    classic: LayoutClassic,
    columns: LayoutColumns,
    transverse: LayoutTransverse,
    vertical: LayoutVertical,
  };

  const configStore = useConfigStore();
  const layout = computed(() => configStore.layout);
  console.log('layout', layout);
</script>

<style lang="scss" scoped></style>
