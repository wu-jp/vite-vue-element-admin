import { createStorage as create } from './storageCache.js';

const createOptions = (storage, options = {}) => {
  return {
    storage,
    ...options,
  };
};

export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage = sessionStorage, options = {}) => {
  return create(createOptions(storage, options));
};

export const createLocalStorage = (options = {}) => {
  return createStorage(localStorage, options);
};

export const createSessionStorage = (options = {}) => {
  return createStorage(sessionStorage, options);
};

export default WebStorage;
