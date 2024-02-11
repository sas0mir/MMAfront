<template>
    <ul>
      <li><v-link href="/">Домой</v-link></li>
      <li><v-link href="/dashboard">Дэшборд</v-link></li>
      <li><v-link href="/cabinet">Личный кабинет</v-link></li>
      <li><v-link href="/settings">Настройки</v-link></li>
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