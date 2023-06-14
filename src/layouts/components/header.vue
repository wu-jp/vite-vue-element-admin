<template>
  <el-header class="header-container">
    <div style="display: flex; align-items: center">
      <el-icon
        v-if="!asideType"
        :size="20"
        color="#409EFF"
        @click="$emit('changeAsideWidth', true)"
      >
        <Expand />
      </el-icon>
      <el-icon v-else :size="20" color="#409EFF" @click="$emit('changeAsideWidth', false)">
        <Fold />
      </el-icon>

      <el-breadcrumb separator="/" style="margin-left: 20px">
        <el-breadcrumb-item v-for="item in pathArray" :key="item.path">{{
          item.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <Navbar />
  </el-header>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import Navbar from './navBar/index.vue';
  import { ref, watch } from 'vue';
  const emit = defineEmits(['changeAsideWidth']);
  const props = defineProps(['asideType']);
  const route = useRoute();
  // console.log('当前路由信息', route);

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

<style scoped>
  .header-container {
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
