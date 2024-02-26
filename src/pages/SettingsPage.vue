<template>
    <main-layout>
      <p>Settings page.</p>
      <input class="settings-btn" type="button" value="Логаут" v-on:click="handleLogout"/>
    </main-layout>
</template>
  
<script>
  import MainLayout from '../layouts/MainLayout.vue'
  import { useSessionStore } from '@/stores/SessionStore';

  const sessionStore = useSessionStore();
  
  export default {
    components: {
      MainLayout
    },
    methods: {
      async handleLogout(e) {
        const logoutRes = await fetch(`${'http://localhost:3000'}/api/logout`, {
            method: 'GET'
        })
        const logoutData = await logoutRes.json();
        console.log('LOGOUT->', e, logoutData);
        sessionStore.setUserData(null);
      }
    }
  }
</script>

<style>
  .settings-btn {
      background: inherit;
      font-family: "Roboto Condensed", sans-serif;
      font-size: 14pt;
      padding: 1em 2em;
  }
  .settings-btn:hover {
      border: 2px solid red;
      color: red;
      cursor: pointer;
  }
</style>