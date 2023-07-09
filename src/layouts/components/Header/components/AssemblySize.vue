<template>
  <div>
    <el-dropdown trigger="click" @command="setAssemblySize">
      <span class="el-dropdown-link">
        <IconLayout2Fill style="font-size: 20px" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in assemblySizeList"
            :key="item.value"
            :command="item.value"
            :disabled="assemblySize === item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
  import IconLayout2Fill from '~icons/ri/layout-2-fill';
  import { useConfigStore } from '@/store/modules/config';
  import { computed } from 'vue';

  const configStore = useConfigStore();
  const assemblySize = computed(() => configStore.assemblySize);

  const assemblySizeList = [
    { label: '默认', value: 'default' },
    { label: '大型', value: 'large' },
    { label: '小型', value: 'small' },
  ];

  const setAssemblySize = (item) => {
    if (item === assemblySize.value) return;
    configStore.setConfigState('assemblySize', item);
  };
</script>

<style lang="scss" scoped></style>
