<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <AssemblySize />
      <Language />
      <ChangeTheme />
      <Fullscreen />
    </div>
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
  import { ref } from 'vue';
  import ChangeTheme from '@/layouts/components/Header/components/ChangeTheme.vue';
  import AssemblySize from '@/layouts/components/Header/components/AssemblySize.vue';
  import Fullscreen from '@/layouts/components/Header/components/Fullscreen.vue';
  import Language from '@/layouts/components/Header/components/Language.vue';
  import circleUrl from '@/assets/avatar.png';
  import { useUser } from '@/store/modules/user';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';

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
</script>

<style scoped lang="scss">
  .tool-bar-ri {
    display: flex;
    align-items: center;
    justify-content: center;
    .header-icon {
      display: flex;
      align-items: center;
      & > * {
        margin-right: 20px;
      }
    }
    .username {
      margin: 0 20px;
      font-size: 15px;
    }
  }
</style>
