<script setup>
  import { computed, ref } from 'vue';
  import SearchFormItem from './components/SearchFormItem.vue';
  import { Delete, Search } from '@element-plus/icons-vue';

  const props = defineProps({
    columns: {
      type: Array,
      default: () => [],
    },
    searchParam: {
      type: Object,
      default: () => {},
    },
  });

  // 是否默认折叠搜索项
  const collapaed = ref(false);

  // 获取响应式断点
  const gridRef = ref();
  const breakPoint = computed(() => gridRef.value?.breakPoint);

  const showCollapse = computed(() => {
    return false;
    let show = false;
    props.columns.reduce((prev, current) => {
      prev +=
        (current.search[breakPoint.value]?.span ?? current.search.span ?? 1) +
        (current.search[breakPoint.value]?.offset ?? current.search?.offset ?? 0);

      if (typeof props.searchCol !== 'number') {
        if (prev >= props.searchCol[breakPoint.value]) show = true;
      } else {
        if (prev >= props.searchCol) show = true;
      }
      return prev;
    }, 0);
    return show;
  });
</script>

<template>
  <div v-if="columns.length" class="card table-search">
    <el-form ref="formRef" :model="searchParam" inline>
      <el-form-item v-for="item in columns" :key="item.prop" :label="`${item.label}:`">
        <SearchFormItem :column="item" :search-param="searchParam" />
      </el-form-item>
      <el-form-item class="operation">
        <el-button type="primary" :icon="Search"> 搜索 </el-button>
        <el-button :icon="Delete"> 重置 </el-button>
        <el-button
          v-if="showCollapse"
          type="primary"
          link
          class="search-isOpen"
          @click="collapsed = !collapsed"
        >
          {{ collapaed ? '展开' : '合并' }}
          <el-icon class="el-icon--right">
            <component :is="collapsed ? ArrowDown : ArrowUp" />
          </el-icon>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
