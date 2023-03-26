<template>
  <el-header class="header-container">
    <div>header</div>
    <Navbar />
  </el-header>
</template>

<script>
  import Navbar from './navBar/index.vue';
  export default {
    name: 'header',
  };
</script>

<style scoped>
  .header-container {
    background: aquamarine;
    height: 50px;
  }
</style>
