<template>
  <div>
    <el-form ref="formRef" :model="formData" :inline="true">
      <el-form-item label="账号:" prop="username">
        <el-input v-model="formData.username" clearable placeholder="输入账号" />
      </el-form-item>
      <el-form-item label="角色:" prop="role_id">
        <el-select v-model="formData.role_id" clearable placeholder="选择角色">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查 询</el-button>
        <el-button @click="resetForm(formRef)">重 置</el-button>
      </el-form-item>
    </el-form>

    <div style="padding: 10px 0">
      <el-button type="primary" @click="addAdminDialogRef.showDialog()">添 加</el-button>
    </div>

    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" width="60" />
      <el-table-column align="center" prop="username" label="账号" />
      <el-table-column align="center" prop="roles" label="角色">
        <template #default="{ row }">
          <span>{{ row.role.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="last_login_time" label="最后登录时间" />
      <el-table-column align="center" prop="last_login_ip" label="最后登录ip" />
      <el-table-column align="center" prop="status" label="状态">
        <template #default="{ row }">
          <el-switch v-model="row.status" disabled :active-value="1" :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" />
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="padding-top: 10px"
      background
      layout="prev, pager, next"
      :total="pagination.total"
      :current-page="pagination.page"
      :page-size="pagination.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

  <AddAdminDialog ref="addAdminDialogRef" :roles="options" />
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { fetchRoleList } from '@/api/auth/role';
  import { fetchAdminList } from '@/api/auth/admin';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import AddAdminDialog from '@/views/auth/admin/components/addAdminDialog.vue';

  const formRef = ref(null);
  const addAdminDialogRef = ref(null);
  const formData = reactive({
    username: '',
    role_id: '',
  });
  const options = ref([]);
  fetchRoleList({ per_page: '10000' }).then((res) => {
    const { code, data } = res;
    if (code === 0) {
      options.value = data.list;
    }
  });

  const pagination = reactive({
    page: '',
    pageSize: '',
    total: '',
  });
  const handleCurrentChange = (val) => {
    pagination.page = val;
    search();
  };

  const handleSizeChange = (val) => {
    pagination.pageSize = val;
    search();
  };

  const loading = ref(false);
  const tableData = ref([]);
  search();
  function search() {
    loading.value = true;
    fetchAdminList({
      page: pagination.page,
      per_page: pagination.pageSize,
      ...formData,
    })
      .then((res) => {
        const { code, data } = res;

        if (code === 0) {
          console.log('page data', data);
          pagination.total = data.total;
          tableData.value = data.list;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  const resetForm = (formEl) => {
    console.log('重置', formEl);
    if (!formEl) return;
    formEl.resetFields();
    search();
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
