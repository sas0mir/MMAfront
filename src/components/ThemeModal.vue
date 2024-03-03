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
                <text-input horizontal="true" title="Наименование темы" />
                <text-input horizontal="true" title="Источник" />
                <text-input horizontal="true" title="Автор" />
                <button class="modal-submit-btn" v-on:click="createTheme">Добавить</button>
            </div>
        </div>
      </Transition>
  
    </Teleport>
</template>

<script>
import TextInput from './TextInput.vue';

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
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal', true)
        },
        createTheme() {
            //todo
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
        align-content: center;
        background-color: white;
        padding: 2em;
    }
</style>