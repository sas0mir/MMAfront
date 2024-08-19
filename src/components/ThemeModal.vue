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
    components: { 
        TextInput
    },
    name: 'ThemeModal',
    props: {
      title: {
        type: String,
        required: true
      },
      platforms: {
        type: Array,
        required: true
      },
      sources: {
        type: Array,
        required: true
      }
    },
    data() {
        return {
            themeData: {
                name: '',
                prompt: []
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
            if(/,/g.test(value)) {
                const promptArr = value.split(',');
                this.themeData.prompt = promptArr
            } else {
                const promptArr = value.split(' ');
                this.themeData.prompt = promptArr
            }
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
                notificationsStore.setNotifications([{notifyTitle: 'Ошибка', notifyMessage: 'Обязательное поле Наименование темы не заполнено'}]);
                return
            }
            const test = await fetch(`${process.env.VUE_APP_BACK_URL}/api/telegram-search-global`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query:  this.themeData.name,
                    limit: 10
                })
            });
            let bbb = sessionStore.getUserData.id;
            const checked = await test.json();
            console.log('TEST->', bbb, checked);
            // this.themeData.user_id = sessionStore.getUserData.id;
            // let userThemes = sessionStore.getUserData.themes;
            // userThemes.push(this.themeData.name);
            // this.themeData.user_themes = userThemes;
            // console.log('CREATE-THEME-START->', this.themeData);
            // const themeApiData = await fetch(`${process.env.VUE_APP_BACK_URL}/api/theme_create`, {
            //     method: 'POST',
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(this.themeData)
            // });
            // let themeApiResponse = await themeApiData.json();
            // console.log('CREATE-THEME-RESPONSE->', themeApiResponse);
            // if (themeApiResponse.success) {
            //     this.closeModal()
            // }
            // notificationsStore.setNotifications([{notifyTitle: themeApiResponse.success, notifyMessage: themeApiResponse.message}])
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
    .modal-button:hover {
        color: red;
    }
    .modal-container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-content: space-between;
        background-color: white;
        padding: 2em;
        border-radius: 1vw;
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
        min-width: 150px;
        height: 50px;
        color: grey;
        padding: 10px;
        text-align: center;
        cursor: pointer;
        border-radius: 1vw;
    }
    .modal-submit-btn:hover {
        border-color: rgb(65, 112, 200);
        color: black;
    }
</style>