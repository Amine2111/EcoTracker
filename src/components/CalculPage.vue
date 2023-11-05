<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>{{ pageContent }}</p>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="CO2Data">
      <h2>Résultats de calcul d'empreinte carbone</h2>
      <p>Émissions totales : {{ CO2Data.co2e }} {{ CO2Data.co2e_unit }}</p>
      <h3>Émissions par trajet :</h3>
      <ul>
        <li v-for="(leg, index) in CO2Data.legs" :key="'co2-leg-' + index">
        <p>Leg {{ index + 1 }} : {{ leg.co2e }} {{ leg.co2e_unit }}</p>
        </li>
        <li v-for="(wttLeg, index) in CO2Data.wtt_legs" :key="index">
        <p>WTT Leg {{ index + 1 }} - CO2e: {{ wttLeg.co2e }} {{ wttLeg.co2e_unit }}</p>
        </li>
      </ul>
    </div>

    <form @submit.prevent="calculateCO2">
      <div v-for="(leg, index) in flightLegs" :key="'leg-' + index">
        <label :for="'origin-' + index">Origine :</label>
        <input v-model="leg.origin" :id="'origin-' + index" type="text" required />
        
        <label :for="'destination-' + index">Destination :</label>
        <input v-model="leg.destination" :id="'destination-' + index" type="text" required />
        
        <label :for="'passengers-' + index">Nombre de passagers :</label>
        <input v-model.number="leg.passengers" :id="'passengers-' + index" type="number" required />
        
        <label :for="'flightClass-' + index">Classe de vol :</label>
        <select v-model="leg.flightClass" :id="'flightClass-' + index">
          <option value="first">Première classe</option>
          <option value="economy">Économie</option>
        </select>
        
        <button type="button" @click="removeFlightLeg(index)">Supprimer cette étape</button>
      </div>
      
      <div class="button-container">
      <button type="button" @click="addNewLeg">Ajouter une étape</button>
      <button type="submit">Calculer le CO2</button>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CalculPage',
  data() {
    return {
      pageTitle: "Calculateur d'Empreinte Carbone",
      pageContent: "Utilisez notre simulateur pour estimer votre empreinte carbone lors de vos déplacements et trouvez des solutions pour la réduire !",
      flightLegs: [{
        origin: '',
        destination: '',
        passengers: 1,
        flightClass: 'unknown',
      }],
      CO2Data: null,
      error: null,
    };
  },
  methods: {
    async calculateCO2() {
  this.error = null;
  try {
    const apiKey = 'JS28545H3S4GCGGRN05CXRZGEF20';
    const apiUrl = 'https://beta4.api.climatiq.io/travel/flights'; 
    const requestData = {
      legs: this.flightLegs.map(leg => ({
        from: leg.origin,
        to: leg.destination,
        passengers: Number(leg.passengers),
        class: leg.flightClass,
      })),
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

    await this.$store.dispatch('saveCO2Data', this.CO2Data);
    this.flightLegs.forEach((leg) => {
        this.$store.commit('ADD_TRAVEL_LEG', {
          email: this.$store.state.user.email,
          travelLeg: {
            origin: leg.origin,
            destination: leg.destination,
            co2e: data.co2e,
            co2e_unit: data.co2e_unit, 
          },
        });
      });
  } catch (error) {
    console.error("Une erreur est survenue lors du calcul de l'empreinte carbone:", error);
    this.error = "Une erreur est survenue. Veuillez réessayer.";
  }
},

    removeFlightLeg(index) {
      this.flightLegs.splice(index, 1);
    },
    addNewLeg() {
      this.flightLegs.push({
        origin: '',
        destination: '',
        passengers: 1,
        flightClass: 'unknown',
      });
    },
  },
};
</script>


<style scoped>
.error {
  color: red;
  margin: 10px 0;
}
.new-leg-form {
  gap: 10px; 
}
.button-container{
  gap: 10px; 
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: left;
}

.calculate-button{
  margin-top: 10px;
}
.button{
  gap: 10px; 
  margin-top: 10px;
  margin-bottom: 10px;

}
</style>