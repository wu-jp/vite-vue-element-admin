<template>
  <template v-for="menu in props.menus" :key="menu.path">
    <el-sub-menu v-if="menu.children?.length" :index="menu.path">
      <template #title>
        <el-icon><Grid /></el-icon>
        <span class="sle">{{ menu.meta?.title ? menu.meta?.title : 'noTitle' }}</span>
      </template>
      <menu-tree :menus="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" @click="onClickMenu(menu)">
      <el-icon><Menu /></el-icon>
      <span class="sle">{{ menu.meta?.title ? menu.meta?.title : 'noTitle' }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const props = defineProps(['menus']);

  const onClickMenu = (menu) => {
    if (menu.path) {
      router.push(menu.path);
    }
  };
</script>

<style lang="scss">
  .el-sub-menu .el-sub-menu__title:hover {
    color: var(--el-menu-hover-text-color) !important;
    background-color: transparent !important;
  }
  .el-menu--collapse {
    .is-active {
      .el-sub-menu__title {
        color: #ffffff !important;
        background-color: var(--el-color-primary) !important;
      }
    }
  }
  .el-menu-item {
    &:hover {
      color: var(--el-menu-hover-text-color);
    }
    &.is-active {
      color: var(--el-menu-active-color) !important;
      background-color: var(--el-menu-active-bg-color) !important;
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        content: '';
        background-color: var(--el-color-primary);
      }
    }
  }
  .vertical,
  .classic,
  .transverse {
    .el-menu-item {
      &.is-active {
        &::before {
          left: 0;
        }
      }
    }
  }
  .columns {
    .el-menu-item {
      &.is-active {
        &::before {
          right: 0;
        }
      }
    }
  }
  .classic,
  .transverse {
    #driver-highlighted-element-stage {
      background-color: #606266 !important;
    }
  }
</style>
