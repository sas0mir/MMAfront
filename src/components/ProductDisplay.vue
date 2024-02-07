<template>
    <div>
      <div class="product-image">
        <img :src="image" :alt="product">
      </div>
      <h1>{{ title }}</h1>
      <p v-if="inventory > 10">In stock (if expression)</p>
      <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
      <p v-else>Out of stock</p>
      <p>Shipping: {{ shipping }}</p>
      <ul>
        <li v-for="detail in details" :key="detail">{{ detail }}</li>
      </ul>
      <div
        class="color-circle"
        v-for="(variant, index) in variants"
        :key="variant.id"
        @mouseover="updateVariant(index)"
        :style="{backgroundColor: variant.color}">
          {{ variant.color }}
      </div>
      <button
        class="button"
        :class="{disabledButton: !inStock}"
        :disabled="!inStock"
        v-on:click="addToCart">
          Add to cart
      </button>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </template>
  
  <script>
  export default {
    name: 'ProductDisplay',
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            inventory: 100,
            details: ['30 whool', '40 cotton', '20 fur'],
            variants: [
                {id: 2234, color: 'green', image: '../assets/cage.jpg', quantity: 50},
                {id: 2235, color: 'blue', image: '../assets/logo.png', quantity: 0}
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
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
.button {
    margin: 30px;
    background-color: #39495c;
    border-radius: 5px;
    font-size: 18px;
    width: 160px;
    height: 60px;
    color: white;
    padding: 20px;
    box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
        inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
        inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
    text-align: center;
    cursor: pointer;
}
.disabledButton {
  background-color: #d8d8d8;
  cursor: not-allowed;
}
.color-circle {
    width: 50px;
    height: 50px;
    margin-top: 8px;
    border: 2px solid #d8d8d8;
    border-radius: 50%;
}
</style>
  