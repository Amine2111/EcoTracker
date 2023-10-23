
import InscriptionPage from './components/InscriptionPage.vue';
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <AboutUs></AboutUs>
  <CalculPage></CalculPage>
  <InscriptionPage></InscriptionPage>
</template>

<script>
import CalculPage from './components/CalculPage.vue'
import InscriptionPage from './components/InscriptionPage.vue'
import AboutUs from './components/AboutUs.vue'


export default {
  name: 'App',
  components: {
    InscriptionPage,
    AboutUs,
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
