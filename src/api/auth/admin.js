import { getAction, postAction, uploadAction } from '@/api/manage';

export const fetchAdminList = (params) => getAction('/admin/admin/index', params);

// store destroy update
export const fetchHandleAdmin = (type, params) => postAction(`/admin/admin/${type}`, params);
