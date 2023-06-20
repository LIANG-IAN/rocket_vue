//環境變數用
const apiUrl = import.meta.env.VITE_APP_API_URL;

import './stylesheet/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);
library.add(fas);

import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)

// 設定環境變數
app.config.globalProperties.$apiUrl = apiUrl;

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())

app.config.globalProperties.$axios = axios
app.use(router)
app.use(VueSweetalert2);
app.mount('#app')
