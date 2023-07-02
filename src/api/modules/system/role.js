import http from '@/api';

// role list api
export const roleListApi = (params) => http.get('/admin/admin_role/index', params);

// store destroy update
export const handleRoleApi = (type, params) => http.post(`/admin/admin_role/${type}`, params);

// 获取当前角色的授权列表
export const getRoleAuthListApi = (params) => http.get('/admin/admin_role/access', params);

// 角色授权
export const ruleAuthApi = (params) => http.post('/admin/admin_role/modify_access', params);
