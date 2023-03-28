<template>
  <div>
    <el-dropdown ref="dropdown" trigger="contextmenu">
      <el-avatar :size="45" :src="circleUrl" @click="showClick" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
  import circleUrl from '@/assets/avatar.png';
  import { ref } from 'vue';
  const dropdown = ref(null);

  const showClick = () => {
    console.log(1);
    dropdown.value.handleOpen();
  };

  const logout = () => {
    console.log('退出登录');
  };
</script>

<style scoped></style>
