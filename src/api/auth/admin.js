import { getAction, postAction, uploadAction } from '@/api/manage';

export const fetchAdminList = (params) => getAction('/admin/admin/index', params);
