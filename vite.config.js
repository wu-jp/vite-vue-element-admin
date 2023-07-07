import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as path from 'path';
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue(), vueJsx(), Icons()],
  server: {
    port: 8080, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8080,
    },
    proxy: {
      '/admin': {
        target: 'https://yy-test.youyi800.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, ''),
      },
      '/common': {
        target: 'https://yy-test.youyi800.com/common',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/common/, ''),
      },
    },
  },
});
