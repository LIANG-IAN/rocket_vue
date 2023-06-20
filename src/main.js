import './stylesheet/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { fab } from '@fortawesome/free-brands-svg-icons';


import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

library.add(fas);
library.add(fab);

const app = createApp(App)
const pinia = createPinia()

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())

app.config.globalProperties.$axios = axios

app.use(pinia)
app.use(router)
app.use(VueSweetalert2);
app.mount('#app')
