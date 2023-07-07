<template>
  <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <IconCategory style="font-size: 20px" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item disabled>默认</el-dropdown-item>
          <el-dropdown-item>大型</el-dropdown-item>
          <el-dropdown-item>小型</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
  import IconCategory from '~icons/bxs/category';
</script>

<style lang="scss" scoped></style>
