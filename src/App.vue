<script setup>
  import { useTheme } from '@/hooks/useTheme';
  import { useConfigStore } from '@/store/modules/config';
  import { computed } from 'vue';
  import en from 'element-plus/es/locale/lang/en';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';

  const { initTheme } = useTheme();
  initTheme();

  const configStore = useConfigStore();
  const locale = computed(() => {
    if (configStore.language == 'zh') return zhCn;
    if (configStore.language == 'en') return en;
  });
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style></style>
