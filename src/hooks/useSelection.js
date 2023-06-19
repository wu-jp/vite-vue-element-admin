import { computed, ref } from 'vue';

export const useSelection = (rowKey = 'id') => {
  const isSelected = ref(false);
  const selectedList = ref([]);

  const selectedListIds = computed(() => {
    let ids = [];
    selectedList.value.forEach((item) => ids.push(item[rowKey]));
    return ids;
  });

  const selectionChange = (rowArr) => {
    rowArr.length ? (isSelected.value = true) : (isSelected.value = false);
    selectedList.value = rowArr;
  };

  return {
    isSelected,
    selectedList,
    selectedListIds,
    selectionChange,
  };
};
