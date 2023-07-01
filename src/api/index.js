import axios from 'axios';
import { ElMessage } from 'element-plus';
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/serviceLoading';
import router from '@/router';
import { useUser } from '@/store/modules/user';

const config = {
  baseURL: '',
  timeout: 10 * 1000,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

class RequestHttp {
  service;
  constructor(config) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config) => {
        // 1. 配置loading 则 显示loading
        config.loading && showFullScreenLoading();
        // 2. 设置请求头token
        const userStore = useUser();
        const token = userStore.getToken;
        if (token) {
          config.headers['Auth-Token'] = token;
        }
        // if (sessionStorage.token) {
        //     config.headers['User-Token'] = sessionStorage.token
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.service.interceptors.response.use(
      (response) => {
        const { data } = response;
        // 1. 关闭loading
        tryHideFullScreenLoading();
        // 2. 判断data.resCode
        // 登录失效
        if (data.code == 143 || data.code == 144) {
          router.replace('/login');
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 错误
        if (data.code && data.code != 0) {
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 成功
        return data;
      },
      async (error) => {
        const { response } = error;
        // 1. 关闭loading
        tryHideFullScreenLoading();
        // 2. 网络超时判断 && 网络错误判断
        if (error.message.indexOf('timeout') !== -1) Message.error('请求超时！请您稍后重试');
        if (error.message.indexOf('Network Error') !== -1) Message.error('网络错误！请您稍后重试');
        // 3. 根据服务器响应的错误码，做处理

        return Promise.reject(error);
      },
    );
  }

  get(url, params, _object = {}) {
    return this.service.get(url, { params, ..._object });
  }
  post(url, params, _object = {}) {
    return this.service.post(url, params, _object);
  }
  put(url, params, _object = {}) {
    return this.service.put(url, params, _object);
  }
  delete(url, params, _object = {}) {
    return this.service.delete(url, { params, ..._object });
  }
  download(url, params, _object = {}) {
    return this.service.post(url, params, { ..._object, responseType: 'blob' });
  }
}

export default new RequestHttp(config);
