<template>
  <div>
    <el-switch v-model="configStore.isDark" @change="switchDark" />
    <el-dropdown ref="dropdown" trigger="contextmenu">
      <el-avatar :size="40" :src="circleUrl" @click="showClick" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item divided @click="logout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
  import circleUrl from '@/assets/avatar.png';
  import { ref } from 'vue';
  import { useUser } from '@/store/modules/user';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { useConfigStore } from '@/store/modules/config';
  import { useTheme } from '@/hooks/useTheme';

  const router = useRouter();

  const dropdown = ref(null);

  const userStore = useUser();

  const showClick = () => {
    dropdown.value.handleOpen();
  };

  const { switchDark } = useTheme();
  const configStore = useConfigStore();

  const logout = () => {
    console.log('退出登录');
    userStore.logout().then(() => {
      ElMessage({
        message: '退出成功',
        type: 'success',
        duration: 1500,
      });
      router.push('/login');
    });
  };
</script>

<style scoped></style>
