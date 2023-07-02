<template>
  <el-main>
    <el-scrollbar class="scrollbar-container">
      <div class="default-main">
        <router-view />
        <!--        <router-view v-slot="{ Component, route }">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>-->
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script setup></script>

<style scoped>
  .scrollbar-container {
    box-sizing: border-box;
    height: calc(100vh - 50px);
  }

  .default-main {
    box-sizing: border-box;
    margin: 10px 10px 40px 10px;
    background: #fff;
    border-radius: 4px;
  }
</style>
