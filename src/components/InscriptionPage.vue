<template>
  <div>
    <h1>{{ isSignUp ? 'Inscription' : 'Connexion' }}</h1>
    <p>{{ isSignUp ? 'Créez un nouveau compte.' : 'Connectez-vous à votre compte.' }}</p>
    
    <form @submit.prevent="submitForm" v-if="isSignUp">
      <!-- Champs pour l'inscription -->
      <input type="text" placeholder="Nom" required>
      <input type="text" placeholder="Prénom" required>
      <input type="email" placeholder="Email" required>
      <input type="password" placeholder="Mot de passe" required>
      <button type="submit">S'inscrire</button>
    </form>

    <form @submit.prevent="submitForm" v-else>
      <!-- Champs pour la connexion -->
      <input type="email" placeholder="Email" required>
      <input type="password" placeholder="Mot de passe" required>
      <button type="submit">Se connecter</button>
    </form>

    <p v-if="isSignUp">
      Vous avez déjà un compte ? <a @click="toggleForm">Cliquez ici</a>
    </p>
    <p v-else>
      Vous n'avez pas de compte ? <a @click="toggleForm">Inscrivez-vous ici</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSignUp: true,
    };
  },
  methods: {
    toggleForm() {
      this.isSignUp = !this.isSignUp;
    },
    submitForm() {
      if (this.isSignUp) {
        console.log('Soumission du formulaire d\'inscription');
      } else {
        console.log('Soumission du formulaire de connexion');
      }
    },
  },
};
</script>

<style scoped>
div {
  max-width: 400px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, button {
  padding: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

button {
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 20px;
  text-align: center;
}

a {
  color: #42b983;
  cursor: pointer;
}
</style>