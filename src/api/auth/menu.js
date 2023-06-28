import { getAction, postAction, uploadAction } from '@/api/manage';

export const fetchMenuList = (params) => getAction('/admin/admin_menu/index', params);
