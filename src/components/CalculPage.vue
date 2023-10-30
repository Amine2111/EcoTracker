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
        <li v-for="(leg, index) in CO2Data.legs" :key="index">
          <p>Leg {{ index + 1 }} : {{ leg.co2e }} {{ leg.co2e_unit }}</p>
        </li>
      </ul>
    </div>
    <form @submit.prevent="calculateCO2">
      
      <label for="origin">Origine :</label>
      <input v-model="origin" id="origin" type="text" required />
      
      <label for="destination">Destination :</label>
      <input v-model="destination" id="destination" type="text" required />
      
      <label for="passengers">Nombre de passagers :</label>
      <input v-model="passengers" id="passengers" type="number" required />

      <label for="flightClass">Classe de vol :</label>
      <select v-model="flightClass" id="flightClass">
        <option value="first">Première classe</option>
        <option value="economy">Économie</option>

      <!-- Ajouter d'autres champs si nécessaire -->
      </select>

      <button type="button" @click="removeFlightLeg()">Supprimer cette étape</button>
      <button type="button" @click="showNewLegForm = !showNewLegForm">Ajouter une étape</button>
      <button type="button" @click="validateLeg">Valider</button>

      <!--affichage de base-->

      <div v-for="(flightLeg, index) in flightLegs" :key="index">
        <label for="legOrigin">Origine :</label>
        <input v-model="flightLeg.from" id="legOrigin" type="text" required />
        <label for="legDestination">Destination :</label>
        <input v-model="flightLeg.to" id="legDestination" type="text" required />
        <label for="legPassengers">Nombre de passagers :</label>
        <input v-model="flightLeg.passengers" id="legPassengers" type="number" required />
        <label for="legClass">Classe de vol :</label>
        <select v-model="flightLeg.class" id="legClass">
          <option value="first">Première classe</option>
          <option value="economy">Économie</option>
        </select>
        <button type="button" @click="removeFlightLeg()">Supprimer cette étape</button>
      </div>

      <!-- Afficher le formulaire d'ajout de vol uniquement si le bouton ajouterLeg est cliqué -->
      <div v-if="showNewLegForm">
        <label for="newOrigin">Origine :</label>
        <input v-model="newLeg.from" id="newOrigin" type="text" required />
        <label for="newDestination">Destination :</label>
        <input v-model="newLeg.to" id="newDestination" type="text" required />
        <label for="newPassengers">Nombre de passagers :</label>
        <input v-model="newLeg.passengers" id="newPassengers" type="number" required />
        <label for="newFlightClass">Classe de vol :</label>
        <select v-model="newLeg.class" id="newFlightClass">
          <option value="first">Première classe</option>
          <option value="economy">Économie</option>
        </select>
        <button type="button" @click="removeFlightLeg()">Supprimer cette étape</button>
        <button type="button" @click="validateLeg">Valider</button>
      

      </div>


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

      showNewLegForm: false,

      newLeg: {
        from: '',
        to: '',
        passengers: 1,
        class: 'unknown',
      },

      flightLegs: [],
      CO2Data: null,
      error: null,
    };
  },
  methods: {
    async calculateCO2() {
      this.error = null; // Réinitialiser l'erreur à chaque nouvelle tentative

      try {
        const apiKey = 'JS28545H3S4GCGGRN05CXRZGEF20';
        const apiUrl = 'https://beta4.api.climatiq.io/travel/flights'; 

        const requestData = {
          legs: this.flightLegs,
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
    },

    validateLeg() {
      this.flightLegs.push({ ...this.newLeg }); // Ajoute la ligne actuelle à flightLegs
      console.log('Validé');
      console.log(this.flightLegs);
    },
    removeFlightLeg(index) {
      this.flightLegs.splice(index, 1);
    }
}
}
</script>

<style scoped>
.error {
  color: red;
  margin: 10px 0;
}
</style>