import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
    CO2EmissionsData: {}, // stocker les données des émissions CO2 par utilisateur
    userTravelHistory: {},
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    userName: (state) => (state.user ? state.user.name : ''),
    userCO2Data: (state) => (state.user ? state.CO2EmissionsData[state.user.email] : null),
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_CO2_DATA(state, { email, co2Data }) {
      if (state.isAuthenticated && email) {
        // Utilise l'email comme clé unique pour les données de l'utilisateur
        state.CO2EmissionsData[email] = co2Data;
      }
    },
    ADD_TRAVEL_LEG(state, { email, travelLeg }) {
      if (state.isAuthenticated && email) {
        if (!state.userTravelHistory[email]) {
          state.userTravelHistory[email] = [];
        }
        state.userTravelHistory[email].push(travelLeg);
      }
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
      // Nettoyer les erreurs potentielles
      commit('SET_CO2_DATA', { email: null, co2Data: null });
    },
    saveCO2Data({ commit, state }, co2Data) {
      if (state.isAuthenticated && state.user) {
        commit('SET_CO2_DATA', { email: state.user.email, co2Data });
      } else {
        throw new Error("L'utilisateur doit être connecté pour enregistrer les données d'émissions.");
      }
    },
  },
});