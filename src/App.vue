

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <router-view></router-view>
  <AboutUsPage>AboutuS </AboutUsPage>
  <CalculPage>Calculate Here</CalculPage>
  <InscriptionPage>Sign Up</InscriptionPage>
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
    CalculPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
