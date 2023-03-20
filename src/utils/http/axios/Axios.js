import axios from "axios";
import { isFunction } from "../../is";
import { AxiosCanceler } from "./axiosCancel";
import { cloneDeep } from 'lodash-es';
import qs from 'qs'
import { ContentTypeEnum, RequestEnum } from './httpEnum'

export class MAxios {
  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  createAxios(config) {
    this.axiosInstance = axios.create(config);
  }

  getTransform(options) {
    const { transform } = this.options;
    return transform;
  }

  getAxios() {
    return this.axiosInstance;
  }

  configAxios(config) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  setHeader(headers) {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * 设置请求拦截器
   */
  setupInterceptors() {
    const transform = this.getTransform();

    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    this.axiosInstance.interceptors.request.use(config => {
      const { ignoreCancelToken } = config.requestOptions;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;

      !ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      );

    this.axiosInstance.interceptors.response.use(res => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, error => {
        responseInterceptorsCatch(this.axiosInstance, error);
      });
  }

  /**
   * 上传文件
   */
  uploadFile(config, params) {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }

    if (params.data) {
      Object.keys(params.data).forEach(key => {
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(`${key}[]`, item)
          })
          return
        }
        formData.append(key, params.data[key])
      })
    }

    return this.axiosInstance.request({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true
      }
    })
  }

  supperFormData(config) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (contentType !== ContentTypeEnum.FORM_URLENCODED || iReflect.has(config, 'data') || config.method?.toUpperCase() === RequestEnum.GET) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' })
    }
  }

  get(config, options) {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post(config, options) {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put(config, options) {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete(config, options) {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request(config, options) {
    let conf = cloneDeep(config)
    const transform = this.getTransform();

    const { requestOptions } = this.options

    const opt = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }

    conf.requestOptions = opt

    conf = this.supperFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance.request(cong).then(res => {
        if (transformRequestHook && isFunction(transformRequestHook)) {
          try {
            const ret = transformRequestHook(res, opt)
            resolve(ret)
          } catch (err) {
            reject(err || new Error('request error!'))
          }
        }
      }).catch(e => {
        if (requestCatchHook && isFunction(requestCatchHook)) {
          requestCatchHook(e, opt)
          return
        }
        if (axios.isAxiosError(e)) {
          // rewrite error message from axios in here
        }
        reject(e)
      })
    })
  }
}
