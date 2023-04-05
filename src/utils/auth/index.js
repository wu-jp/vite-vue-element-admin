import { Persistent } from '@/utils/cache/persistent';
// import { CacheTypeEnum } from '@/enums/cacheEnum';
// import projectSetting from '@/settings/projectSetting';
// import { TOKEN_KEY } from '@/enums/cacheEnum';

// const { permissionCacheType } = projectSetting;
// const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;
const isLocal = true;

export function getToken() {
  return getAuthCache('token');
}

export function getAuthCache(key) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key);
}

export function setAuthCache(key, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}
