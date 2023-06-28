<template>
  <ProTable
    :tree-props="{ children: '_child', hasChildren: 'hasChildren' }"
    id="wjp"
    :request-api="getTableList"
    :columns="columns"
    title="菜单列表"
    :pagination="false"
  />
</template>

<script setup>
  import ProTable from '@/components/ProTable/index.vue';
  import { fetchMenuList } from '@/api/auth/menu';

  // 表格配置项
  const columns = [
    { prop: 'title', label: '菜单名称' },
    { prop: 'type', label: '菜单类型' },
    { prop: 'component', label: '组件' },
    { prop: 'router', label: '路径' },
    { prop: 'identity', label: '标识符' },
    { prop: 'url', label: '后端类库' },
    { prop: 'method', label: '请求方式' },
    { prop: 'sort', label: '排序' },
  ];

  const getTableList = (params) => {
    return fetchMenuList({});
  };
</script>

<style lang="scss" scoped></style>
