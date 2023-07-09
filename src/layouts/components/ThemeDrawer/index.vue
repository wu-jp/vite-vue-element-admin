<script setup>
  import { ref } from 'vue';
  import mittBus from '@/utils/mittBus.js';
  import { useTheme } from '@/hooks/useTheme';
  import { useConfigStore } from '@/store/modules/config';
  import { storeToRefs } from 'pinia';
  import IconCheckboxCircleFill from '~icons/ri/checkbox-circle-fill'; // 选中的布局标签

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
      <div
        style="
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, 100px);
          justify-content: space-around;
        "
      >
        <div class="mini-layout1">
          <div class="layout-top"></div>
          <div class="layout-other">
            <div class="layout-menu"></div>
            <div class="layout-main"></div>
          </div>
        </div>
        <div class="mini-layout1">
          <div class="layout-top"></div>
          <div class="layout-other">
            <div class="layout-menu"></div>
            <div class="layout-main"></div>
          </div>
        </div>
        <div class="mini-layout1">
          <div class="layout-top"></div>
          <div class="layout-other">
            <div class="layout-menu"></div>
            <div class="layout-main"></div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <p>全局主题</p>

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

      <div class="theme-box">
        <span>面包屑</span>
        <el-switch v-model="configStore.isDark" />
      </div>
      <div class="theme-box">
        <span>标签栏</span>
        <el-switch v-model="configStore.isDark" />
      </div>
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
  .mini-layout1 {
    box-sizing: border-box;
    width: 100px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    border: 2px solid #d6a2e8;
    border-radius: 4px;
    margin-bottom: 20px;

    .layout-top {
      width: 100%;
      height: 20%;
      background: #d6a2e8;
      border-radius: 2px;
    }
    .layout-other {
      width: 100%;
      height: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .layout-menu {
        width: 20%;
        height: 100%;
        background: #30336b;
        border-radius: 2px;
      }

      .layout-main {
        width: 70%;
        height: 100%;
        //background: aquamarine;
        border-radius: 2px;
        border: 1px dashed;
      }
    }
  }
</style>
