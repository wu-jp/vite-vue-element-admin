<template>
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
</template>

<script>
  export default {
    name: 'index',
  };
</script>

<style scoped></style>
