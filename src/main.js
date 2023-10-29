import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles.css';

import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);

app.use(router);

app.use(vue3GoogleLogin, {
  clientId: '925086958562-o3g4rduj0epma3e4ssnheqgki0q96pgh.apps.googleusercontent.com' 
});

app.mount('#app');

createApp(App).mount('#app')
