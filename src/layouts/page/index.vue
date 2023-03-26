<template>
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
</template>

<script>
  export default {
    name: 'index',
  };
</script>

<style scoped>
  .main-container {
    background: palevioletred;
    height: calc(100vh - 82px);
    border-radius: 4px;
  }
</style>
