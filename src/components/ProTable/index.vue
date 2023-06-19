<template>
  <div> hah </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useTable } from '@/hooks/useTable';

  const props = defineProps({
    columns: {
      type: Array,
      default: () => [],
    },
    requestAuto: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    initParam: {
      type: Object,
      default: () => {},
    },
    border: {
      type: Boolean,
      default: true,
    },
    toolButton: {
      type: Boolean,
      default: true,
    },
    rowKey: {
      type: String,
      default: 'id',
    },
  });

  const isShowSearch = ref(true);
  const tableRef = ref(null);

  // 表格多选 Hooks
  const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);

  // 表格操作 Hooks
  const {
    tableData,
    pageable,
    searchParam,
    searchInitParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
  } = useTable(
    props.requestApi,
    props.initParam,
    props.pagination,
    props.dataCallback,
    props.requestError,
  );

  // 清空选中状态
  const clearSelection = () => tableRef.value.clearSelection();

  onMounted(() => props.requestAuto && getTableList());
</script>

<style lang="scss" scoped></style>
