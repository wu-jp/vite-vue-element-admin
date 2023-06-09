<script setup>
  import { computed, inject, ref } from 'vue';
  import { handleProp } from '@/utils';

  const props = defineProps(['column', 'searchParam']);

  const _searchParam = computed(() => props.searchParam);

  const fieldNames = computed(() => {
    return {
      label: props.column.fieldNames?.label ?? 'label',
      value: props.column.fieldNames?.value ?? 'value',
      children: props.column.fieldNames?.children ?? 'children',
    };
  });

  const enumMap = inject('enumMap', ref(new Map()));
  const columnEnum = computed(() => {
    let enumData = enumMap.value.get(props.column.prop);
    if (!enumData) return [];
    if (props.column.search?.el === 'select-v2' && props.column.fieldNames) {
      enumData = enumData.map((item) => {
        return {
          ...item,
          label: item[fieldNames.value.label],
          value: item[fieldNames.value.value],
        };
      });
    }

    return enumData;
  });

  const handleSearchProps = computed(() => {
    const label = fieldNames.value.label;
    const value = fieldNames.value.value;
    const children = fieldNames.value.children;
    const searchEl = props.column.search?.el;
    let searchProps = props.column.search?.props ?? {};
    if (searchEl === 'tree-select') {
      searchProps = {
        ...searchProps,
        props: { ...searchProps.props, label, children },
        nodeKey: value,
      };
    }
    if (searchEl === 'cascader') {
      searchProps = { ...searchProps, props: { ...searchProps.props, label, value, children } };
    }
    return searchProps;
  });

  const placeholder = computed(() => {
    const search = props.column.search;
    if (
      ['datetimerange', 'daterange', 'monthrange'].includes(search?.props?.type) ||
      search?.props?.isRange
    ) {
      return { rangeSeparator: '至', startPlaceholder: '开始时间', endPlaceholder: '结束时间' };
    }
    const placeholder =
      search?.props?.placeholder ?? (search?.el?.includes('input') ? '请输入' : '请选择');
    return { placeholder };
  });

  const clearable = computed(() => {
    const search = props.column.search;
    return (
      search?.props?.clearable ??
      (search?.defaultValue == null || search?.defaultValue == undefined)
    );
  });
</script>

<template>
  <component
    :is="column.search.render ?? `el-${column.search.el}`"
    v-bind="{ ...handleSearchProps, ...placeholder, searchParam, clearable }"
    v-model="_searchParam[column.search?.key ?? handleProp(column.prop)]"
    :data="column.search.el === 'tree-select' ? columnEnum : []"
    :options="['cascader', 'select-v2'].includes(column.search.el) ? columnEnum : []"
  >
    <template
      v-if="column.search.el === 'cascader'"
      #default="{ data }"
    >
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column.search.el === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      />
    </template>
    <slot v-else />
  </component>
</template>

<style scoped lang="scss"></style>
