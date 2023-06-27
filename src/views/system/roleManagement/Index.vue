<template>
  <div>
    <ProTable :request-api="getTableList" :columns="columns" title="角色列表" />
  </div>
</template>

<script setup>
  import ProTable from '@/components/ProTable/index.vue';
  import { fetchRoleList } from '@/api/auth/role';

  // 表格配置项
  const columns = [
    { type: 'selection', fixed: 'left', width: 80 },
    { type: 'index', label: '#', width: 80 },
    { type: 'expand', label: 'Expand' },
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '角色名称', search: { el: 'input' } },
    { prop: 'description', label: '角色描述' },
    { prop: 'administrator_count', label: '用户数量' },
    { prop: 'status', label: '状态' },
    { prop: 'created_at', label: '创建时间' },
  ];

  const getTableList = (params) => {
    return fetchRoleList({});
  };
</script>

<style lang="scss" scoped></style>
