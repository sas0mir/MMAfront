<template>
    <ul class="main-header-container">
      <li class="main-header-link"><v-link href="/">Домой</v-link></li>
      <li class="main-header-link"><v-link href="/dashboard">Дэшборд</v-link></li>
      <li class="main-header-link"><v-link href="/cabinet">Личный кабинет</v-link></li>
      <li class="main-header-link"><v-link href="/settings">Настройки</v-link></li>
    </ul>
  
    <slot></slot>
</template>
  
<script>
  import VLink from '../components/VLink.vue'
  import '../assets/styles.css'
  
  export default {
    components: {
      VLink
    }
  }
</script>

<style>
  .main-header-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 10px;
    padding: 10px;
  }
  .main-header-link {
    margin: 0 10px;
    text-decoration: none;
    list-style: none;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 20pt;
  }
</style>