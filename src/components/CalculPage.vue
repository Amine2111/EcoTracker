<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>{{ pageContent }}</p>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="CO2Data">
      <h2>Votre émission de CO2 pour ce voyage</h2>
      <p>Vous avez produit : {{ CO2Data.co2e }} {{ CO2Data.co2e_unit }}</p>
      <p>Distance (km): {{ CO2Data.distance_km }}</p>
      <p>Origine: {{ CO2Data.origin.name }}</p>
      <p>Destination: {{ CO2Data.destination.name }}</p>
      
      <h3>Émissions directes de votre voyage</h3>
      <p>CO2e: {{ CO2Data.direct_emissions.co2e }} {{ CO2Data.direct_emissions.co2e_unit }}</p>
      
      <h3>Émissions indirectes de votre voyage</h3>
      <p>CO2e: {{ CO2Data.indirect_emissions.co2e }} {{ CO2Data.indirect_emissions.co2e_unit }}</p>
    </div>
    <form @submit.prevent="calculateCO2">
      <label for="travelMode">Mode de transport :</label>
      <select v-model="travelMode" id="travelMode">
        <option value="car">Voiture</option>
        <option value="air">Avion</option>
        <option value="rail">Train</option>
      </select>
      
      <label for="origin">Origine :</label>
      <input v-model="origin" id="origin" type="text" required />
      
      <label for="destination">Destination :</label>
      <input v-model="destination" id="destination" type="text" required />
      
      <!-- Ajoutez d'autres champs si nécessaire -->
      
      <button type="submit">Calculer le CO2</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CalculPage',
  data() {
    return {
      pageTitle: 'Calculateur d\'Empreinte Carbone',
      pageContent: 'Utilisez notre simulateur pour estimer votre empreinte carbone lors de vos déplacements et trouvez des solutions pour la réduire !',
      travelMode: 'car', 
      origin: '',
      destination: '',
      CO2Data: null,
      error: null,
    };
  },
  methods: {
    async calculateCO2() {
      this.error = null; // Réinitialiser l'erreur à chaque nouvelle tentative
      try {
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

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        const data = await response.json();
        this.CO2Data = data;

      } catch (error) {
        console.error('Une erreur est survenue lors du calcul de l\'empreinte carbone:', error);
        this.error = 'Une erreur est survenue. Veuillez réessayer.';
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
  margin: 10px 0;
}
</style>
