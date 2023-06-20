<template>
  <div>
    <ProTable :columns="columns" title="角色列表"></ProTable>
  </div>
</template>

<script setup>
  import ProTable from '@/components/ProTable/index.vue';

  // 表格配置项
  const columns = [
    { type: 'selection', fixed: 'left', width: 80 },
    { type: 'index', label: '#', width: 80 },
    { type: 'expand', label: 'Expand', width: 100 },
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'name', label: '角色名称', width: 80, search: { el: 'input' } },
    { prop: 'description', label: '角色描述', width: 80 },
    { prop: 'administrator_count', label: '用户数量', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
    { prop: 'created_at', label: '创建时间', width: 80 },
  ];
</script>

<style lang="scss" scoped></style>
