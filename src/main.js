import { createApp } from 'vue';
import router from './router/index.js';
import store from './store/index.js';
import 'normalize.css/normalize.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/index.scss';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import '@/styles/reset.scss';
import '@/styles/common.scss';
import '@/assets/iconfont/iconfont.scss';
import '@/assets/fonts/font.scss';
import '@/styles/element.scss';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');
