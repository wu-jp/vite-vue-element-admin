<template>
  <ProTable
    :request-api="getTableList"
    :columns="columns"
    title="管理员列表"
    :pagination="true"
  >
    <template #tableHeader="{ row }">
      <el-button
        type="primary"
        @click="addAdminDialogRef.showDialog()"
      >
        添 加
      </el-button>
    </template>

<!--    <template #role_id="{ row }">
      <span>{{ row.role.name }}</span>
    </template>-->

    <template #operation="{ row }">
      <el-button
        v-if="row.is_system !== 1"
        text
        bg
        type="primary"
        @click="handleEdit(row)"
      >
        编辑
      </el-button>
      <el-button
        v-if="row.is_system !== 1"
        text
        bg
        type="danger"
        @click="handleDelete(row)"
      >
        删除
      </el-button>
    </template>
  </ProTable>
  <AddAdminDialog
    ref="addAdminDialogRef"
    :roles="options"
  />
</template>

<script setup lang="jsx">
  import ProTable from '@/components/ProTable/index.vue';
  import { fetchAdminList } from '@/api/auth/admin';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import AddAdminDialog from '@/views/system/userManagement/components/addAdminDialog.vue';
  import { ref } from 'vue';
  import {roleListApi} from "@/api/modules/system/role";

  const addAdminDialogRef = ref(null);
  // 表格配置项
  const columns = [
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'username', label: '账号', search: { el: 'input' } },
    {
      prop: 'role_id',
      label: '角色',
      search: { el: 'select'},
      enum: roleListApi,
      enumPagination: true,
      isFilterEnum: false,
      fieldNames: {label: 'name', value: 'id'},
      render: scope => (<el-button type="success" text bg >{scope.row.role.name}</el-button>)
    },
    { prop: 'last_login_time', label: '最后登录时间' },
    { prop: 'last_login_ip', label: '最后登录ip' },
    { prop: 'status', label: '状态', width: 100, tag: true,
      enum: [
        {value: 0, label: '禁用', tagType: 'danger'},
        {value: 1, label: '开启', tagType: 'success'}
      ]
    },
    { prop: 'created_at', label: '创建时间' },
    { prop: 'operation', label: '操作', fixed: 'right', width: 160 },
  ];

  const getTableList = (params) => {
    return fetchAdminList(params);
  };

  const handleDelete = (row) => {
    console.log('删除', row.id);
    ElMessageBox.confirm('此操作将永久删除选中数据，是否继续？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        });
      })
      .catch(() => {});
  };
  const handleEdit = (row) => {
    addAdminDialogRef.value.showDialog(row);
  };
</script>

<style lang="scss" scoped></style>
