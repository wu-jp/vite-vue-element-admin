<template>
  <div style="display: flex; align-items: center">
    <el-icon v-if="!isCollapse" :size="20" color="#30336b" @click="changeCollapse">
      <Expand />
    </el-icon>
    <el-icon v-else :size="20" color="#30336b" @click="changeCollapse">
      <Fold />
    </el-icon>

    <el-breadcrumb separator="/" style="margin-left: 20px">
      <el-breadcrumb-item v-for="item in pathArray" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { computed, ref, watch } from 'vue';
  import { useConfigStore } from '@/store/modules/config';
  const emit = defineEmits(['changeAsideWidth']);
  const route = useRoute();
  const configStore = useConfigStore();
  const isCollapse = computed(() => configStore.isCollapse);

  const changeCollapse = () => {
    console.log('dfadsf');
    configStore.setConfigState('isCollapse', !configStore.isCollapse);
  };

  const pathArray = ref([]);
  watch(
    () => route.matched,
    (value) => {
      if (value) {
        console.log('value.matched', value);
        pathArray.value = value;
      }
    },
  );
</script>

<style lang="scss" scoped></style>
