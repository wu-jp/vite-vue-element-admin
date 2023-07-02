import { computed, reactive, toRefs } from 'vue';

/**
 * table 页面操作方法封装
 * @param api 获取表格数据 api 方法 必传
 * @param initParam 获取数据初始化参数
 * @param isPageable 是否有分页
 * @param dataCallBack 对后台返回的数据进行处理的回调方法
 * @param requestError 调用接口错误的回调
 * @returns {{searchInitParam: ToRef<UnwrapNestedRefs<{searchInitParam: {}, totalParam: {}, searchParam: {}, pageable: {total: number, pageSize: number, pageNum: number}, tableData: *[]}>["searchInitParam"]>, totalParam: ToRef<UnwrapNestedRefs<{searchInitParam: {}, totalParam: {}, searchParam: {}, pageable: {total: number, pageSize: number, pageNum: number}, tableData: *[]}>["totalParam"]>, search: (function(): void), searchParam: ToRef<UnwrapNestedRefs<{searchInitParam: {}, totalParam: {}, searchParam: {}, pageable: {total: number, pageSize: number, pageNum: number}, tableData: *[]}>["searchParam"]>, getTableList: (function(): Promise<void>), handleSizeChange: (function(*): void), updateTotalParam: (function(): void), pageable: ToRef<UnwrapNestedRefs<{searchInitParam: {}, totalParam: {}, searchParam: {}, pageable: {total: number, pageSize: number, pageNum: number}, tableData: *[]}>["pageable"]>, reset: (function(): void), tableData: ToRef<UnwrapNestedRefs<{searchInitParam: {}, totalParam: {}, searchParam: {}, pageable: {total: number, pageSize: number, pageNum: number}, tableData: *[]}>["tableData"]>, handleCurrentChange: (function(*): void)}}
 */
export const useTable = (api, initParam, isPageable, dataCallBack, requestError) => {
  const state = reactive({
    tableData: [],
    pageable: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    },
    searchParam: {},
    searchInitParam: {},
    totalParam: {},
  });

  const pageParam = computed({
    get: () => {
      // return {
      //   pageNum: state.pageable.pageNum,
      //   pageSize: state.pageable.pageSize,
      // };

      // 兼容字段名😂 根据项目分页字段自行调整
      return {
        page: state.pageable.pageNum,
        per_page: state.pageable.pageSize,
      };
    },
    set: (newVal) => {
      console.log('我是分页更新之后的值', newVal);
    },
  });

  const getTableList = async () => {
    if (!api) return;
    try {
      Object.assign(state.totalParam, initParam, isPageable ? pageParam.value : {});
      console.log('合并列表请求参数', { ...state.searchInitParam, ...state.totalParam });
      let { data } = await api({ ...state.searchInitParam, ...state.totalParam });

      // let { data } = await api();
      console.log('请求数据结果✅', data);
      dataCallBack && (data = dataCallBack(data));

      state.tableData = isPageable ? data.list : data;

      if (isPageable) {
        // 兼容字段名😂 根据项目分页字段自行调整
        const { current_page: pageNum, limit: pageSize, total } = data;
        updatePageable({ pageNum, pageSize, total });
      }
    } catch (error) {
      requestError && requestError(error);
    }
  };

  /**
   * 更新查询参数
   */
  const updateTotalParam = () => {
    state.totalParam = {};
    let newSearchParam = {};
    for (let key in state.searchParam) {
      if (
        state.searchParam[key] ||
        state.searchParam[key] === false ||
        state.searchParam[key] === 0
      ) {
        newSearchParam[key] = state.searchParam[key];
      }
    }
    Object.assign(state.totalParam, newSearchParam, isPageable ? pageParam.value : {});
  };

  /**
   * 更新分页信息
   * @param pageable
   */
  const updatePageable = (pageable) => {
    Object.assign(state.pageable, pageable);
  };

  /**
   * 表格数据查询
   */
  const search = () => {
    state.pageable.pageNum = 1;
    updateTotalParam();
    getTableList();
  };

  /**
   * 表格数据重置
   */
  const reset = () => {
    state.pageable.pageNum = 1;
    state.searchParam = {};
    Object.keys(state.searchInitParam).forEach((key) => {
      state.searchParam[key] = state.searchInitParam[key];
    });
    updateTotalParam();
    getTableList();
  };

  /**
   * 每页条数改变
   * @param val
   */
  const handleSizeChange = (val) => {
    state.pageable.pageNum = 1;
    state.pageable.pageSize = val;
    getTableList();
  };

  /**
   * 改变页数
   * @param val
   */
  const handleCurrentChange = (val) => {
    state.pageable.pageNum = val;
    getTableList();
  };

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    updateTotalParam,
  };
};
