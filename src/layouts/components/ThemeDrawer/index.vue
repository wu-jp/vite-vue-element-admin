<script setup>
  import { ref } from 'vue';
  import mittBus from '@/utils/mittBus.js';
  import { useTheme } from '@/hooks/useTheme';
  import { useConfigStore } from '@/store/modules/config';
  import { storeToRefs } from 'pinia';
  import IconCheckboxCircleFill from '~icons/ri/checkbox-circle-fill'; // 选中的布局标签

  const { switchDark, changePrimary, setAsideTheme } = useTheme();
  const configStore = useConfigStore();
  const { primary, layout } = storeToRefs(configStore);

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

  const setLayout = (val) => {
    configStore.setConfigState('layout', val);
    setAsideTheme();
  };
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
        <el-tooltip class="box-item" content="classic" placement="top">
          <div class="mini-layout1" @click="setLayout('classic')">
            <div class="layout-top"></div>
            <div class="layout-other">
              <div class="layout-menu"></div>
              <div class="layout-main"></div>
            </div>
            <IconCheckboxCircleFill class="checkbox-icon" v-if="layout === 'classic'" />
          </div>
        </el-tooltip>

        <el-tooltip class="box-item" content="vertical" placement="top">
          <div class="mini-layout1 layout-vertical" @click="setLayout('vertical')">
            <div class="layout-menu"></div>
            <div class="layout-other">
              <div class="layout-top"></div>
              <div class="layout-main"></div>
            </div>
            <IconCheckboxCircleFill class="checkbox-icon" v-if="layout === 'vertical'" />
          </div>
        </el-tooltip>

        <el-tooltip class="box-item" content="columns" placement="top">
          <div class="mini-layout1 layout-columns" @click="setLayout('columns')">
            <div class="layout-top"></div>
            <div class="layout-main">
              <div class="layout-menu"></div>
            </div>
            <IconCheckboxCircleFill class="checkbox-icon" v-if="layout === 'columns'" />
          </div>
        </el-tooltip>

        <el-tooltip class="box-item" content="transverse" placement="top">
          <div class="mini-layout1" @click="setLayout('transverse')">
            <div class="layout-top"></div>
            <div class="layout-other">
              <div class="layout-main main-transverse"></div>
            </div>
            <IconCheckboxCircleFill class="checkbox-icon" v-if="layout === 'transverse'" />
          </div>
        </el-tooltip>
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
  @import './index.scss';
</style>
