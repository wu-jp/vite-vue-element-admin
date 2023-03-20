<template>
  <div class="app-container">
    <div class="sidebar-container">
      <Sidebar />
    </div>

    <div class="main-container">
      <div class="navbar">navbar</div>
      <div class="app-main">
        <PageContent />
      </div>
    </div>
  </div>
</template>

<script setup>
  import PageContent from './page/index.vue';
  import Sidebar from '@/layouts/components/Sidebar.vue';
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
</style>
