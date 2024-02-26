<template>
    <main-layout>
      <div class="homepage-container">
        <h3>Пользователь</h3>
        <text-field-view :title="Имя" :value="userName" />
        <text-field-view :title="Почта" :value="userEmail" />
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
    mounted: async () => {
      //тут проведи поиск данных по импортированным моделям и помести в юзерИнфо + поставь лоадед в тру
    },
    computed: {
      userName() {
        return sessionStore.getUserData.name
      },
      userEmail() {
        return sessionStore.getUserData.email
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