<template>
  <div>
    <IconPalette
      style="font-size: 18px"
      @click="openThemeDrawer"
    />

    <el-dropdown
      ref="dropdown"
      trigger="contextmenu"
    >
      <el-avatar
        :size="40"
        :src="circleUrl"
        @click="showClick"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            divided
            @click="logout"
          >
            退出登录
          </el-dropdown-item>
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
  import mittBus from "@/utils/mittBus";
  import IconPalette from '~icons/bxs/palette'

  const router = useRouter();

  const dropdown = ref(null);

  const userStore = useUser();

  const showClick = () => {
    dropdown.value.handleOpen();
  };


  const logout = () => {
    userStore.logout().then(() => {
      ElMessage({
        message: '退出成功',
        type: 'success',
        duration: 1500,
      });
      router.push('/login');
    });
  };

  // 开打主题设置
  const openThemeDrawer = () => {
    mittBus.emit('openThemeDrawer')
  }
</script>

<style scoped></style>
