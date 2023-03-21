<template>
  <template v-for="menu in props.menus">
    <template v-if="menu.children && menu.children.length > 0">
      <el-sub-menu :index="menu.path" :key="menu.path">
        <template #title>
          <span>{{ menu?.title ? menu?.title : 'noTitle' }}</span>
        </template>
        <menu-tree :menus="menu.children"></menu-tree>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menu.path" :key="menu.path" @click="onClickMenu(menu)">
        <span>{{ menu?.title ? menu?.title : 'noTitle' }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup>
  const props = defineProps(['menus']);
  // console.log('props', props);
</script>

<style scoped></style>
