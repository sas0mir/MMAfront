<template>
    <main-layout>
      <h3 class="dashboard-title">{{ selectedTheme }}</h3>
      <div class="dash-container">
        <vidget-user title="Упоминания"></vidget-user>
        <vidget-user title="Источники"></vidget-user>
        <vidget-user title="Графики"></vidget-user>
        <p v-if="themes.length">{{ themes[0] }}</p>
        <button v-on:click="handleBtnClick">Themes query</button>
      </div>
    </main-layout>
</template>
  
<script>
  import MainLayout from '../layouts/MainLayout.vue'
  //import { useSessionStore } from '@/stores/SessionStore';
  import { useThemesStore } from '@/stores/ThemesStore';
  import VidgetUser from '@/components/VidgetUser.vue';

  //const sessionStore = useSessionStore()
  const themesStore = useThemesStore()
  
  export default {
    components: {
      MainLayout,
        VidgetUser
    },
    props: {

    },
    data() {
      return {
        themes: []
      }
    },
    async mounted() {
      console.log('THEMES-STORE->', themesStore.getSelected, themesStore.$state.selected);
      // const ddResp = await fetch('http://localhost:3000/api/ddata', {
      //   method: 'POST',
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //       name: 'test theme'
      //   })
      // })
      // const dData = await ddResp.json();
      // console.log('LOAD-DDATA->', dData);
    },
    computed: {
      selectedTheme() {
        return `Выбранная тема: ${themesStore.$state.selected}`
      },
    },
    methods: {
      async handleBtnClick() {
        const ddResp = await fetch(`${process.env.VUE_APP_BACK_URL}/api/ddata`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              name: 'test theme'
          })
        })
        const ddData = await ddResp.json()
        console.log('DDATA->', ddData)
        // if(ddData) {
        //   this.themes.push(ddData)
        // }
      }
    }
  }
</script>
<style>
  .dashboard-title {
    font-size: 18pt;
    margin: 1em;
  }
  .dash-container {
    position: relative;
    display: flex;
    flex-flow: wrap;
    margin: 10px;
    padding: 5px;
  }
</style>