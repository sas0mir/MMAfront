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
                <text-input vertical="true" title="Платформа" @handle-change="setPlatform"/>
                <text-input vertical="true" title="Источник" @handle-change="setSource"/>
                <text-input vertical="true" title="Автор" @handle-change="setAuthor"/>
                <button class="modal-submit-btn" v-on:click="createSource">Добавить</button>
            </div>
        </div>
      </Transition>
  
    </Teleport>
</template>

<script>
import TextInput from './TextInput.vue';
import { useSessionStore } from '@/stores/SessionStore';

const sessionStore = useSessionStore();

  export default {
  components: { TextInput },
    name: 'SourceModal',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data() {
        return {
            sourceData: {
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
        setPlatform(value) {
            this.sourceData.platform = value
        },
        setSource(value) {
            this.sourceData.source = value
        },
        setAuthor(value) {
            this.sourceData.author = value
        },
        async createSource() {
            if(!this.sourceData.source) {
                //remake for notifications
                alert('Ведите название')
                return
            }
            this.sourceData.user_id = sessionStore.getUserData.id;
            const sourceApiData = await fetch(`${'http://localhost:3000'}/api/subscribe`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.sourceData)
            });
            let sourceApiResponse = await sourceApiData.json();
            console.log('FAIL??', sourceApiResponse);
            if (sourceApiResponse.success) {
                console.log('SUCCESS', sourceApiResponse);
                this.closeModal();
            }
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