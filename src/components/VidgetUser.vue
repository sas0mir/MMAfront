<template>
    <div class="vidget-container">
        <h3 class="vidget-title">{{ title }}</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem illo totam laboriosam perspiciatis sapiente, eos, harum asperiores optio aliquam omnis reprehenderit blanditiis! Deleniti blanditiis dolores ipsa quos perspiciatis ea! Perferendis?</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VidgetUser',
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
        containerClass() {
            if (this.vertical) {
                return `text-input-container vertical`
            }
            return `text-input-container horizontal`
        }
    }
  }
  </script>
  
  <style>
.vidget-container {
  min-width: 300px;
  max-width: 30%;
  min-height: 300px;
  max-height: 50%;
  padding: 10px;
  margin: 10px;
  display: block;
  border: 1px solid black;
}
</style>
  