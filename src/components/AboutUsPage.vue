<template>
    <div>
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageContent }}</p>
    </div>
    <div class="routes">
      <nav>
      <router-link to="/calcul">Calculator</router-link>
      <router-link to="/inscription">Sign Up</router-link>
    </nav>
    </div>
  </template>
  
  <script>
  

  export default {
    name:'AboutUsPage',
    data() {
      return {
        pageTitle: "À propos de nous",
        pageContent: "We are a French team of two students who want to make the world a greener place! ^^",
      };
    },
  };
  </script>
  