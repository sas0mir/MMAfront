<template>
    <div class="text-input-container">
      <label :for="tinp" class="text-input-label">{{ title }}</label>
      <input type="text" id="tinp" v-on:change="handleChange" v-model="value" class="text-input-input"/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextInput',
    props: {
      prev_value: {
        type: String,
        required: false
      },
      title: {
        type: String,
        required: true
      }
    },
    data() {
        return {
            value: ''
        }
    },
    methods: {
        handleChange(e) {
            this.$emit('handle-change', e.target.value)
        }
    },
    computed: {
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
</style>
  