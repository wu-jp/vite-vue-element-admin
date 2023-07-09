<script setup>
  import { ref } from 'vue';
  import mittBus from '@/utils/mittBus.js';
  import { useTheme } from '@/hooks/useTheme';
  import { useConfigStore } from '@/store/modules/config';
  import { storeToRefs } from 'pinia';

  const { switchDark, changePrimary } = useTheme();
  const configStore = useConfigStore();
  const { primary } = storeToRefs(configStore);

  const drawerVisible = ref(false);
  const handleClose = () => {
    drawerVisible.value = false;
  };

  mittBus.on('openThemeDrawer', () => (drawerVisible.value = true));

  // 预设颜色主题
  const predefineColors = ref([
    '#30336b',
    '#2c2c54',
    '#ff5252',
    '#ff793f',
    '#34ace0',
    '#8e44ad',
    '#2c3e50',
    '#3a86ff',
    '#1b263b',
    '#1d3557',
    '#fb6f92',
  ]);
</script>
<template>
  <el-drawer
    v-model="drawerVisible"
    title="设置主题"
    direction="rtl"
    :before-close="handleClose"
    size="300px"
  >
    <div>
      <p>切换布局</p>
    </div>

    <div>
      <div class="theme-box">
        <span>暗黑模式</span>
        <el-switch v-model="configStore.isDark" @change="switchDark" />
      </div>
      <!-- 主题色 -->
      <div class="theme-box">
        <span>主题颜色</span>
        <el-color-picker v-model="primary" :predefine="predefineColors" @change="changePrimary" />
      </div>
    </div>

    <div>
      <p>界面设置</p>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
  .theme-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
</style>
