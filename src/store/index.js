import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    userName: state => state.user ? state.user.name : '',
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    signIn({ commit }, payload) {

      // Simuler la réponse du serveur
      const serverResponse = {
        success: true,
        user: {
          name: payload.name,
          email: payload.email,
          
        },
      };

      if (serverResponse.success) {
        commit('SET_AUTHENTICATED', true);
        commit('SET_USER', serverResponse.user);
      } else {
        console.error('Échec de la connexion');
      }
    },
    signOut({ commit }) {
      commit('SET_AUTHENTICATED', false);
      commit('SET_USER', null);
    },
  },
});
