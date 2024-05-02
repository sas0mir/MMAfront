<template>
  <div class="main-header-box">
    <ul class="main-header-container">
      <img src="../assets/i_novus_logo-removebg-preview.png" class="main-header-logo"/>
      <li class="main-header-link"><v-link href="/">Стартовая страница</v-link></li>
      <li class="main-header-link"><v-link href="/dashboard">Дэшборд</v-link></li>
      <li class="main-header-link"><v-link href="/settings">Настройки</v-link></li>
    </ul>
    <div class="main-header-container">
      <v-icon name="fa-instagram" hover animation="pulse" speed="fast" v-on:click="handleIconClick('instagram')"/>
      <v-icon name="fa-vk" hover animation="pulse" speed="fast" v-on:click="handleIconClick('vkontakte')"/>
      <v-icon name="fa-yandex" hover animation="pulse" speed="fast" v-on:click="handleIconClick('yandex')"/>
      <v-icon name="fa-telegram-plane" hover animation="pulse" speed="fast" v-on:click="handleIconClick('telegram')"/>
    </div>
  </div>
  
    <slot></slot>
</template>
  
<script>
  import VLink from '../components/VLink.vue'
  import '../assets/styles.css'
  
  export default {
    components: {
      VLink
    },
    methods: {
      handleIconClick(icon_name) {
        alert(`TODO ${icon_name} нажатие`)
      }
    }
  }
</script>

<style>
  .main-header-box {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .main-header-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0;
    padding: 10px;
  }
  .main-header-logo {
    height: 25pt;
  }
  .main-header-link {
    margin: 0 10px;
    text-decoration: none;
    list-style: none;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 20pt;
  }
</style>