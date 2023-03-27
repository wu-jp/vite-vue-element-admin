<template>
  <Logo />
  <el-scrollbar class="menus-scrollbar">
    <Menus :isCollapse="asideType" />
  </el-scrollbar>
</template>

<script setup>
  import Logo from './logo.vue';
  import Menus from './menus/index.vue';

  const props = defineProps(['asideType']);
</script>

<style scoped>
  .menus-scrollbar {
    height: calc(100vh - 50px);
    background-color: #fff;
  }
</style>
