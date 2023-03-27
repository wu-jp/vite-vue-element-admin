<template>
  <template v-for="menu in props.menus">
    <template v-if="menu.children && menu.children.length > 0">
      <el-sub-menu :index="menu.path" :key="menu.path">
        <template #title>
          <el-icon><Grid /></el-icon>
          <span>{{ menu.mate?.title ? menu.mate?.title : 'noTitle' }}</span>
        </template>
        <menu-tree :menus="menu.children"></menu-tree>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menu.path" :key="menu.path" @click="onClickMenu(menu)">
        <el-icon><Menu /></el-icon>
        <span>{{ menu.mate?.title ? menu.mate?.title : 'noTitle' }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup>
  import { useMemberCenter } from '@/store/memberCenter';

  const props = defineProps(['menus']);
  console.log('props', props);

  const onClickMenu = (menu) => {
    console.log('menu', menu);
  };

  const memberCenter = useMemberCenter();
  console.log(memberCenter.state);
</script>

<style scoped></style>
