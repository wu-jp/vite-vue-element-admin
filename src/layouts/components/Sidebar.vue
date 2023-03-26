<template>
  <Logo />
  <el-scrollbar class="menus-scrollbar">
    <Menus />
  </el-scrollbar>
</template>

<script setup>
  import Logo from './logo.vue';
  import Menus from './menus/index.vue';
</script>

<style scoped>
  .menus-scrollbar {
    height: calc(100vh - 50px);
    background-color: #fff;
  }
</style>
