<template>
  <div class="login-wrapper">
    <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="100px">
      <el-form-item label="账号：" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm(loginFormRef)"> 忘记密码 </el-button>
        <el-button type="primary" @click="submitLogin(loginFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { login } from '@/api/base';
  import { ElMessage } from 'element-plus';
  import { useUserInfo } from '@/store/userInfo';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const loginFormRef = ref(null);
  const loginForm = reactive({
    username: 'admin',
    password: '123456',
  });
  const rules = reactive({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  });

  const submitLogin = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        const userStore = useUserInfo();
        userStore
          .login(loginForm)
          .then(() => {
            ElMessage({
              message: '登录成功',
              type: 'success',
            });
            router.push('/');
          })
          .catch(() => {
            ElMessage({
              message: '登录失败',
              type: 'error',
            });
          });
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>

<style scoped>
  .login-wrapper {
    /*background: rebeccapurple;*/
    width: 300px;
    padding: 20px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
  }
</style>
