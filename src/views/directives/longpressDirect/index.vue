<template>
  <div class="card content-box">
    <div style="margin-bottom: 20px;">
      长按指令🎆🎆🎆
    </div>
    <el-button
      v-longpress="handleClick"
      type="primary"
    >
      长按我试试看
    </el-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
const handleClick = () => {
  ElMessage.success('长按成功了吧')
}
</script>

<style lang="scss" scoped>

</style>
