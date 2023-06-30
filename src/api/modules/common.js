import http from '@/api'

// 登录
export const loginApi = params => http.post('/admin/login/index', params)

// 登出
export const logoutApi = params => http.get('admin/login/logout', params)

// 获取admin用户信息
export const getAdminInfoApi = () => http.get('/admin/admin/user_info', {})

