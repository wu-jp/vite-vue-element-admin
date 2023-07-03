<template>
  <el-dialog
    v-model="dialogVisible"
    title="菜单"
    width="700px"
    :before-close="handleClose"
    append-to-body
    :show-close="false"
  >
    <el-form :model="formData" ref="formRef" :rules="rules" label-width="100px">
      <el-form-item label="菜单类型:" prop="type">
        <el-radio-group v-model="formData.type" size="large">
          <el-radio-button :label="1">目录</el-radio-button>
          <el-radio-button :label="2">菜单</el-radio-button>
          <el-radio-button :label="3">按钮/权限</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称:" prop="title">
        <el-input v-model="formData.title" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item v-if="formData.type !== 1" label="上级菜单:" prop="id_str">
        <el-cascader
          v-model="formData.id_str"
          placeholder="请选择"
          clearable
          :options="menuList"
          :props="{
            multiple: false,
            checkStrictly: true,
            label: 'title',
            value: 'id',
            children: '_child',
          }"
        />
      </el-form-item>
      <el-form-item v-if="formData.type !== 3" label="菜单路径:" prop="router">
        <el-input v-model="formData.router" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item v-if="formData.type === 2" label="前端组件:" prop="component">
        <el-input v-model="formData.component" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item v-if="formData.type === 3" label="权限标识:" prop="identity">
        <el-input v-model="formData.identity" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item v-if="formData.type !== 1" label="接口请求方式:" prop="method">
        <el-radio-group v-model="formData.method" size="large">
          <el-radio-button :label="1">GET</el-radio-button>
          <el-radio-button :label="2">POST</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单鉴权:">
        <el-checkbox v-model="formData.auth" label="需要登录" border></el-checkbox>
        <el-checkbox v-model="formData.permission" label="访问鉴权" border></el-checkbox>
        <el-checkbox v-model="formData.enable_log" label="记录日志" border></el-checkbox>
        <el-checkbox v-model="formData.show" label="显示路由" border></el-checkbox>
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input-number
          :min="1"
          :max="99999"
          :step="1"
          step-strictly
          v-model="formData.sort"
          placeholder="请输入"
          clearable
          :style="{ width: '30%' }"
        />
      </el-form-item>
      <el-form-item label="是否路由菜单:" prop="is_router_menu">
        <el-switch v-model="formData.is_router_menu" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="是否缓存路由:" prop="enable_cache">
        <el-switch v-model="formData.enable_cache" />
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
  import { onMounted, reactive, ref } from 'vue';
  import { handleRoleApi } from '@/api/modules/system/role';
  import { ElMessage } from 'element-plus';
  import { handleMenuApi, menuListApi } from '@/api/modules/system/menu';

  const emit = defineEmits(['updater']);

  const formRef = ref();
  const dialogVisible = ref(false);
  const handleClose = () => {};
  const formData = reactive({
    type: 1,
    title: '',
    id_str: '',
    router: '',
    component: '',
    identity: '',
    method: '',
    auth: '',
    permission: '',
    enable_log: '',
    show: '',
    sort: '',
    is_router_menu: '',
    enable_cache: '',
  });
  const rules = reactive({
    type: [],
  });

  onMounted(() => {
    getMenuList();
  });
  const menuList = ref([]);
  const getMenuList = () => {
    menuListApi().then((res) => {
      console.log('菜单列表', res);
      menuList.value = res.data;
    });
  };

  const showDialog = (row) => {
    dialogVisible.value = true;
  };

  const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
    formData.show = '';
    formData.enable_log = '';
    formData.permission = '';
    formData.auth = '';
    dialogVisible.value = false;
  };

  const confirmForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        // console.log(formData);
        const params = {
          ...formData,
          parent_id: formData.id_str ? formData.id_str[formData.id_str.length - 1] : '',
          show: formData.show ? 1 : 0,
          enable_log: formData.enable_log ? 1 : 0,
          permission: formData.permission ? 1 : 0,
          auth: formData.auth ? 1 : 0,
        };
        console.log(params);

        const type = formData.id ? 'update' : 'store';
        handleMenuApi(type, params).then((res) => {
          ElMessage.success(formData.id ? '更新成功' : '创建成功');
          emit('updater');
          getMenuList();
          resetForm(formRef.value);
        });
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  defineExpose({
    showDialog,
  });
</script>

<style lang="scss" scoped></style>
