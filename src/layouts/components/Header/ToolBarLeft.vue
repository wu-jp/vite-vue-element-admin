<template>
  <div style="display: flex; align-items: center">
    <el-icon
      v-if="!asideType"
      :size="20"
      color="#30336b"
      @click="$emit('changeAsideWidth', true)"
    >
      <Expand />
    </el-icon>
    <el-icon
      v-else
      :size="20"
      color="#30336b"
      @click="$emit('changeAsideWidth', false)"
    >
      <Fold />
    </el-icon>

    <el-breadcrumb
      separator="/"
      style="margin-left: 20px"
    >
      <el-breadcrumb-item
        v-for="item in pathArray"
        :key="item.path"
      >
        {{
          item.meta.title
        }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
  import { ref, watch } from 'vue';
  const emit = defineEmits(['changeAsideWidth']);
  const props = defineProps(['asideType']);
  const route = useRoute();

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

<style lang="scss" scoped>

</style>
