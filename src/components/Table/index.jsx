import { defineComponent } from 'vue';

export default defineComponent({
  name: 'wu-table',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    autoHeight: {
      type: Boolean,
      default: null,
    },
    height: null, //固定高度
    contextMenu: Array, // 右键菜单
    defaultSort: Object,
    sortRefresh: {
      //排序后是否刷新
      type: Boolean,
      default: true,
    },
    emptyText: String, // 空数据显示的文字
    rowKey: {
      type: String,
      default: 'id',
    },
  },

  emits: ['selection-change', 'sort-change'],

  setup(props, { emit, expose }) {},
});
