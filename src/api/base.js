import { getAction, postAction, uploadAction } from '@/api/manage';

// 获取信息
export const getInfo = (params) => getAction('/admin/admin/user_info', params);
// 登出
export const logout = (params) => getAction('/admin/login/logout', params);
// 登录
export const login = (params) => postAction('/admin/login/index', params);
