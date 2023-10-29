
<template>
    <div>
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageContent }}</p>
      <GoogleLogin :callback="callback"/>
    </div>
    <div class="routes">
      <nav>
      <router-link to="/about">About Us</router-link>
      <router-link to="/calcul">Calculator</router-link>
      </nav>
      </div>
  </template>
  
  <script>
  import { RouterLink } from 'vue-router'

  export default {
    name:'InscriptionPage',
    data() {
      return {
        pageTitle: "Inscription",
        pageContent: "Sign in EcoTracker to have access to accurate carbon footprint calculating tools.",
      };
    },
  };
  </script>
  <script setup>
  const callback = (response) => {
    console.log("Gérer la réponse", response);
  }
  </script>
  