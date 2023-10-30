<template>
  <div id="app">
    <nav class="navbar">
      <img class="logo" alt="Vue logo" src="./assets/logo.png">
      <router-link to="/about" class="nav-link">À Propos de Nous</router-link>
      <router-link :to="{ name: 'Calcul' }">Calculateur</router-link>
      <router-link to="/inscription" class="nav-link">Inscription</router-link>
      <router-link v-if="isAuthenticated" :to="{ name: 'Calcul' }" class="nav-link">{{ userName }}</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated', 'userName']),
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
      this.$router.push('/connexion'); 
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: #2c3e50;
}

.logo {
  height: 40px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0 10px;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
