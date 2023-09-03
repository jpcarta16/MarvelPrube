import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';

// Agrega Vue Router a la instancia de la aplicación
app.use(router);

// Monta la aplicación en el elemento con el id "app" en tu HTML
app.mount('#app');
