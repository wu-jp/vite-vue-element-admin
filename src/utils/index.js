import { unref } from 'vue';
import { isObject } from '@/utils/is';

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

// 生成首页路由
export const generateIndexRouter = (data) => {
  data = routerSort(data);
  const indexRouter = [...generateChildRouters(data)];
  return indexRouter;
};

// 对路由进行排序
const routerSort = (arr) => {
  arr.sort((a, b) => a.sort - b.sort);
  arr.forEach((item) => {
    if (item._child && item._child.length) {
      item._child.sort((a, b) => a.sort - b.sort);
    }
  });
  return arr;
};

// 生成嵌套路由（子路由）
const generateChildRouters = (data) => {
  const routers = [];
  for (const item of data) {
    let component = '';
    if (item.level === 1) {
      component = 'layout/index.vue';
    } else if (item._child && item.level !== 2) {
      component = 'layout/pageView/Index';
    } else {
      component = 'views/' + item.component;
    }
    const menu = {
      path: item.router,
      hidden: item.hidden ? item.hidden : false,
      redirect: item.redirect ? item.redirect : '',
      component: (resolve) => require(['@/' + component + '.vue'], resolve),
      meta: {
        title: item.title,
        icon: item.icon,
      },
    };
    if (item._child && item._child.length > 0) {
      menu.children = [...generateChildRouters(item._child)];
    }
    // --update-begin----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
    // 判断是否生成路由
    if (item.route && item.route === '0') {
      console.log(' 不生成路由 item.route：  ' + item.route);
      console.log(' 不生成路由 item.path：  ' + item.path);
    } else {
      routers.push(menu);
    }
    // --update-end----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
  }
  return routers;
};
