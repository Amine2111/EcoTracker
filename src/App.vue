<template>
  <div id="app">
    <nav class="navbar">
      <img class="logo" alt="Vue logo" src="./assets/logo.png">
      <router-view></router-view>
    </nav>
    <header class="header">
      <h1>Bienvenue sur Notre Site</h1>
      <p>Découvrez nos services et produits incroyables</p>
    </header>
    <section class="content">
      <AboutUsPage class="section">À Propos de Nous</AboutUsPage>
      <CalculPage class="section">Calculez Ici</CalculPage>
      <InscriptionPage class="section">Inscrivez-vous</InscriptionPage>
    </section>
    <footer class="footer">
      <p>© 2023 EcoTracker</p>
    </footer>
  </div>
</template>

<script>
import CalculPage from './components/CalculPage.vue'
import InscriptionPage from './components/InscriptionPage.vue'
import AboutUsPage from './components/AboutUsPage.vue'

export default {
  name: 'App',
  components: {
    InscriptionPage,
    AboutUsPage,
    CalculPage,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
}

.logo {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.header {
  text-align: center;
  padding: 50px 20px;
  background-color: #eee;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.section {
  margin: 10px 0;
}

.footer {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-align: center;
}
</style>
