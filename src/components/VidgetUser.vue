<template>
    <div class="vidget-container">
        <h3 class="vidget-title">{{ title }}</h3>
        <loader-component :v-if="!vidget_data"/>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem illo totam laboriosam perspiciatis sapiente, eos, harum asperiores optio aliquam omnis reprehenderit blanditiis! Deleniti blanditiis dolores ipsa quos perspiciatis ea! Perferendis?</p>
    </div>
  </template>
  
  <script>

  import LoaderComponent from './LoaderComponent.vue'

  export default {
  components: { LoaderComponent },
    name: 'VidgetUser',
    props: {
      prev_value: {
        type: String,
        required: false
      },
      title: {
        type: String,
        required: true
      },
      vidget_data: {
        type: Object,
        required: false
      }
    },
    data() {
        return {
        }
    },
    methods: {
        async loadThemes(userId) {
          console.log(userId)
          //вот этот метод переделай чтобы срабатывал сам как метод жизненного цикла
          //const res = await themesStore.getThemes(userId);
          //if(res.length) this.themes = res
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
  