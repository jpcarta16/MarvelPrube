import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';

app.use(router);

app.mount('#app');
