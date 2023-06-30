<template>
  <div>
    <ProTable
      :request-api="getTableList"
      :columns="columns"
      title="角色列表"
    >
      <template #tableHeader="{ row }">
        <el-button
          type="primary"
        >
          添 加
        </el-button>
      </template>
      <template #operation="{ row }">
        <el-button
          text
          bg
          type="success"
          @click="handleEdit(row)"
        >
          授权
        </el-button>
        <el-button
          text
          bg
          type="primary"
          @click="handleEdit(row)"
        >
          编辑
        </el-button>
        <el-button
          text
          bg
          type="danger"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup>
  import ProTable from '@/components/ProTable/index.vue';
  import { fetchRoleList } from '@/api/auth/role';

  // 表格配置项
  const columns = [
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'name', label: '角色名称' },
    { prop: 'description', label: '角色描述' },
    { prop: 'administrator_count', label: '用户数量' },
    { prop: 'status', label: '状态', width: 100, tag: true,
      enum: [
        {value: 0, label: '禁用', tagType: 'danger'},
        {value: 1, label: '开启', tagType: 'success'}
      ]
    },
    { prop: 'created_at', label: '创建时间' },
    { prop: 'operation', label: '操作', fixed: 'right', width: 240 },
  ];

  const getTableList = (params) => {
    return fetchRoleList({});
  };
</script>

<style lang="scss" scoped></style>
