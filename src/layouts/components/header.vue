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
  const emit = defineEmits(['changeAsideWidth']);
  const props = defineProps(['asideType']);
</script>

<style scoped>
  .header-container {
    height: 50px;
  }
</style>
