<template>
  <!--  <div class="app-container">
    <div class="sidebar-container">
      <Sidebar />
    </div>

    <div class="main-container">
      <div class="navbar">navbar</div>
      <div class="app-main">

      </div>
    </div>
  </div>-->
  <el-container class="layout-container">
    <el-aside width="200px">
      <Sidebar />
    </el-aside>
    <el-container class="content-wrapper">
      <Header />

      <el-main>
        <PageContent />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
  import PageContent from './page/index.vue';
  import Sidebar from '@/layouts/components/Sidebar.vue';
  import Header from './components/header.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  console.log('router-手动注册的路由', router.options.routes);
</script>

<style scoped lang="scss">
  @import 'src/styles/variables.scss';

  .app-container {
    display: flex;

    .sidebar-container {
      width: $sideBarWidth !important;
      background: #fff;
      height: 100vh;
      flex-shrink: 0;
    }
    .main-container {
      flex: 1;
      position: relative;
      background: #f5f5f5;

      .navbar {
        height: $navbarWidth;
        background: #fff;
        //margin: 0 16px;
      }
      .app-main {
        margin: 16px;
        height: calc(100vh - $navbarWidth - 32px);
        background: #fff;
      }
    }
  }

  // new
  .layout-container {
    width: 100%;
    height: 100%;
  }
  .content-wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>
