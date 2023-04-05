<template>
  <template v-for="menu in props.menus">
    <template v-if="!menu.hidden">
      <template v-if="menu.children && menu.children.length > 0">
        <el-sub-menu :index="menu.path" :key="menu.path">
          <template #title>
            <el-icon><Grid /></el-icon>
            <span>{{ menu.meta?.title ? menu.meta?.title : 'noTitle' }}</span>
          </template>
          <menu-tree :menus="menu.children"></menu-tree>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="menu.path" :key="menu.path" @click="onClickMenu(menu)">
          <el-icon><Menu /></el-icon>
          <span>{{ menu.meta?.title ? menu.meta?.title : 'noTitle' }}</span>
        </el-menu-item>
      </template>
    </template>
  </template>
</template>

<script setup>
  import { useMemberCenter } from '@/store/memberCenter';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const props = defineProps(['menus']);

  const onClickMenu = (menu) => {
    console.log('menu', menu);
    if (menu.path) {
      router.push({ path: menu.path });
    }
  };

  const memberCenter = useMemberCenter();
</script>

<style scoped></style>
