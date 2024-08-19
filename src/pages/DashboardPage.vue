<template>
    <main-layout>
      <h3 class="dashboard-title">{{ selectedTheme }}</h3>
      <div class="dash-container">
        <div class="dash-vidgets">
          <vidget-user title="Упоминания"></vidget-user>
          <vidget-user title="Источники"></vidget-user>
          <vidget-user title="Графики"></vidget-user>
          <p v-if="themes.length">{{ themes[0] }}</p>
          <button v-on:click="handleBtnClick">Themes query</button>
        </div>
        <div class="dash-sidebar"></div>
      </div>
      <notification-component :show="showNotification" :title="activeNotify.notifyTitle" :message="activeNotify.notifyMessage"/>
    </main-layout>
</template>
  
<script>
  import MainLayout from '../layouts/MainLayout.vue'
  import { useThemesStore } from '@/stores/ThemesStore';
  import { useNotificationsStore } from '@/stores/NotificationStore';
  import { useSessionStore } from '@/stores/SessionStore';
  import VidgetUser from '@/components/VidgetUser.vue';
  import NotificationComponent from '@/components/NotificationComponent.vue';

  const sessionStore = useSessionStore()
  const themesStore = useThemesStore();
  const notificationsStore = useNotificationsStore();
  
  export default {
    components: {
      MainLayout,
      VidgetUser,
      NotificationComponent
    },
    props: {

    },
    data() {
      return {
        showNotification: false,
        activeNotify: { loaded: false },
        vidgets: [],
        themes: []
      }
    },
    watch: {
      showNotification(newValue, oldValue) {
        if(newValue && newValue !== oldValue) {
          setTimeout(() => {
            this.showNotification = false
            notificationsStore.clearActive()
          }, 2000)
        }
      },
      activeNotify(newValue, oldValue) {
        if(newValue && newValue !== oldValue) {
          this.showNotification = true
        }
      }
    },
    async beforeMount() {
      notificationsStore.$subscribe((mutations, state) => {
        if (state.active) {
          this.activeNotify = state.active;
          this.showNotification = true;
        }
      });
      const vidgets = await fetch(`${process.env.VUE_APP_BACK_URL}/api/vidgets`, {
        method: 'GET'
      });
      this.vidgets = vidgets;
    },
    async mounted() {
      console.log('THEMES-STORE->', themesStore.getSelected, themesStore.$state.selected);
      console.log('STORES->', sessionStore.$state, notificationsStore.$state);
      notificationsStore.setNotifications([{notifyTitle: 'Mounted', notifyMessage: 'Test notification mount dashboard'}]);
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