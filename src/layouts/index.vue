<template>
  <el-container class="layout-container">
    <el-aside :width="asideType ? '260px' : '64px'" class="layout-aside-default">
      <Sidebar :asideType="asideType" />
    </el-aside>
    <el-container class="content-wrapper">
      <Header :asideType="asideType" @changeAsideWidth="changeAsideWidth" />
      <el-main>
        <el-scrollbar class="scrollbar-container">
          <div class="default-main">
            <PageContent />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
  import PageContent from './page/index.vue';
  import Sidebar from '@/layouts/components/Sidebar.vue';
  import Header from './components/header.vue';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

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

  .scrollbar-container {
    height: calc(100vh - 50px);
    box-sizing: border-box;

    //padding: 15px;
    //margin: 15px;
  }

  .default-main {
    margin: 16px 16px 50px 16px;
    background: #fff;
    border-radius: 4px;
  }
</style>
