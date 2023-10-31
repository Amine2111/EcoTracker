<template>
  <div v-if="isAuthenticated">
    <button @click="logout">Déconnexion</button>
    <h2>Le nom est : {{ userName }}</h2>
  </div>
  <div v-else>
    <h1>Connexion</h1>
    <p>Connectez-vous à votre compte.</p>

    <GoogleLogin :callback="onGoogleSignIn"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { decodeCredential } from 'vue3-google-login';

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
    };
  },
  methods: {
    async onGoogleSignIn(googleUser) {
      try {
        const credential = decodeCredential(googleUser.credential);
        await this.$store.dispatch('signIn', { name: credential.name, email: credential.email });
      } catch (error) {
        console.error('Erreur lors de la connexion avec Google', error);
      }
    },
    async logout() {
      await this.$store.dispatch('signOut');
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userName']),
  },
};
</script>

<style scoped>
div {
  max-width: 400px;
  margin: 0 auto;
}

button {
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  padding: 15px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>
