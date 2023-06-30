import http from '@/api'

// menu list api
export const menuListApi = (params) => http.get('/admin/admin_menu/index', params);
