<template>
    <main-layout>
      <div class="dash-container">
        <vidget-user title="Пользователь"></vidget-user>
        <vidget-user title="Темы"></vidget-user>
        <vidget-user title="Графики"></vidget-user>
        <p v-if="themes.length">{{ themes[0] }}</p>
        <button v-on:click="handleBtnClick">Themes query</button>
      </div>
    </main-layout>
</template>
  
<script>
  import MainLayout from '../layouts/MainLayout.vue'
  import { useSessionStore } from '@/stores/SessionStore';
  import VidgetUser from '@/components/VidgetUser.vue';

  const sessionStore = useSessionStore()
  
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
      console.log('DASHBOARD-MOUNT->', sessionStore.getUserData.themes);
      const ddResp = await fetch('http://localhost:3000/api/ddata', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: 'test theme'
        })
      })
      const dData = await ddResp.json();
      console.log('LOAD-DDATA->', dData);
    },
    computed: {
      userName() {
        console.log('SESSIONSTOREDD->', sessionStore.getUserData)
        return sessionStore.getUserData
      },
    },
    methods: {
      async handleBtnClick() {
        // const ddResp = await fetch('http://localhost:3000/api/ddata', {
        //   method: 'POST',
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //       name: 'test theme'
        //   })
        // })
        // const ddData = await ddResp.json()
        // console.log('DDATA->', ddData)
        // if(ddData) {
        //   this.themes.push(ddData)
        // }
      }
    }
  }
</script>
<style>
  .dash-container {
    position: relative;
    display: flex;
    flex-flow: wrap;
    margin: 10px;
    padding: 5px;
  }
</style>