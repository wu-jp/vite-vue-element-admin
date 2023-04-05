import { createLocalStorage, createSessionStorage } from '@/utils/cache/index';
import { Memory } from '@/utils/cache/memory';
import { toRaw } from 'vue';

const ls = createLocalStorage();
const ss = createSessionStorage();

const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);

function initPersistentMemory() {
  const localCache = ls.get('common_local_key');
  const sessionCache = ss.get('common_session_key');
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

export class Persistent {
  static getLocal(key) {
    return localMemory.get(key)?.value;
  }

  static setLocal(key, value, immediate = false) {
    localMemory.set(key, toRaw(value));
    immediate && ls.set('common_local_key', localMemory.getCache());
  }

  static removeLocal(key, immediate = false) {
    localMemory.remove(key);
    immediate && ls.set('common_local_key', localMemory.getCache());
  }

  static clearLocal(immediate) {
    localMemory.clear();
    immediate && ls.clear();
  }

  static getSession(key) {
    return sessionMemory.get(key)?.value;
  }

  static setSession(key, value, immediate = false) {
    sessionMemory.set(key, toRaw(value));
    immediate && ss.set('common_session_key', sessionMemory.getCache());
  }

  static removeSession(key, immediate) {
    sessionMemory.remove(key);
    immediate && ss.set('common_session_key', sessionMemory.getCache());
  }

  static clearSession(immediate = false) {
    sessionMemory.clear();
    immediate && ss.clear();
  }

  static clearAll(immdiate = false) {
    sessionMemory.clear();
    localMemory.clear();
    if (immdiate) {
      ss.clear();
      ls.clear();
    }
  }
}

// window.addEventListener('beforeunload', function () {
//
// })

initPersistentMemory();
