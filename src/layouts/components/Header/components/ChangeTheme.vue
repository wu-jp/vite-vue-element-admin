<template>
  <div>
    <IconPalette style="font-size: 20px" @click="openThemeDrawer" />
  </div>
</template>

<script setup>
  import IconPalette from '~icons/bxs/palette';
  import mittBus from '@/utils/mittBus';

  // 开打主题设置
  const openThemeDrawer = () => {
    mittBus.emit('openThemeDrawer');
  };
</script>

<style lang="scss" scoped></style>
