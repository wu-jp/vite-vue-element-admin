<template>
  <el-dropdown trigger="click" @command="setLanguage">
    <span class="el-dropdown-link">
      <IconTranslate style="font-size: 20px" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
  import IconTranslate from '~icons/ri/translate';
  import { useConfigStore } from '@/store/modules/config';
  import { computed } from 'vue';

  const configStore = useConfigStore();
  const language = computed(() => configStore.language);

  const languageList = [
    { label: '中文简体', value: 'zh' },
    { label: 'English', value: 'en' },
  ];

  const setLanguage = (item) => {
    if (item === language.value) return;
    configStore.setConfigState('language', item);
  };
</script>

<style lang="scss" scoped></style>
