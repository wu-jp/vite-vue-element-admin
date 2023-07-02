import { unref } from 'vue';
import { isArray, isObject } from '@/utils/is';

export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node) {
  return node?.parentNode ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl, obj) {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge(src = {}, target = {}) {
  let key;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(url, opt) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps(props) {
  const ret = {};

  Object.keys(props).map((key) => {
    ret[key] = unref(props[key]);
  });

  return ret;
}

export function getRawRoute(route) {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined,
  };
}

export const withInstall = (component, alias) => {
  const comp = component;
  comp.install = (app) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component;
};

/**
 * 格式化服务端返回的路由数据，更具具体的项目自己定义
 * @param data
 * @returns {*[]}
 */
export const formatMenuData = (data) => {
  return [...generateChildRouters(routerSort(data))];
};

// 对菜单进行排序
const routerSort = (arr) => {
  arr.sort((a, b) => a.sort - b.sort);
  arr.forEach((item) => {
    if (item._child && item._child.length) {
      item._child.sort((a, b) => a.sort - b.sort);
    }
  });
  return arr;
};

// 递归格式化
const generateChildRouters = (data) => {
  const routers = [];
  for (const item of data) {
    const menu = {
      path: item.router,
      hidden: item.hidden ? item.hidden : false,
      redirect: item.redirect ? item.redirect : '',
      component: item.component,
      meta: {
        title: item.title,
        icon: item.icon,
      },
    };
    if (item._child?.length > 0) {
      menu.children = [...generateChildRouters(item._child)];
    }
    // 是否生成路由
    if (item.route && item.route === '0') {
      console.log(' 不生成路由 item.route：  ' + item.route);
      console.log(' 不生成路由 item.path：  ' + item.path);
    } else {
      routers.push(menu);
    }
  }
  return routers;
};

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames label && value && children 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @returns {String}
 * */
export function filterEnum(callValue, enumData, fieldNames, type) {
  const value = fieldNames?.value ?? 'value';
  const label = fieldNames?.label ?? 'label';
  const children = fieldNames?.children ?? 'children';
  let filterData = {};
  // 判断 enumData 是否为数组
  if (Array.isArray(enumData)) filterData = findItemNested(enumData, callValue, value, children);
  // 判断是否输出的结果为 tag 类型
  if (type == 'tag') {
    return filterData?.tagType ? filterData.tagType : '';
  } else {
    return filterData ? filterData[label] : '--';
  }
}

/**
 * @description 递归查找 callValue 对应的 enum 值
 * */
export function findItemNested(enumData, callValue, value, children) {
  return enumData.reduce((accumulator, current) => {
    if (accumulator) return accumulator;
    if (current[value] === callValue) return current;
    if (current[children]) return findItemNested(current[children], callValue, value, children);
  }, null);
}

/**
 * @description 处理 prop 为多级嵌套的情况，返回的数据 (列如: prop: user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @returns {*}
 * */
export function handleRowAccordingToProp(row, prop) {
  if (!prop.includes('.')) return row[prop] ?? '--';
  prop.split('.').forEach((item) => (row = row[item] ?? '--'));
  return row;
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @returns {String}
 * */
export function handleProp(prop) {
  const propArr = prop.split('.');
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1];
}

export function formatValue(callValue) {
  // 如果当前值为数组，使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--';
  return callValue ?? '--';
}

// 左侧菜单渲染的列表 (需剔除 isHide == true 的菜单)
export function getShowMenuList(menuList) {
  let newMenuList = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

// 使用递归扁平化菜单，方便添加动态路由
export function getFlatMenuList(menuList) {
  let newMenuList = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : []),
  ]);
}

/**
 * 生成随机颜色 1: rgb(xxx,xxx,xxx) 2: #xxxxxx
 * @returns {string}
 */
export function randomColor() {
  // 方式一
  let r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;

  // 方式二
  // return `#${Math.random().toString(16).substring(2, 8).toUpperCase()}`;
}

export const getAllBreadcrumbList = (menuList, parent = [], result = {}) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];
    // console.log('item', item);
    if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
  }
  return result;
};
