<template>
  <div>
    <ProTable ref="proTableRef" :request-api="getTableList" :columns="columns" title="角色列表">
      <template #tableHeader="{ row }">
        <el-button type="primary" @click="addRuleRef.showDialog()"> 添 加 </el-button>
      </template>
      <template #operation="{ row }">
        <el-button text bg type="success" @click="handleAuth(row)"> 授权 </el-button>
        <el-button text bg type="primary" @click="handleEdit(row)"> 编辑 </el-button>
        <el-button text bg type="danger" @click="handleDelete(row)"> 删除 </el-button>
      </template>
    </ProTable>
    <AddRuleDialog ref="addRuleRef" @updater="proTableRef.getTableList()" />
    <AuthDialog ref="authRef" @updater="proTableRef.getTableList()" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import ProTable from '@/components/ProTable/index.vue';
  import { fetchRoleList } from '@/api/auth/role';
  import AddRuleDialog from '@/views/system/roleManagement/components/AddRuleDialog.vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { handleRoleApi } from '@/api/modules/system/role';
  import AuthDialog from '@/views/system/roleManagement/components/AuthDialog.vue';

  const addRuleRef = ref();
  const proTableRef = ref();

  // 表格配置项
  const columns = [
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'name', label: '角色名称' },
    { prop: 'description', label: '角色描述' },
    { prop: 'administrator_count', label: '用户数量' },
    {
      prop: 'status',
      label: '状态',
      width: 100,
      tag: true,
      enum: [
        { value: 0, label: '禁用', tagType: 'danger' },
        { value: 1, label: '开启', tagType: 'success' },
      ],
    },
    { prop: 'created_at', label: '创建时间' },
    { prop: 'operation', label: '操作', fixed: 'right', width: 240 },
  ];

  const getTableList = (params) => {
    return fetchRoleList(params);
  };
  const handleEdit = (row) => {
    addRuleRef.value.showDialog(row);
  };
  const handleDelete = (row) => {
    ElMessageBox.confirm('此操作将永久删除选中数据，是否继续？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        handleRoleApi('destroy', { id: row.id }).then((res) => {
          if (res.code === 0) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            });
            proTableRef.value.getTableList();
          }
        });
      })
      .catch(() => {});
  };
  const authRef = ref();
  const handleAuth = (row) => {
    authRef.value.showDialog(row);
  };
</script>

<style lang="scss" scoped></style>
