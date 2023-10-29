
import { createRouter, createWebHistory } from 'vue-router';
import AboutUsPage from './components/AboutUsPage.vue';
import CalculPage from './components/CalculPage.vue';
import InscriptionPage from './components/InscriptionPage.vue';

const routes = [
  { path: '/', redirect: '/inscription' }, // Ajoutez cette ligne pour rediriger le chemin racine vers '/about'
  { path: '/about', component: AboutUsPage },
  { path: '/calcul', component: CalculPage },
  { path: '/inscription', component: InscriptionPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
