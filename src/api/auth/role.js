import { getAction, postAction, uploadAction } from '@/api/manage';

export const fetchRoleList = (params) => getAction('/admin/admin_role/index', params);
