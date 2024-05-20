<template>
  <main-layout>
    <div class="homepage-container" v-if="userInfo.loaded">
      <div class="homepage-box-info">
        <v-icon name="fa-user" class="home-box-icon"/>
        <h3 v-if="userInfo.user">{{ userInfo.user.name }}</h3>
        <text-field-view title="Организация" v-if="userInfo.organization" horizontal :value="userInfo.organization.name" />
        <text-field-view title="Почта" :value="userEmail" horizontal />
        <text-field-view title="Подписка" v-if="userInfo.subscription" :value="userSubscription" horizontal />
      </div>
      <div class="homepage-box-info">
        <v-icon name="fa-bolt" class="home-box-icon"/>
        <h3>Ваши темы:</h3>
        <div class="homepage-theme-container">
          <div
            class="homepage-theme-name"
            v-for="theme in userInfo.themes"
            :key="theme"
          >
              <span>{{ theme.name }}</span>
              <v-link href="/dashboard" customClass="homepage-goto-btn" @clicked="selectTheme(theme)">
                <v-icon name="fa-arrow-circle-right" hover animation="pulse" speed="fast" scale="1.5" />
              </v-link>
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
        <v-icon name="fa-bell" class="home-box-icon"/>
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
        <v-icon name="fa-globe-asia" class="home-box-icon"/>
        <h3>Новости</h3>
        <div class="homepage-theme-container">
          <p>Тема "Доллар" поднялась в рейтинге на 5 пунктов (пример)</p>
          <p>TO DO</p>
          <p>В выдаче scrapper есть количество просмотров views у сообщения + чтобы провести поиск по каналу надо к аккауннейму добавить ?q="искомое"</p>
        </div>
      </div>
      <div class="homepage-box-info">
        <v-icon name="fa-book-open" class="home-box-icon"/>
        <h3>Лента ваших каналов:</h3>
        <div class="homepage-rss-container">
          <div class="homepage-rss-left">
            <div v-for="channel in latestMessages" :key="channel.length" class="homepage-rss-channel">
              <button class="homepage-rss-btn" v-if="channel.length" v-on:click="selectRssChannel(channel)"><img :src="channel[0]?.user_photo" :alt="channel[0]?.user_name" />{{ channel[0]?.user_name }}</button>
            </div>
          </div>
          <div class="homepage-rss-right">
            <div class="homepage-rss-post" v-for="post of activeRssChannel" :key="post.views">
              <p class="homepage-rss-post-title">{{`${post.datetime} Просмотры:${post.views}`}}</p>
              <img class="homepage-rss-post-img" v-if="post.message_photo.length" :src="post.message_photo[0]" :alt="post.data_post" />
              <video class="homepage-rss-post-video" v-if="post.message_video.length" :src="post.message_video[0]" controls>{{ post.data_post }}</video>
              <p class="homepage-rss-post-text">{{post.message_text || post.message_url}}</p>
            </div>
          </div>
        </div>
        <loader-component v-if="!latestMessages.loaded" />
      </div>
      <div class="homepage-box-info">
        <v-icon name="fa-cloud" class="home-box-icon"/>
        <h3>Облако ваших тегов:</h3>
        <vue-word-cloud
          style="
            height: 400px;
            width: 400px;
          "
          :words="wordCloud"
          :color="([, weight]) => weight > 10 ? 'rgb(65, 112, 200)' : weight > 5 ? 'grey' : 'white'"
          font-family="Roboto"
          animation-duration="1000"
          animation-easing="ease"
          animation-overlap="0"
          spacing="2"
          rotation="0"
          rotation-unit="deg"
        />
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
  import VueWordCloud from 'vuewordcloud';
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
      NotificationComponent,
      [VueWordCloud.name]: VueWordCloud
    },
    data() {
        return {
          userInfo: { loaded: false },
          latestMessages: { loaded: false},
          showThemeModal: false,
          showSourceModal: false,
          showNotification: false,
          activeNotify: { loaded: false },
          activeRssChannel: []
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
        this.activeRssChannel = Object.values(this.latestMessages)[0]
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
        notificationsStore.setNotifications([{notifyTitle: userApiInfo.success, notifyMessage: userApiInfo.message}]);
        console.log('HOME-USERDATA->', userApiInfo.data);
        return { ...userApiInfo.data, loaded: true }
      },
      async loadRss() {
        const rssApiData = await fetch(`${process.env.VUE_APP_BACK_URL}/api/load_posts?user_id=${sessionStore.getUserData.id}`, {
          method: 'GET'
        })
        let rssApiInfo = await rssApiData.json();
        //const rss = await rssApiInfo.data.json();
        console.log('RSS-API-DATA->', rssApiInfo);
        notificationsStore.setNotifications([{notifyTitle: rssApiInfo.success, notifyMessage: rssApiInfo.message}]);
        return { ...rssApiInfo.data, loaded: true }
      },
      selectRssChannel(channel) {
        this.activeRssChannel = channel
      }
    },
    async beforeMount() {
      this.userInfo = await this.fetchData();
      this.latestMessages = await this.loadRss();
      this.activeRssChannel = Object.values(this.latestMessages)[0]
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
      wordCloud() {
        let cloud = [];
        if(this.userInfo.themes) {
          for (let theme of this.userInfo.themes) {
            for (let prompt of theme.prompt) {
              //cloud.push([prompt, theme.rating])
              cloud.push([prompt, Math.floor(Math.random() * 15)])
            }
          }
        }
        console.log('WORDS-CLOUD->', cloud);
        return cloud
      }
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
    overflow: auto;
    max-height: 100%;
  }
  .homepage-box-info {
    position: relative;
    display: block;
    /* min-width: 45%; */
    max-width: 35%;
    padding: 1em;
    margin: 1em;
    text-align: center;
    background-color: rgb(187, 186, 186);
    /* background: linear-gradient(180deg, rgba(57,57,57,0.7049194677871149) 0%, rgba(157,157,157,0.5760679271708684) 30%, rgba(237,237,237,0.2959558823529411) 100%); */
    border-radius: 1vw;
    min-height: 20%;
    max-height: 35%;
  }
  .home-box-icon {
    position: absolute;
    top: 1em;
    left: 1em;
  }
  .homepage-box-info h3 {
    font-size: 15pt;
    padding-bottom: 1em;
    margin: 0;
    margin-left: 2em;
    text-align: left;
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
    border-color: rgb(65, 112, 200);
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
    align-items: center;
  }
  .homepage-goto-btn {
    border: none;
    background-color: inherit;
    color: black;
    cursor: pointer;
  }
  .homepage-goto-btn:hover {
    color: rgb(65, 112, 200);
  }
  .homepage-rss {
    position: relative;
    display: block;
    padding: 1em;
    max-height: 30vh;
    overflow: auto;
  }
  .homepage-rss-container {
    position: relative;
    display: grid;
    grid-template-columns: 20% 75%;
    grid-column-gap: 5%;
  }
  .homepage-rss-left, .homepage-rss-right {
    position: relative;
    display: block;
    max-height: 40vh;
    overflow: auto;
  }
  .homepage-rss-channel {
    display: flex;
    background-color: #ededed;
    border-radius: 1vw;
    padding: 0;
    margin-bottom: 1em;
    align-items: center;
  }
  .homepage-rss-btn {
    width: 100%;
    padding: 0;
    border-radius: 1vw;
    font-size: 12pt;
    font-family: "Roboto Condensed", sans-serif;
    border: none;
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .homepage-rss-btn img {
    width: 1vw;
    border-radius: 50%;
    margin-right: 1em;
  }
  .homepage-rss-right {
    border-radius: 1vw;
  }
  .homepage-rss-post {
    display: block;
    margin-bottom: 1em;
    padding: 1em;
    background-color: #ededed;
    border-radius: 1vw;
  }
  .homepage-rss-post-title {
    text-align: right;
  }
  .homepage-rss-post-img {
    max-width: 80%;
  }
  .homepage-rss-post-video {
    width: 80%;
  }
</style>