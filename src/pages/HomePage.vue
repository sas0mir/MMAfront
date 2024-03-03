<template>
  <main-layout>
    <div class="homepage-container" v-if="userInfo.loaded">
      <div class="homepage-box-info">
        <h3 v-if="userInfo.user">{{ userInfo.user.name }}</h3>
        <text-field-view title="Организация" v-if="userInfo.organization" :value="userInfo.organization.name" />
        <text-field-view title="Почта" :value="userEmail" />
        <text-field-view title="Подписка" v-if="userInfo.subscription" :value="userSubscription" />
      </div>
      <div class="homepage-box-info">
        <h3>Ваши темы:</h3>
        <div
          class="homepage-theme-name"
          v-for="theme in userInfo.user.themes"
          :key="theme"
        >
            <span>{{ theme }}</span>
            <v-link href="/dashboard" customClass="homepage-goto-btn" @clicked="selectTheme(theme)">&rarr;</v-link>
      </div>
        <button
          class="homepage-button"
          :disabled="userInfo.subscription === 1"
          v-on:click="addTheme">
            Добавить тему
        </button>
      </div>
    </div>
    <loader-component v-if="!userInfo.loaded" />
    <theme-modal title="Добавление темы" v-if="showModal" @close-modal="closeModal"/>
  </main-layout>
</template>
  
<script>
  import MainLayout from '../layouts/MainLayout.vue'
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import TextFieldView from '@/components/TextFieldView.vue';
  import ThemeModal from '@/components/ThemeModal.vue';
  import { useSessionStore } from '@/stores/SessionStore';
  import { useThemesStore } from '@/stores/ThemesStore';
  import VLink from '@/components/VLink.vue';

  const sessionStore = useSessionStore();
  const themesStore = useThemesStore();
  
  export default {
    components: {
      MainLayout,
      LoaderComponent,
      TextFieldView,
      ThemeModal,
      VLink
    },
    data() {
        return {
          userInfo: { loaded: false },
          showModal: false
        }
    },
    watch: {
      userInfo(newUserInfo, oldUserInfo) {
        console.log('NEW-UserInfo->', newUserInfo, '\nOLD-UserInfo->', oldUserInfo);
      }
    },
    methods: {
      addTheme() {
        this.showModal = true
      },
      closeModal() {
        this.showModal = false
      },
      selectTheme(theme) {
        themesStore.setSelected(theme)
      },
      async fetchData() {
        const userApiData = await fetch(`${'http://localhost:3000'}/api/userdata?user_id=${sessionStore.getUserData.id}`, {
        method: 'GET'
        });
        let userApiInfo = await userApiData.json();
        return { ...userApiInfo.data, loaded: true }
      }
    },
    async beforeMount() {
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
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    margin: 10px;
  }
  .homepage-box-info {
    position: relative;
    display: block;
    min-width: 30%;
    max-width: 50%;
    padding: 1em;
    text-align: center;
  }
  .homepage-button {
    margin: 1em;
    border: 2px solid black;
    background-color: inherit;
    font-size: 14pt;
    font-family: "Roboto Condensed", sans-serif;
    width: 150px;
    height: 50px;
    color: grey;
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
  .homepage-button:hover {
    border-color: red;
    color: black;
  }
  .homepage-theme-name {
    margin: auto;
    width: 50%;
    display: flex;
    justify-content: space-between;
  }
  .homepage-goto-btn {
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 50%;
    margin-left: 5%;
    background-color: inherit;
    font-size: 16pt;
    color: black;
    cursor: pointer;
  }
  .homepage-goto-btn:hover {
    font-size: 20pt;
    color: red;
  }
</style>