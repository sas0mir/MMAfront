<template>
    <Teleport to="body">
  
      <Transition name="modal-fade">
        <div class="modal-wrapper">
            <div class="modal-container">
                <button
                    class="modal-button"
                    v-on:click="closeModal">
                        x
                </button>
                <h3>{{ title }}</h3>
                <text-input vertical="true" title="Наименование темы" @handle-change="setThemeName"/>
                <text-input vertical="true" title="Промпт" @handle-change="setThemePrompt"/>
                <text-input vertical="true" title="Платформа" @handle-change="setThemePlatform"/>
                <text-input vertical="true" title="Источник" @handle-change="setThemeSource"/>
                <text-input vertical="true" title="Автор" @handle-change="setThemeAuthor"/>
                <button class="modal-submit-btn" v-on:click="createTheme">Добавить</button>
            </div>
        </div>
      </Transition>
  
    </Teleport>
</template>

<script>
import TextInput from './TextInput.vue';
import { useSessionStore } from '@/stores/SessionStore';
import { useNotificationsStore } from '@/stores/NotificationStore';

const sessionStore = useSessionStore();
const notificationsStore = useNotificationsStore();

  export default {
  components: { TextInput },
    name: 'ThemeModal',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data() {
        return {
            themeData: {
                name: '',
                prompt: [],
                platform: '',
                source: '',
                author: ''
            }
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal', true)
        },
        setThemeName(value) {
            this.themeData.name = value
        },
        setThemePrompt(value) {
            const promptArr = value.split(' ');
            this.themeData.prompt = promptArr
        },
        setThemePlatform(value) {
            this.themeData.platform = value
        },
        setThemeSource(value) {
            this.themeData.source = value
        },
        setThemeAuthor(value) {
            this.themeData.author = value
        },
        async createTheme() {
            if(!this.themeData.name) {
                //remake for notifications
                alert('Ведите название темы')
                return
            }
            this.themeData.user_id = sessionStore.getUserData.id;
            let userThemes = sessionStore.getUserData.themes;
            userThemes.push(this.themeData.name);
            this.themeData.user_themes = userThemes;
            console.log('CREATE-THEME->', this.themeData);
            const themeApiData = await fetch(`${'http://localhost:3000'}/api/theme_create`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.themeData)
            });
            let themeApiResponse = await themeApiData.json();
            console.log('FAIL??', themeApiResponse);
            if (themeApiResponse.success) {
                console.log('SUCCESS', themeApiResponse);
            }
            notificationsStore.setNotifications([{notifyTitle: themeApiResponse.success, notifyMessage: themeApiResponse.message}])
        }
    },
    computed: {
        
    }
  }
  </script>
  
<style>
    .modal-wrapper {
        position: fixed;
        left: 0;
        top: 0;

        z-index: 500;

        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.2);

        display: grid;
        place-items: center;
    }
    .modal-fade-enter-from, .modal-fade-leave-to {
        opacity: 0;
    }
    .modal-fade-enter-active, .modal-fade-leave-active {
        transition: 0.25s ease all;
    }
    .modal-button {
        position: absolute;
        top: 5%;
        right: 5%;
        width: 5%;
        border: none;
        background-color: inherit;
        cursor: pointer;
        font-size: 16pt;
    }
    .modal-container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-content: space-between;
        background-color: white;
        padding: 2em;
    }
    .modal-container h3 {
        font-size: 18pt;
    }
    .modal-submit-btn {
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
    .modal-submit-btn:hover {
        border-color: red;
        color: black;
    }
</style>