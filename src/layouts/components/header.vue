<template>
  <el-header class="header-container">
    <el-icon v-if="!asideType" :size="20" color="#409EFF" @click="$emit('changeAsideWidth', true)"
      ><Expand
    /></el-icon>
    <el-icon v-else :size="20" color="#409EFF" @click="$emit('changeAsideWidth', false)"
      ><Fold
    /></el-icon>
    <Navbar />
  </el-header>
</template>

<script setup>
  import Navbar from './navBar/index.vue';
  const emit = defineEmits(['changeAsideWidth']);
  const props = defineProps(['asideType']);
</script>

<style scoped>
  .header-container {
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
