<template>
    <div class="home-page">
      <header class="header">
        <h1>Bienvenue sur Notre Site</h1>
        <p>Découvrez nos services et produits incroyables</p>
        <div class="buttons">
          <router-link to="/about" class="btn">À Propos de Nous</router-link>
          <router-link to="/calcul" class="btn">Calculateur</router-link>
          <router-link to="/inscription" class="btn">Inscription</router-link>
        </div>
      </header>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  }
  </script>
  
  <style> 
  .home-page .buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .home-page .btn {
    display: inline-block;
    background-color: #3498db;
    color: #fff;
    padding: 10px 20px;
    margin: 0 10px;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .home-page .btn:hover {
    background-color: #2c3e50;
  }
  </style>
  