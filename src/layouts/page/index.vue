<template>
  <el-scrollbar class="main-scrollbar">
    <div class="main-container">
      <RouterView>
        <template #default="{ Component, route }">
          <transition mode="out-in" appear>
            <keep-alive v-if="openCache">
              <component :is="Component" :key="route.fullPath"></component>
            </keep-alive>
            <component v-else :is="Component"></component>
          </transition>
        </template>
      </RouterView>
    </div>
  </el-scrollbar>
</template>

<script>
  export default {
    name: 'index',
  };
</script>

<style scoped>
  .main-scrollbar {
    height: calc(100vh - 82px);
  }
  .main-container {
    background: palevioletred;
    height: 200vh;
    border-radius: 4px;
  }
</style>
