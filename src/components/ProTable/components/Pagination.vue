<template>
  <el-pagination
    :background="true"
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    :page-sizes="[5, 10, 25, 50, 100]"
    :total="pageable.total"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
  const props = defineProps({
    pageable: {
      required: true,
      type: Object,
    },
    handleSizeChange: {
      required: true,
      type: Function,
    },
    handleCurrentChange: {
      required: true,
      type: Function,
    },
  });
</script>

