<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="500px"
    :before-close="handleClose"
    append-to-body
    :show-close="false"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :validate-on-rule-change="false"
      label-width="90px"
    >
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="角色描述:" prop="description">
        <el-input
          type="textarea"
          v-model="formData.description"
          :rows="3"
          clearable
          placeholder="请输入"
        ></el-input>
      </el-form-item>

      <el-form-item label="状态:" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(formRef)">取 消</el-button>
        <el-button type="primary" @click="confirmForm(formRef)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { nextTick, reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { handleRoleApi } from '@/api/modules/system/role';

  const emit = defineEmits(['updater']);
  const formRef = ref(null);
  const dialogVisible = ref(false);
  const title = ref('');

  const formData = ref({
    name: '',
    description: '',
    status: 1,
  });
  const rules = reactive({
    name: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
      { min: 1, max: 16, message: '长度应为1到16', trigger: 'blur' },
    ],
    description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
  });

  async function showDialog(row) {
    if (row) {
      console.log(row);
      title.value = '编辑角色';
      nextTick(() => {
        formData.value.id = row.id;
        formData.value.name = row.name;
        formData.value.description = row.description;
        formData.value.status = row.status;
      });
    } else {
      delete formData.value.id;
      title.value = '新增角色';
    }

    dialogVisible.value = true;
  }

  function handleClose() {
    formRef.value.resetFields();
    dialogVisible.value = false;
  }

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    dialogVisible.value = false;
  }
  async function confirmForm(formEl) {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        const type = formData.value.id ? 'update' : 'store';
        handleRoleApi(type, formData.value).then((res) => {
          ElMessage.success(formData.value.id ? '更新成功' : '创建成功');
          emit('updater');
          resetForm(formRef.value);
        });
      } else {
        console.log('error submit!', fields);
      }
    });
  }

  defineExpose({
    showDialog,
  });
</script>

<style lang="scss" scoped></style>
