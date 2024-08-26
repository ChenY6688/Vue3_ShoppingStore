// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// npm i vue-router
import router from './router'
// npm install bootstrap-icons-vue
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
// npm i pinia
import { createPinia } from 'pinia'
// 引入axios自定義插件
import axiosPlugin from '@/plugins/axiosPlugin';
// npm install vuestic-ui
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(BootstrapIconsPlugin)
app.use(pinia)
app.use(axiosPlugin)
app.use(createVuestic())
app.mount('#app')
