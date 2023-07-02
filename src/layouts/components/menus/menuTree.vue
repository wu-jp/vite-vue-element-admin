<template>
  <template v-for="menu in props.menus" :key="menu.path">
    <el-sub-menu v-if="menu.children?.length" :index="menu.path">
      <template #title>
        <el-icon><Grid /></el-icon>
        <span>{{ menu.meta?.title ? menu.meta?.title : 'noTitle' }}</span>
      </template>
      <menu-tree :menus="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" @click="onClickMenu(menu)">
      <el-icon><Menu /></el-icon>
      <span>{{ menu.meta?.title ? menu.meta?.title : 'noTitle' }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const props = defineProps(['menus']);

  const onClickMenu = (menu) => {
    if (menu.path) {
      router.push(menu.path);
    }
  };
</script>

<style scoped></style>
