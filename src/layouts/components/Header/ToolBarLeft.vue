<template>
  <div style="display: flex; align-items: center">
    <Collapse />
    <Breadcrumb v-if="breadcrumb" />
  </div>
</template>

<script setup>
  import Collapse from '@/layouts/components/Header/components/Collapse.vue';
  import Breadcrumb from '@/layouts/components/Header/components/Breadcrumb.vue';

  import {useConfigStore} from "@/store/modules/config";
  import {computed} from "vue";
  const configStore = useConfigStore()
  const breadcrumb = computed(() => configStore.breadcrumb)
</script>

<style lang="scss" scoped></style>
