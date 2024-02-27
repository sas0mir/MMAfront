<template>
    <main-layout>
      <div class="homepage-container">
        <div class="homepage-box-info">
          <h3>Пользователь</h3>
          <text-field-view title="Имя" :value="userName" />
          <text-field-view title="Почта" :value="userEmail" />
          <text-field-view title="Подписка" :value="userSubscription" />
        </div>
      </div>
      <div v-if="userInfo.loaded"></div>
      <loader-component v-if="!userInfo.loaded" />
    </main-layout>
</template>
  
<script>
  import MainLayout from '../layouts/MainLayout.vue'
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import TextFieldView from '@/components/TextFieldView.vue';
  import { useSessionStore } from '@/stores/SessionStore';

  const sessionStore = useSessionStore();
  
  export default {
    components: {
      MainLayout,
      LoaderComponent,
      TextFieldView
    },
    data() {
        return {
          userInfo: { loaded: false }
        }
    },
    async mounted() {
      console.log('HOME-MOUNT');
      const userApiData = await fetch(`${'http://localhost:3000'}/api/userdata?user_id=${sessionStore.getUserData.id}`, {
        method: 'GET'
      });
      console.log('HOME-MOUNT-1->', userApiData);
      this.userInfo = await userApiData.json();
      console.log('HOME-USERINFO->', this.userInfo);
      this.userInfo.loaded = true
    },
    computed: {
      userName() {
        return sessionStore.getUserData.name
      },
      userEmail() {
        return sessionStore.getUserData.email
      },
      userSubscription() {
        switch (sessionStore.getUserData.subscription_type) {
          case 1:
            return 'Бесплатная'
          case 2:
            return 'Платная'
          default: return 'Премиум'
        }
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
  .homepage-box-info {
    position: relative;
    display: block;
    min-width: 300px;
    max-width: 30%;
    padding: 1em;
  }
</style>