<template>
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive>
          <div>
            <component :is="Component" :key="route.fullPath" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup></script>

<style scoped lang="scss">
  .el-main {
    box-sizing: border-box;
    padding: 10px 12px;
    overflow-x: hidden;
    background-color: var(--el-bg-color-page);
  }

  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.2s;
  }
  .fade-transform-enter-from {
    opacity: 0;
    transition: all 0.2s;
    transform: translateX(-30px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transition: all 0.2s;
    transform: translateX(30px);
  }
</style>
