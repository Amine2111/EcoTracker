// src/store/index.js
import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    user: null, // L'objet user sera null quand l'utilisateur n'est pas connecté
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    signOut(state) {
      state.user = null;
    },
  },
  actions: {
    async signIn({ commit }, { email }) {
      try {
        // Ici, vous pouvez ajouter votre logique de connexion à un backend ou à Firebase, etc.
        // Pour l'exemple, je vais simplement simuler une connexion
        const user = { email, name: 'John Doe' }; // Remplacez ceci par la réponse de votre serveur ou service d'authentification
        commit('setUser', user);
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw error; // Renvoyez l'erreur pour la gérer dans votre composant
      }
    },
    signOut({ commit }) {
      commit('signOut');
    },
  },
  
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    userName(state) {
      return state.user ? state.user.name : '';
    },
  },
});

export default store;
