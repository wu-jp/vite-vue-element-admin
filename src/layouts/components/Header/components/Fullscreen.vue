<template>
  <div>
    <IconFullscreenFill style="font-size: 20px" v-if="!isFullscreen" @click="toggle" />
    <IconFullscreenExitFill style="font-size: 20px" v-else @click="toggle" />
  </div>
</template>

<script setup>
  import IconFullscreenFill from '~icons/ri/fullscreen-fill';
  import IconFullscreenExitFill from '~icons/ri/fullscreen-exit-fill';

  import { useFullscreen } from '@vueuse/core';
  const { toggle, isFullscreen } = useFullscreen();
</script>

<style lang="scss" scoped></style>
