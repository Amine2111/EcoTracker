
import { createRouter, createWebHistory } from 'vue-router';
import AboutUsPage from './components/AboutUsPage.vue';
import CalculPage from './components/CalculPage.vue';
import InscriptionPage from './components/InscriptionPage.vue';

const routes = [
  { path: '/', redirect: '/inscription' }, 
  { path: '/about', component: AboutUsPage },
  { path: '/calcul', name: 'Calcul', component: CalculPage },
  { path: '/inscription', component: InscriptionPage },
  {path: '/', name: 'Home', component: () => import('./components/HomePage.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
