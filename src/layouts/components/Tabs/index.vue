<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
        v-model="tabsMenuValue"
        type="card"
        @tab-click="tabClick"
        @tab-remove="tabRemove"
      >
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <el-icon
              v-show="item.icon && tabsIcon"
              class="tabs-icon"
            >
              <component :is="item.icon" />
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
  import Sortable from 'sortablejs';
  import { useRoute, useRouter } from 'vue-router';
  import { ref, watch, computed, onMounted } from 'vue';
  import { useTabsStore } from '@/store/modules/tabs';
  import {useAuthStore} from "@/store/modules/auth";
  import {useConfigStore} from "@/store/modules/config";

  const route = useRoute();
  const router = useRouter();
  const tabStore = useTabsStore();
  const authStore = useAuthStore()
  const configStore = useConfigStore()

  const tabsMenuValue = ref(route.fullPath);
  const tabsMenuList = computed(() => tabStore.tabsMenuList);
  const tabsIcon = computed(() => configStore.tabsIcon)

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
        close: !route.meta.isAffix
      };

      tabStore.addTabs(tabsParams);
    },
  );

  const tabsDrop = () => {
    Sortable.create(document.querySelector('.el-tabs__nav'), {
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

  const initTabs = () => {
    authStore.flatMenuListGet.forEach(item => {
      if(item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
        const tabParams = {
          icon: route.meta.icon,
          title: route.meta.title,
          path: route.path,
          name: route.name,
          close: !route.meta.isAffix
        }
        tabStore.addTabs(tabParams)
      }
    })
  };

  const tabClick = (tabItem) => {
    const fullPath = tabItem.props.name
    router.push(fullPath)
  };
  const tabRemove = (fullPath) => {
    const name = tabStore.tabsMenuList.filter(item => item.path == fullPath)[0].name || ''
    tabStore.removeTabs(fullPath, fullPath == route.fullPath)
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
