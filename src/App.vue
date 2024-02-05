<template>
  <div class="app">
    <div class="nav-bar"></div>
    <ProductDisplay :premium="premium"/>
    <ProductDisplay :premium="premium"/>
    <ProductDisplay :premium="premium"/>
  </div>
</template>

<script>

import ProductDisplay from './components/ProductDisplay.vue'

export default {
  name: 'App',
  components: {
    ProductDisplay,
  },
  data() {
    return {
      cart: 0,
      premium: true
    }
  },
  methods: {
    
  },
  computed: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
    background-color: #f2f2f2;
    margin: 0px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #282828;
}
</style>
