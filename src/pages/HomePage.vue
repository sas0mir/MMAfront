<template>
  <main-layout>
    <div class="homepage-container" :v-if="userInfo.loaded">
      <div class="homepage-box-info">
        <h3>{{ userInfo.user ? userInfo.user.name : '' }}</h3>
        <!-- <text-field-view title="Организация" :v-if="userInfo.user" :value="userInfo.organization.name" /> -->
        <text-field-view title="Почта" :value="userEmail" />
        <text-field-view title="Подписка" :value="userSubscription" />
      </div>
      <div class="homepage-box-info">
        <h3>Ваши темы:</h3>
        <!-- <p
          class="homepage-theme-name"
          v-for="theme in userInfo.user.themes"
          :key="theme.id"
        >
            {{ theme.name }}
        </p> -->
        <!-- <button
          class="homepage-button"
          :disabled="userInfo.subscription === 1"
          v-on:click="addTheme">
            Добавить тему
        </button> -->
      </div>
    </div>
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
    methods: {
      addTheme() {
        console.log('ADD-THEME');
      },
      async fetchData() {
        console.log('HOME-FETCH-0->', sessionStore.getUserData.id, sessionStore.getUserData);
        const userApiData = await fetch(`${'http://localhost:3000'}/api/userdata?user_id=${sessionStore.getUserData.id}`, {
        method: 'GET'
        });
        let userApiInfo = await userApiData.json();
        userApiInfo.loaded = true
        console.log('HOME-FETCH-1->', userApiInfo);
        return userApiInfo
      }
    },
    async mounted() {
      this.userInfo = await this.fetchData();
    },
    computed: {
      userName() {
        return sessionStore.getUserData.name
      },
      userEmail() {
        return sessionStore.getUserData.email
      },
      userSubscription() {
        switch (this.userInfo.subscription.id) {
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