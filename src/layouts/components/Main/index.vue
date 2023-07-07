<template>
  <el-main>
    <el-scrollbar class="scrollbar-container">
      <router-view />
      <!--        <router-view v-slot="{ Component, route }">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>-->
    </el-scrollbar>
  </el-main>
</template>

<script setup></script>

<style scoped>
  .scrollbar-container {
    box-sizing: border-box;
    height: calc(100vh - 50px);
  }
</style>
