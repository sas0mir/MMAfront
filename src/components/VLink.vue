<template>
    <a class="vlink"
      :href="href"
      @click.prevent="go"
    >
      <slot></slot>
    </a>
</template>
  
<script>
  import routes from '../routes'
  
  export default {
    props: {
      href: {
        type:String,
        required: true
      }
    },
  
    methods: {
      go () {
        this.$root.currentRoute = this.href
        window.history.pushState(null, routes[this.href], this.href)
      }
    }
  }
</script>
<style>
  .vlink {
    text-decoration: none;
    font-family: "Roboto Condensed", sans-serif;
    color: black
  }
  .vlink:hover {
    color: red;
  }
</style>