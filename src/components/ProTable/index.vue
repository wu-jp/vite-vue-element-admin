<template>
  <div>
    <SearchForm
      v-show="isShowSearch"
      :search="search"
      :reset="reset"
      :columns="searchColumns"
      :search-param="searchParam"
    />
    <div class="card table-main">
      <!-- 表格头部 操作按钮 -->
      <div class="table-header">
        <div class="header-button-lf">
          <slot
            name="tableHeader"
            :selected-list-ids="selectedListIds"
            :selected-list="selectedList"
            :is-selected="isSelected"
          />
        </div>
        <div v-if="toolButton" class="header-button-ri">
          <slot name="toolButton">
            <el-button :icon="Refresh" circle @click="getTableList" />
            <el-button v-if="columns.length" :icon="Printer" circle @click="print" />
            <el-button v-if="columns.length" :icon="Operation" circle @click="openColSetting" />
            <el-button
              v-if="searchColumns.length"
              :icon="Search"
              circle
              @click="isShowSearch = !isShowSearch"
            />
          </slot>
        </div>
      </div>
      <el-table
        ref="tableRef"
        v-bind="$attrs"
        :border="border"
        :row-key="rowKey"
        @selection-change="selectionChange"
      >
        <slot></slot>
        <template v-for="item in tableColumns" :key="item">
          <!--selection index expand-->
          <el-table-column
            v-if="item.type && ['selection', 'index', 'expand'].includes(item.type)"
            v-bind="item"
            :align="item.align ?? 'center'"
            :reserve-selection="item.type === 'selection'"
          >
            <template v-if="item.type === 'expand'" #default="scope">
              <component :is="item.render" v-bind="scope" v-if="item.render"></component>
              <slot :name="item.type" v-bind="scope"></slot>
            </template>
          </el-table-column>

          <!-- other -->
          <TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" v-bind="scope"></slot>
            </template>
          </TableColumn>
        </template>
        <!-- 插入表格最后一行之后的插槽 -->
        <template #append>
          <slot name="append"> </slot>
        </template>
        <!-- 无数据 -->
        <template #empty>
          <div class="table-empty">
            <slot name="empty">
              <img src="@/assets/images/notData.png" alt="notData" />
              <div>暂无数据</div>
            </slot>
          </div>
        </template>
      </el-table>

      <!--分页组件-->
      <slot name="pagination">
        <Pagination
          v-if="pagination"
          :pageable="pageable"
          :handle-size-change="handleSizeChange"
          :handle-current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
  import SearchForm from '@/components/SearchForm/index.vue';
  import TableColumn from './components/TableColumn.vue';
  import { onMounted, provide, ref, watch } from 'vue';
  import { useTable } from '@/hooks/useTable';
  import { useSelection } from '@/hooks/useSelection';
  import { Operation, Printer, Refresh, Search } from '@element-plus/icons-vue';

  const props = defineProps({
    columns: {
      type: Array,
      default: () => [],
    },
    requestAuto: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    initParam: {
      type: Object,
      default: () => {},
    },
    border: {
      type: Boolean,
      default: true,
    },
    toolButton: {
      type: Boolean,
      default: true,
    },
    rowKey: {
      type: String,
      default: 'id',
    },
  });

  const isShowSearch = ref(true);
  const tableRef = ref(null);

  // 表格多选 Hooks
  const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);

  // 表格操作 Hooks
  const {
    tableData,
    pageable,
    searchParam,
    searchInitParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
  } = useTable(
    props.requestApi,
    props.initParam,
    props.pagination,
    props.dataCallback,
    props.requestError,
  );

  // 清空选中状态
  const clearSelection = () => tableRef.value.clearSelection();

  // 初始化请求
  onMounted(() => props.requestAuto && getTableList());

  // 监听页面 initParam 改变，重新获取表格数据
  watch(() => props.initParam, getTableList, { deep: true });

  // 接受 columns 并设置响应式
  const tableColumns = ref(props.columns);

  // 定义enumMap 存储 enum 值
  const enumMap = ref(new Map());

  provide('enumMap', enumMap);

  const setEnumMap = async (col) => {
    if (!col.enum) return;
    // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
    if (typeof col.enum !== 'function') return enumMap.value.set(col.prop, col.enum);
    const data = await col.enum();
    enumMap.value.set(col.prop, data);
  };

  // 扁平化 columns
  const flatColumnsFunc = (columns, flatArr = []) => {
    columns.forEach(async (col) => {
      if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));

      flatArr.push(col);

      col.isShow = col.isShow ?? true;

      col.isFilterEnum = col.isFilterEnum ?? true;

      // 设置 enumMap
      setEnumMap(col);
    });
    return flatArr.filter((item) => !item._children?.length);
  };

  // flatColumns
  const flatColumns = ref([]);
  flatColumns.value = flatColumnsFunc(tableColumns.value);

  // 过滤需要搜索的配置项目
  const searchColumns = flatColumns.value.filter((item) => item.search?.el || item.search?.render);

  // 设置搜索表单排序默认值 && 设置搜索表单项的默认值
  searchColumns.forEach((column, index) => {
    column.search.order = column.search.order ?? index + 2;
    if (column.search?.defaltValue !== undefined && column.search?.default !== null) {
      searchInitParam.value[column.search.key ?? handleProp(column.prop)] =
        column.search?.defaultValue;
      searchParam.value[column.search.key ?? handleProp(column.prop)] = column.search?.defaultValue;
    }
  });

  // 排序搜索表单项
  searchColumns.sort((a, b) => a.search.order - b.search.order);

  // 列设置 => 过滤掉不需要的列设置
  const colRef = ref();
  const colSetting = tableColumns.value.filter(
    (item) =>
      ['selection', 'index', 'expand'].includes(item.type) &&
      item.prop !== 'operation' &&
      item.isShow,
  );
  const openColSetting = () => colRef.value.openColSetting();

  defineExpose({
    element: tableRef,
    tableData,
    pageable,
    searchParam,
    searchInitParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    clearSelection,
    enumMap,
    isSelected,
    selectedList,
    selectedListIds,
  });
</script>

<style lang="scss" scoped></style>
