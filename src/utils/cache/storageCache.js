import { isNullOrUnDef } from '@/utils/is';

export const createStorage = ({ storage = sessionStorage } = {}) => {
  const WebStorage = class WebStorage {
    constructor() {
      this.storage = storage;
    }

    /**
     * Set cache
     * @param {string} key
     * @param {*} value
     * @param {*} expire Expiration time in seconds
     */
    set(key, value, expire = null) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
      });

      this.storage.setItem(key, stringData);
    }

    /**
     * Read cache
     * @param {string} key
     * @param {*} def
     * @returns cache
     */
    get(key, def = null) {
      const val = this.storage.getItem(key);
      if (!val) return def;

      try {
        const data = JSON.parse(val);
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    /**
     * Delete cache based on key
     * @param {string} key
     */
    remove(key) {
      this.storage.removeItem(key);
    }

    /**
     * Delete all caches of this instance
     */
    clear() {
      this.storage.clear();
    }
  };

  return new WebStorage();
};
