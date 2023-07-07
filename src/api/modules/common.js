import http from '@/api'
import authMenuList from "@/assets/json/authMenuList.json";
import authButtonList from "@/assets/json/authButtonList.json";

// 模拟请求菜单列表
export const mockMenuListApi = () => authMenuList
// 模拟请求按钮列表
export const mockButtonListApi = () => authButtonList

// 登录
export const loginApi = params => http.post('/admin/login/index', params)

// 登出
export const logoutApi = params => http.get('admin/login/logout', params)

// 获取admin用户信息
export const getAdminInfoApi = () => http.get('/admin/admin/user_info', {})

