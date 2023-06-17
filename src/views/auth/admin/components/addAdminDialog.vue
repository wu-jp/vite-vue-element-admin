<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="400px"
    :before-close="handleClose"
    append-to-body
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="90px">
      <el-form-item label="账号:" prop="username">
        <el-input v-model="formData.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="formData.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确认密码:" prop="password_confirm">
        <el-input
          type="password"
          v-model="formData.password_confirm"
          placeholder="请再次确认密码"
        />
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select v-model="formData.role_id" placeholder="选择角色">
          <el-option
            v-for="item in props.roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">开启</el-radio>
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

  const props = defineProps({
    roles: {
      type: Array,
      default: () => [],
    },
  });

  const formRef = ref(null);
  const dialogVisible = ref(false);
  const title = ref('');

  const formData = ref({
    username: '',
    password: '',
    password_confirm: '',
    status: 1,
    role_id: '',
  });
  const rules = ref({
    username: [
      { required: true, message: '请输入用户名称', trigger: 'blur' },
      { min: 1, max: 16, message: '长度应为1到16', trigger: 'blur' },
    ],
    password: [],
    password_confirm: [{ required: true, message: '请再次输入账号密码', trigger: 'blur' }],
    role_id: [
      {
        required: true,
        message: '请选择角色',
        trigger: 'change',
      },
    ],
  });

  async function showDialog(row) {
    if (row) {
      title.value = '编辑账号';
      console.log(row);
      rules.value.password = [];
      rules.value.password_confirm = [];

      await nextTick();
    } else {
      title.value = '新增账号';
      rules.value.password = [{ required: true, message: '请输入账号密码', trigger: 'blur' }];
      rules.value.password_confirm = [
        { required: true, message: '请再次输入账号密码', trigger: 'blur' },
      ];
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
        console.log('submit!');
        console.log(formData.value);
        if (formData.value.password !== formData.value.password_confirm) {
          ElMessage.warning('两次密码不一致');
          return false;
        }
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
