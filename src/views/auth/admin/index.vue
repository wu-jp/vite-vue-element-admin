<template>
  <div>
    <el-form ref="formRef" :model="formData" :inline="true">
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="角色:" prop="role_id">
        <el-select v-model="formData.role_id" placeholder="选择角色">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">查 询</el-button>
        <el-button @click="resetForm(formRef)">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';

  const formRef = ref(null);
  const formData = reactive({
    username: '',
    role_id: '',
  });

  const options = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
    {
      value: 'Option4',
      label: 'Option4',
    },
    {
      value: 'Option5',
      label: 'Option5',
    },
  ];

  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ];

  const submitForm = (formEl) => {
    console.log('查询', formEl);
  };
  const resetForm = (formEl) => {
    console.log('重置', formEl);
    if (!formEl) return;
    formEl.resetFields();
  };
</script>

<style lang="scss" scoped></style>
