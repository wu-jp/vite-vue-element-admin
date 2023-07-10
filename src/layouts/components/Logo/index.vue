<template>
  <div class="logo-container" :style="{ width: !isCollapse ? '64px' : '260px' }">
    <img class="logo-img" src="/party_2.ico" alt="" />
    <span v-show="isCollapse" class="logo-text" :style="logoStyle">WuYi Admin</span>
  </div>
</template>

<script setup>
  import { useConfigStore } from '@/store/modules/config';
  import { computed, reactive } from 'vue';
  import { randomColor } from '@/utils';

  const configStore = useConfigStore();
  const isCollapse = computed(() => configStore.isCollapse);

  const logoStyle = reactive({
    color: randomColor(),
  });
</script>

<style scoped lang="scss">
  .logo-container {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    .logo-img {
      width: 44px;
      height: 44px;
      margin-right: 6px;
    }

    .logo-text {
      font-size: 22px;
      font-weight: bold;
      color: #d6a2e8;
      white-space: nowrap;
    }
  }
</style>
