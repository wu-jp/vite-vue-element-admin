<template>
  <div> </div>
</template>

<script setup>
  import Sortable from 'sortablejs';
  import { useRoute, useRouter } from 'vue-router';
  import { ref, watch, computed, onMounted } from 'vue';
  import { useTabsStore } from '@/store/modules/tabs';

  const route = useRoute();
  const router = useRouter();
  const tabStore = useTabsStore();

  const tabsMenuValue = ref(route.fullPath);
  const tabsMenuList = computed(() => tabStore.tabsMenuList);

  onMounted(() => {
    tabsDrop();
    initTabs();
  });

  watch(
    () => route.fullPath,
    () => {
      tabsMenuValue.value = route.fullPath;

      const tabsParams = {
        icon: route.meta.icon,
        title: route.meta.title,
        path: route.path,
        name: route.name,
      };

      tabStore.addTabs(tabsParams);
    },
  );

  const tabsDrop = () => {
    Sortable.create(document.querySelector('.el-tags__nav'), {
      draggable: '.el-tabs__item',
      animation: 300,
      onEnd({ newIndex, oldIndex }) {
        const tabsList = [...tabStore.tabsMenuList];
        const currRow = tabsList.splice(oldIndex, 1)[0];
        tabsList.splice(newIndex, 0, currRow);
        tabStore.setTabs(tabsList);
      },
    });
  };

  const initTabs = () => {};

  const tabClick = () => {};
  const tabRemove = () => {};
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
