import http from '@/api'

// admin list
export const adminListApi = (params) => http.get('/admin/admin/index', params);

// store destroy update
export const handleAdminApi = (type, params) => http.post(`/admin/admin/${type}`, params);
