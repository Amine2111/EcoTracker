
<template>
    <div>
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageContent }}</p>
      <div v-if="CO2Data">
      <form @submit.prevent="calculateCO2">
      <label for="travelMode">Travel Mode:</label>
      <select v-model="travelMode" id="travelMode">
        <option value="car">Car</option>
        <option value="air">Air</option>
        <option value="rail">Rail</option>
      </select>
      
      <label for="origin">Origin:</label>
      <input v-model="origin" id="origin" type="text" />
      
      <label for="destination">Destination:</label>
      <input v-model="destination" id="destination" type="text" />
      
      <!-- ajouter d'autres champs -->

      <button type="submit">Calculate CO2</button>
      </form>
       <!-- Affichage des résultats après la requête -->
       <div>
        <h2>Your CO2 Emissions for this travel</h2>
        <p>You produced: {{ CO2Data.co2e }} {{ CO2Data.co2e_unit }}</p>
        <p>Distance (km): {{ CO2Data.distance_km }}</p>
        <p>Origin: {{ CO2Data.origin.name }}</p>
        <p>Destination: {{ CO2Data.destination.name }}</p>
        
        <h3>Direct Emissions of your Travel </h3>
        <p>CO2e: {{ CO2Data.direct_emissions.co2e }} {{ CO2Data.direct_emissions.co2e_unit }}</p>
        
        <h3>Indirect Emissions of your Travel</h3>
        <p>CO2e: {{ CO2Data.indirect_emissions.co2e }} {{ CO2Data.indirect_emissions.co2e_unit }}</p>
        </div>
      </div>
      <div class="routes">
      <nav>
      <router-link to="/about">About Us</router-link>
      <router-link to="/inscription">Sign Up</router-link>
      </nav>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: 'CalculPage',
  data() {
    return {
      pageTitle: 'Calcul',
      pageContent: 'Here, you can use our simulator to estimate your carbon footprint while traveling and find solutions to lower it!',
      travelMode: 'car',
      origin: '',
      destination: '',
      CO2Data: null,
    };
  },
  methods: {
    fetchCO2Data() {
      const apiKey = 'MQEV5AP5QN4K0WH7D04YT3SWVEFD';
      const apiUrl = 'https://beta4.api.climatiq.io/travel/distance';
      
      const requestData = {
        travel_mode: this.travelMode,
        origin: {
          query: this.origin,
        },
        destination: {
          query: this.destination,
        },
      };

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
      .then(response => response.json())
      .then(data => {
        this.CO2Data = data;
        console.log(data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite :', error);
      });
    },
  },
};
</script>