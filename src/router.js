import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index';
import AboutUsPage from './components/AboutUsPage.vue';
import CalculPage from './components/CalculPage.vue';
import InscriptionPage from './components/InscriptionPage.vue';


const routes = [
  { path: '/', redirect: '/inscription' }, 
  { path: '/about', component: AboutUsPage },
  { path: '/calcul', name: 'Calcul', component: CalculPage },
  { path: '/inscription', name: 'inscription',component: InscriptionPage },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/inscription');
  } else {
    next();
  }
});

export default router;

