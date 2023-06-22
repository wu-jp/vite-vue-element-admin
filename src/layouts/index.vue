<template>
  <el-container class="layout-container">
    <el-aside
      :width="asideType ? '260px' : '64px'"
      class="layout-aside-default"
    >
      <Logo />
      <el-scrollbar class="menus-scrollbar">
        <Menus :is-collapse="asideType" />
      </el-scrollbar>
    </el-aside>
    <el-container class="content-wrapper">
      <el-header class="header-container">
        <ToolBarLeft
          :aside-type="asideType"
          @change-asideWidth="changeAsideWidth"
        />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup>
  import Logo from './components/Logo/index.vue'
  import Menus from './components/menus/index.vue'
  import ToolBarLeft from './components/Header/ToolBarLeft.vue'
  import ToolBarRight from './components/Header/ToolBarRight.vue'
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import Main from './components/Main/index.vue'

  const router = useRouter();
  console.log('router-手动注册的路由', router.options.routes);
  const asideType = ref(true);
  const changeAsideWidth = (value) => {
    console.log('从子组件触发的事件', value);
    asideType.value = value;
  };
</script>

<style scoped lang="scss">
  @import 'src/styles/variables.scss';

  .menus-scrollbar {
    height: calc(100vh - 50px);
    background-color: #fff;
  }

  .header-container {
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .layout-container {
    width: 100%;
    height: 100%;
  }
  .content-wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .el-main {
    padding: 0;
  }

  .layout-aside-default {
    transition: width 0.3s ease;
  }
</style>
