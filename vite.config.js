import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
  server: {
    port: 8080, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8080,
    },
    proxy: {
      '/admin': {
        target: 'http://yy.test.youyi800.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, ''),
      },
      '/common': {
        target: 'http://yy.test.youyi800.com/common',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/common/, ''),
      },
    },
  },
});
