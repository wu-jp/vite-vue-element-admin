<template>
  <el-pagination
    :background="true"
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]"
    :total="pageable.total"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup>
  const props = defineProps({
    pageable: {
      type: Object,
    },
    handleSizeChange: {
      type: Function,
    },
    handleCurrentChange: {
      type: Function,
    },
  });
</script>

<style lang="scss" scoped></style>
