<template>
  <div class="card content-box">
    <div style="margin-bottom: 20px;">
      复制指令🎆🎆🎆
    </div>
    <el-input
      v-model="data"
      placeholder="请输入需要复制的内容"
      style="width: 500px;"
    >
      <template #append>
        <el-button v-copy="data">
          复 制
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const data = ref('')
</script>

<style lang="scss" scoped>

</style>
