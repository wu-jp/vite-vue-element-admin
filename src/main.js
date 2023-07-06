import { createApp } from 'vue';
import App from './App.vue';

// import 'normalize.css/normalize.css';
import '@/styles/reset.scss';
import '@/styles/common.scss';
import '@/assets/iconfont/iconfont.scss';
import '@/assets/fonts/font.scss';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/styles/theme/element-dark.scss';
import '@/styles/element.scss';

import ElementPlus from 'element-plus';
import router from './router/index.js';
import store from './store/index.js';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import directives from '@/directives';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus).use(directives).use(router).use(store).mount('#app');
