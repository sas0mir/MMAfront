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
          v-for="theme in userInfo.themes"
          :key="theme"
        >
            <span>{{ `Источник: ${theme.sources.name}, Наименование: ${theme.name}` }}</span>
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
    <div class="homepage-container">
      <div class="homepage-box-info">
        <h3>Ваши подписки:</h3>
        <div
          class="homepage-theme-name"
          v-for="theme in userInfo.themes"
          :key="theme"
        >
            <span>{{ `Канал: ${theme.sources.name} (@${theme.sources.account_name}), Платформа: ${theme.platform.name}` }}</span>
        </div>
        <button
          class="homepage-button"
          :disabled="userInfo.subscription === 1"
          v-on:click="addSource">
            Добавить подписку
        </button>
      </div>
      <div class="homepage-box-info">
        <h3>Новости</h3>
        <p>Тема "Доллар" поднялась в рейтинге на 5 пунктов (пример)</p>
        <p>В выдаче scrapper есть количество просмотров views у сообщения + чтобы провести поиск по каналу надо к аккауннейму добавить ?q="искомое"</p>
      </div>
    </div>
    <div class="homepage-container">
      <div class="homepage-box-info">
        <h3>Последние сообщения с подписок:</h3>
        <div></div>
        <loader-component v-if="!latestMessages.loaded" />
      </div>
      <div class="homepage-box-info"></div>
    </div>
    <loader-component v-if="!userInfo.loaded" />
    <theme-modal title="Добавление темы" v-if="showThemeModal" @close-modal="closeModal"/>
    <source-modal title="Добавление источника" :platforms="userInfo.platforms" v-if="showSourceModal" @close-modal="closeModal"/>
    <notification-component v-for="notify in activeNotify" :key="notify.notifyTitle" :show="showNotification" :title="notify.notifyTitle" :message="notify.notifyMessage"/>
  </main-layout>
</template>
  
<script>
  import MainLayout from '../layouts/MainLayout.vue'
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import TextFieldView from '@/components/TextFieldView.vue';
  import ThemeModal from '@/components/ThemeModal.vue';
  import { useSessionStore } from '@/stores/SessionStore';
  import { useThemesStore } from '@/stores/ThemesStore';
  import { useNotificationsStore } from '@/stores/NotificationStore';
  import VLink from '@/components/VLink.vue';
  import SourceModal from '@/components/SourceModal.vue';
  import NotificationComponent from '@/components/NotificationComponent.vue';
  //import { reactive } from 'vue';

  const sessionStore = useSessionStore();
  const themesStore = useThemesStore();
  const notificationsStore = useNotificationsStore();

  //const activeNotify = reactive(notificationsStore.getActiveNotifications);

  // watchEffect(() => {
  //   const notifications = [...activeNotify];
  //   console.log('WE->', notifications);
  //   if(notifications.length) {
  //     showNotification = true
  //   }
  // })
  
  export default {
    components: {
      MainLayout,
      LoaderComponent,
      TextFieldView,
      ThemeModal,
      SourceModal,
      VLink,
      NotificationComponent
    },
    data() {
        return {
          userInfo: { loaded: false },
          latestMessages: { loaded: false},
          showThemeModal: false,
          showSourceModal: false,
          showNotification: false,
        }
    },
    watchEffect() {
      const notifications = [...this.activeNotify];
      console.log('V-O->', notifications);
      if(notifications.length) {
        this.showNotification = true
      }
    },
    watch: {
      showNotification(newValue, oldValue) {
        if(newValue && newValue !== oldValue) {
          setTimeout(() => this.showNotification = false, 2000)
        }
      },
      activeNotify(newValue, oldValue) {
        console.log('NOTIFICATIONS->', newValue, oldValue);
        if(newValue && newValue !== oldValue) {
          this.showNotification = true
        }
      }
    },
    methods: {
      addTheme() {
        this.showThemeModal = true
      },
      addSource() {
        this.showSourceModal = true
      },
      closeModal() {
        this.showThemeModal = false
        this.showSourceModal = false
      },
      selectTheme(theme) {
        themesStore.setSelected(theme)
      },
      async fetchData() {
        const userApiData = await fetch(`${'http://localhost:3000'}/api/userdata?user_id=${sessionStore.getUserData.id}`, {
        method: 'GET'
        });
        let userApiInfo = await userApiData.json();
        console.log('USER-API-DATA->', userApiInfo);
        notificationsStore.setNotifications([{notifyTitle: userApiInfo.success, notifyMessage: userApiInfo.message}]);
        return { ...userApiInfo.data, loaded: true }
      },
      async loadRss() {
        const rssApiData = await fetch(`${'http://localhost:3000'}/api/load_posts?user_id=${sessionStore.getUserData.id}`, {
          method: 'GET'
        })
        let rssApiInfo = await rssApiData.json();
        console.log('RSS-API-DATA->', rssApiInfo);
        notificationsStore.setNotifications([{notifyTitle: rssApiInfo.success, notifyMessage: rssApiInfo.message}]);
        return { ...rssApiInfo.data, loaded: true }
      }
    },
    async beforeMount() {
      this.userInfo = await this.fetchData();
      this.latestMessages = await this.loadRss();
    },
    computed: {
      userName() {
        return sessionStore.getUserData.name
      },
      userEmail() {
        return sessionStore.getUserData.email
      },
      activeNotify() {
        console.log('GET-NOT-STORE->', notificationsStore.getActiveNotifications);
        return notificationsStore.getActiveNotifications
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
    min-width: 45%;
    max-width: 50%;
    padding: 1em;
    margin: 1em;
    text-align: center;
    /* background-color: rgb(240, 237, 237); */
  }
  .homepage-box-info h3 {
    padding: 1em 0;
    background-color: rgb(240, 237, 237);
  }
  .homepage-button {
    margin: 1em;
    border: 2px solid black;
    background-color: inherit;
    font-size: 14pt;
    font-family: "Roboto Condensed", sans-serif;
    min-width: 150px;
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