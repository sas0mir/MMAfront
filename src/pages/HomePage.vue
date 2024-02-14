<template>
    <main-layout>
      <div class="homepage-container">
        <p>Welcome home!</p>
        <p>{{ userName }}</p>
        <p>{{ userEmail }}</p>
      </div>
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
    computed: {
      userName() {
        return sessionStore.getUserData.user.name
      },
      userEmail() {
        return sessionStore.getUserData.user.email
      }
    }
  }
</script>
<style>
  .homepage-container {
    position: relative;
    display: block;
    margin: 10px;
  }
</style>