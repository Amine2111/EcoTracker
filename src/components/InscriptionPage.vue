
<template>
    <div>
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageContent }}</p>
    </div>
  </template>
  
  <script>
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
  