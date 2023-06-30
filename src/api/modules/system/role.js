import http from '@/api'

// role list api
export const roleListApi = (params) => http.get('/admin/admin_role/index', params);
