import http from '@/api';

// menu list api
export const menuListApi = () => http.get('/admin/admin_menu/index', {});

// store destroy update
export const handleMenuApi = (type, params) => http.post(`/admin/admin_menu/${type}`, params);
