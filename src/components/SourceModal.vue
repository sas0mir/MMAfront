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
                <select-input vertical title="Платформа" :options="platforms" @handle-change="setPlatform"/>
                <text-input vertical="true" title="Название источника" @handle-change="setSource"/>
                <button class="modal-submit-btn" v-on:click="checkSource">Проверить название</button>
                <select-input v-if="foundChannels.length" vertical title="Найденные каналы" :options="foundChannels" @handle-change="setSourceFinal"/>
                <text-input vertical="true" title="Автор (опционально)" @handle-change="setAuthor"/>
                <button class="modal-submit-btn" v-on:click="createSource">Добавить</button>
            </div>
        </div>
      </Transition>
  
    </Teleport>
</template>

<script>
import TextInput from './TextInput.vue';
import SelectInput from './SelectInput.vue';
import { useSessionStore } from '@/stores/SessionStore';
import { useNotificationsStore } from '@/stores/NotificationStore';

const sessionStore = useSessionStore();
const notificationsStore = useNotificationsStore();

  export default {
  components: { TextInput, SelectInput },
    name: 'SourceModal',
    props: {
      title: {
        type: String,
        required: true
      },
      platforms: {
        type: Array,
        required: true
      }
    },
    data() {
        return {
            sourceData: {
                platform: '',
                source: '',
                author: ''
            },
            foundChannels: []
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal', true)
        },
        setPlatform(value) {
            this.sourceData.platform = value
        },
        setSource(value) {
            this.sourceData.source = value
        },
        setAuthor(value) {
            this.sourceData.author = value
        },
        setSourceFinal(value) {
            this.sourceData.source = this.foundChannels.filter(ch => ch.id === value)[0]
        },
        async checkSource() {
            if(!this.sourceData.source) {
                notificationsStore.setNotifications([{notifyTitle: 'Обязательные поля', notifyMessage: 'Заполните наименование источника'}]);
                return
            }
            const checkedSource = await fetch(`${process.env.VUE_APP_BACK_URL}/api/telegram-contacts-search`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query:  this.sourceData.source,
                    limit: 10
                })
            })
            const checked = await checkedSource.json();
            notificationsStore.setNotifications([{notifyTitle: 'Поиск каналов', notifyMessage: checked.message}]);
            if (checked.success && checked.data.contacts?.chats?.length) {
                let channels = []
                for (const chan of checked.data.contacts.chats) {
                    channels.push({
                        name: `${chan.title} @${chan.username}`,
                        id: chan.id,
                        title: chan.title,
                        username: chan.username,
                        fake: chan.fake,
                        left: chan.left,
                        scam: chan.scam,
                        restricted: chan.restricted,
                        verified: chan.verified,
                        subscribers: chan.participants_count
                    })
                }
                this.foundChannels = channels;
            } else {
                notificationsStore.setNotifications([{notifyTitle: 'Поиск каналов', notifyMessage: `Каналов ${this.sourceData.source} не найдено`}]);
                this.foundChannels = [];
            }
        },
        async createSource() {
            if(!this.sourceData.source) {
                notificationsStore.setNotifications([{notifyTitle: 'Обязательные поля', notifyMessage: 'Заполните наименование источника'}]);
                return
            }
            this.sourceData.user_id = sessionStore.getUserData.id;
            const sourceApiData = await fetch(`${process.env.VUE_APP_BACK_URL}/api/subscribe`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.sourceData)
            });
            let sourceApiResponse = await sourceApiData.json();
            console.log('SAVE-SOURCE-RESPONSE->', sourceApiResponse);
            this.foundChannels = [];
            if (sourceApiResponse.success) {
                this.closeModal();
            }
            notificationsStore.setNotifications([{notifyTitle: sourceApiResponse.success, notifyMessage: sourceApiResponse.message}])
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
        min-width: 20%;
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
        width: 190px;
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