<template>
  <main-layout>
    <div class="homepage-container" v-if="userInfo.loaded">
      <div class="homepage-box-info">
        <h3 v-if="userInfo.user">{{ userInfo.user.name }}</h3>
        <text-field-view title="Организация" v-if="userInfo.organization" horizontal :value="userInfo.organization.name" />
        <text-field-view title="Почта" :value="userEmail" horizontal />
        <text-field-view title="Подписка" v-if="userInfo.subscription" :value="userSubscription" horizontal />
      </div>
      <div class="homepage-box-info">
        <h3>Ваши темы:</h3>
        <div class="homepage-theme-container">
          <div
            class="homepage-theme-name"
            v-for="theme in userInfo.themes"
            :key="theme"
          >
              <span>{{ `Источник: ${getSourceNameByTheme(theme)}, Наименование: ${theme.name}` }}</span>
              <v-link href="/dashboard" customClass="homepage-goto-btn" @clicked="selectTheme(theme)">&rarr;</v-link>
          </div>
        </div>
        <button
          class="homepage-button"
          :disabled="userInfo.subscription === 1"
          v-on:click="addTheme">
            Добавить тему
        </button>
      </div>
      <div class="homepage-box-info">
        <h3>Ваши подписки:</h3>
        <div class="homepage-theme-container">
          <div
            class="homepage-theme-name"
            v-for="source of userInfo.sources"
            :key="source.id"
          >
              <span>{{ `Канал: ${source.name} (@${source.account_name}), Платформа: ${userInfo.platforms[source.platform - 1].name}` }}</span>
          </div>
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
        <div class="homepage-theme-container">
          <p>Тема "Доллар" поднялась в рейтинге на 5 пунктов (пример)</p>
          <p>TO DO</p>
          <p>В выдаче scrapper есть количество просмотров views у сообщения + чтобы провести поиск по каналу надо к аккауннейму добавить ?q="искомое"</p>
        </div>
      </div>
      <div class="homepage-box-info">
        <h3>Лента ваших каналов:</h3>
        <div class="homepage-rss">
          <div v-for="message of latestMessages" :key="message.message_url" class="homepage-rss-message">
          <span>{{ 'Канал: ' + message.user_name }}</span><span>{{ 'Просмотры: ' + message.views }}</span>
          <p>{{ message.message_text }}</p>
        </div>
        </div>
        <loader-component v-if="!latestMessages.loaded" />
      </div>
    </div>
    <loader-component v-if="!userInfo.loaded" />
    <theme-modal title="Добавление темы" :platforms="userInfo.platforms" :sources="userInfo.sources" v-if="showThemeModal" @close-modal="closeModal"/>
    <source-modal title="Добавление источника" :platforms="userInfo.platforms" v-if="showSourceModal" @close-modal="closeModal"/>
    <notification-component :show="showNotification" :title="activeNotify.notifyTitle" :message="activeNotify.notifyMessage"/>
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
  //import { mapState } from 'pinia';

  const sessionStore = useSessionStore();
  const themesStore = useThemesStore();
  const notificationsStore = useNotificationsStore();
  
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
          activeNotify: { loaded: false }
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
    methods: {
      async addTheme() {
        const userApiRes = await fetch(`${process.env.VUE_APP_BACK_URL}/api/telegram`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" }
            })
            const userApiData = await userApiRes.json();
            console.log('TELEGRAM->', userApiData);
        this.showThemeModal = true
      },
      addSource() {
        this.showSourceModal = true
      },
      async closeModal() {
        this.showThemeModal = false
        this.showSourceModal = false
        this.userInfo = await this.fetchData();
        this.latestMessages = await this.loadRss();
      },
      selectTheme(theme) {
        themesStore.setSelected(theme)
      },
      getSourceNameByTheme(theme) {
        if (!theme || !this.userInfo.sources) return ''
        let sourceNames = '';
        const themeSources = this.userInfo.sources.filter(s => theme.sources.indexOf(s.id) >= 0);
        for (const source of themeSources) {
          sourceNames += ` ${source.name}`
        }
        return sourceNames
      },
      async fetchData() {
        const userApiData = await fetch(`${process.env.VUE_APP_BACK_URL}/api/userdata?user_id=${sessionStore.getUserData.id}`, {
        method: 'GET'
        });
        let userApiInfo = await userApiData.json();
        console.log('USER-API-DATA->', userApiInfo);
        notificationsStore.setNotifications([{notifyTitle: userApiInfo.success, notifyMessage: userApiInfo.message}]);
        return { ...userApiInfo.data, loaded: true }
      },
      async loadRss() {
        const rssApiData = await fetch(`${process.env.VUE_APP_BACK_URL}/api/load_posts?user_id=${sessionStore.getUserData.id}`, {
          method: 'GET'
        })
        let rssApiInfo = await rssApiData.json();
        //const rss = await rssApiInfo.data.json();
        console.log('RSS-API-DATA->', rssApiInfo, typeof rssApiInfo.data);
        notificationsStore.setNotifications([{notifyTitle: rssApiInfo.success, notifyMessage: rssApiInfo.message}]);
        return { ...rssApiInfo.data, loaded: true }
      }
    },
    async beforeMount() {
      this.userInfo = await this.fetchData();
      this.latestMessages = await this.loadRss();
      notificationsStore.$subscribe((mutation, state) => {
        //console.log('SUBSCRIBE->', mutation, state);
        if (state.active) {
          this.activeNotify = state.active
          this.showNotification = true
        }
      })
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
      },
    }
  }
</script>
<style>
  .homepage-container {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:flex-start;
    margin: 10px;
  }
  .homepage-box-info {
    position: relative;
    display: block;
    /* min-width: 45%; */
    max-width: 50%;
    padding: 1em;
    margin: 1em;
    text-align: center;
    background-color: rgb(187, 186, 186);
    /* background: linear-gradient(180deg, rgba(57,57,57,0.7049194677871149) 0%, rgba(157,157,157,0.5760679271708684) 30%, rgba(237,237,237,0.2959558823529411) 100%); */
    border-radius: 1vw;
  }
  .homepage-box-info h3 {
    font-size: 18pt;
    padding-bottom: 1em;
    margin: 0;
    /* background-color: rgb(240, 237, 237); */
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
    border-radius: 1vw;
  }
  .homepage-button:hover {
    border-color: red;
    color: black;
  }
  .homepage-theme-container {
    display: block;
    width: 100%;
    max-height: 30vh;
    overflow: auto;
  }
  .homepage-theme-name {
    display: flex;
    justify-content: space-between;
    background-color: #ededed;
    border-radius: 1vw;
    padding: 1em;
    margin-bottom: 1em;
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
  .homepage-rss {
    position: relative;
    display: block;
    padding: 1em;
    max-height: 30vh;
    overflow: auto;
  }
  .homepage-rss-message {
    width: 70%;
  }
  .homepage-rss-message span {
    font-size: 14pt;
    margin-right: 1em;
  }
</style>