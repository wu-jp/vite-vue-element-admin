<template>
  <div>
    <ProTable
      ref="proTableRef"
      v-if="showTable"
      :tree-props="{ children: '_child', hasChildren: 'hasChildren' }"
      :request-api="getTableList"
      :columns="columns"
      title="菜单列表"
      :pagination="false"
      :default-expand-all="expandTable"
    >
      <template #tableHeader="{ row }">
        <el-button type="primary" @click="addMenuRef.showDialog()"> 添 加 </el-button>
        <el-button type="primary" @click="changeExpand">
          {{ expandTable ? '折叠' : '展开' }}
        </el-button>
      </template>
      <template #method="{ row }">
        <el-tag
          v-if="row.method === 1 || row.method === 2 || row.method === 3"
          :type="row.method === 1 ? '' : row.method === 2 ? 'warning' : 'success'"
        >
          {{ row.method === 1 ? 'GET' : row.method === 2 ? 'POST' : 'ANY' }}
        </el-tag>
      </template>

      <template #operation="{ row }">
        <el-button v-if="row.is_system !== 1" text bg type="primary" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button v-if="row.is_system !== 1" text bg type="danger" @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </ProTable>

    <AddMenuDialog ref="addMenuRef" @updater="proTableRef.getTableList()" />
  </div>
</template>

<script setup>
  import ProTable from '@/components/ProTable/index.vue';
  import AddMenuDialog from '@/views/system/menuManagement/components/AddMenuDialog.vue';
  import { fetchMenuList } from '@/api/auth/menu';
  import { nextTick, ref } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { handleMenuApi } from '@/api/modules/system/menu';

  const proTableRef = ref();
  const addMenuRef = ref();

  // 表格配置项
  const columns = [
    { prop: 'title', label: '菜单名称', align: 'left', width: 200 },
    {
      prop: 'type',
      label: '菜单类型',
      tag: true,
      width: 100,
      enum: [
        { value: 1, label: '目录', tagType: 'success' },
        { value: 2, label: '菜单', tagType: '' },
        { value: 3, label: '按钮', tagType: 'warning' },
      ],
    },
    { prop: 'component', label: '组件', align: 'left' },
    { prop: 'router', label: '路径', align: 'left' },
    { prop: 'identity', label: '标识符' },
    { prop: 'url', label: '后端类库' },
    { prop: 'method', label: '请求方式', width: 100 },
    { prop: 'sort', label: '排序', width: 100 },
    { prop: 'operation', label: '操作', fixed: 'right', width: 160 },
  ];

  const getTableList = (params) => {
    return fetchMenuList(params);
  };

  const showTable = ref(true);
  const expandTable = ref(false);

  function changeExpand() {
    expandTable.value = !expandTable.value;
    showTable.value = false;
    nextTick(() => {
      showTable.value = true;
    });
  }
  const handleEdit = (row) => {
    addMenuRef.value.showDialog(row);
  };
  const handleDelete = (row) => {
    ElMessageBox.confirm('此操作将永久删除选中数据，是否继续？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        handleMenuApi('destroy', { id: row.id }).then((res) => {
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
</script>

<style lang="scss" scoped></style>
