<template>
  <div class="card content-box">
    <div style="margin-bottom: 20px;">
      防抖指令🎆🎆🎆
    </div>
    <el-button
      v-debounce="handleClick"
      type="primary"
    >
      快速点击我试试看
    </el-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
const handleClick = () => {
  ElMessage.success('防抖成功了吧')
}
</script>

<style lang="scss" scoped>

</style>
