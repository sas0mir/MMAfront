<template>
  <main-layout>
    <div class="app">
      <div class="nav-bar"></div>
      <LoginForm v-if="!userData.id" @login-form-submitted="submitLogin"/>
      <main v-if="userData.id">
        <div class="cart">Cart({{ cart?.length }})</div>
        <ProductDisplay :premium="premium" @add-to-cart="updateCart" :cart="cart"/>
        <ProductDisplay :premium="premium" @add-to-cart="updateCart" :cart="cart"/>
        <ProductDisplay :premium="premium" @add-to-cart="updateCart" :cart="cart"/>
      </main>
    </div>
  </main-layout>
</template>

<script>

import ProductDisplay from './components/ProductDisplay.vue';
import LoginForm from './components/LoginForm.vue'
import MainLayout from './layouts/MainLayout.vue'
import {h} from 'vue'
import routes from './routes';

export default {
  name: 'App',
  components: {
    MainLayout,
    ProductDisplay,
    LoginForm
  },
  data() {
    return {
      currentRoute: window.location.pathname,
      cart: [],
      premium: true,
      userData: {}
    }
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    submitLogin(formData) {
      console.log('FORMDATA->', formData);
      //fetch
      //set userData
    }
  },
  computed: {
    ViewComponent() {
      const matchingPage = routes[this.currentRoute] || '404notFound'
      return require(`./pages/${matchingPage}.vue`).default
    }
  },
  render() {
    return h(this.ViewComponent)
  },
  created () {
    window.addEventListener('popstate', () => {
      this.currentRoute = window.location.pathname
    })
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
