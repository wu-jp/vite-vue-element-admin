import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
  baseURL: '',
  timeout: 5 * 1000,
});

service.interceptors.request.use(
  (config) => {
    // TODO 添加token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 0) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 3 * 1000,
      });
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    ElMessage({
      message: error.msg,
      type: 'error',
      duration: 3 * 1000,
    });
    return Promise.reject(error);
  },
);

export { service as axios };
