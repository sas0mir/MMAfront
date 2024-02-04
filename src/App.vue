<template>
  <div>
    <div class="product-image">
      <img v-bind:src="image" :alt="product">
    </div>
    <h1>{{ product }}</h1>
    <p v-show="inStock">In stock (visibility)</p>
    <p v-if="inventory > 10">In stock (if expression)</p>
    <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
    <p v-else>Out of stock</p>
  </div>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  },
  data() {
    return {
      product: 'Socks',
      image: './assets/logo.png',
      inStock: true,
      inventory: 100
    }
  },
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
</style>
