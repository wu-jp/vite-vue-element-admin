<template>
  <el-dialog
    v-model="dialogVisible"
    title="授权"
    width="700px"
    :before-close="handleClose"
    append-to-body
    :show-close="false"
  >
    <el-tree ref="authTree" :data="authList" show-checkbox node-key="id" :props="defaultProps" />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmForm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { nextTick, reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { getRoleAuthListApi, handleRoleApi, ruleAuthApi } from '@/api/modules/system/role';

  const emit = defineEmits(['updater']);
  const authList = ref([]);
  const defaultProps = ref({
    children: '_child',
    label: 'title',
  });

  const authTree = ref();
  const dialogVisible = ref(false);
  const role_id = ref(null);

  async function showDialog(row) {
    role_id.value = row.id;
    dialogVisible.value = true;
    const res = await getRoleAuthListApi({ role_id: row.id });
    authList.value = res.data.access;
    nextTick(() => {
      res.data.checked.forEach((el) => {
        authTree.value.setChecked(el, true, false);
      });
    });
  }

  async function confirmForm() {
    const params = {
      role_id: role_id.value,
      rules: [...authTree.value.getHalfCheckedKeys(), ...authTree.value.getCheckedKeys()],
    };
    ruleAuthApi(params).then((res) => {
      if (res.code === 0) {
        ElMessage.success('授权成功');
        emit('updater');
        dialogVisible.value = false;
      }
    });
  }

  defineExpose({
    showDialog,
  });
</script>

<style lang="scss" scoped></style>
