
<template>
    <div>
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageContent }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pageTitle: "Calcul",
        pageContent: "Here, you can use our simulator to estimate your carbon footprint and find solutions to lower it!",
      };
    },
  };
  </script>
  