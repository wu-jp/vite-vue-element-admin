<template>
  <div class="card content-box">
    <div style="margin-bottom: 20px;">
      节流指令🎆🎆🎆
    </div>
    <el-button
      v-throttle="handleClick"
      type="primary"
    >
      快速点击我试试看
    </el-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
const handleClick = () => {
  ElMessage.success('节流成功了吧')
}
</script>

<style lang="scss" scoped>

</style>
