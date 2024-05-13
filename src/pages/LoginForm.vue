<template>
    <form class="login-form" @submit.prevent="onSubmit">
        <h3 class="login-form-title">Вход в аккаунт</h3>
        <TextInput title="почта" @handle-change="setEmail" horizontal/>
        <TextInput title="пароль" @handle-change="setPass" horizontal/>
        <input class="login-form-btn" type="submit" value="Вход"/>
        <v-link href="/register">Регистрация</v-link>
        <!-- <input class="login-form-btn" type="button" @click="handleRegisterClick" value="Регистрация"/> -->
    </form>
    <notification-component :show="showNotification" :title="activeNotify.notifyTitle" :message="activeNotify.notifyMessage"/>
</template>
  
<script>

import TextInput from '../components/TextInput.vue'
import NotificationComponent from '@/components/NotificationComponent.vue'
import VLink from '@/components/VLink.vue'
import { useSessionStore } from '@/stores/SessionStore'
import { useNotificationsStore } from '@/stores/NotificationStore'

const sessionStore = useSessionStore()
const notificationsStore = useNotificationsStore()

  export default {
    name: 'LoginForm',
    props: {
    },
    components: {
        TextInput,
        NotificationComponent,
        VLink
    },
    data() {
        return {
            formValues: {
                email: '',
                pass: ''
            },
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
        if(newValue && newValue !== oldValue && !newValue.notifyTitle) {
          this.showNotification = true
        }
      }
    },
    methods: {
        setEmail(value) {
            this.formValues.email = value
        },
        setPass(value) {
            this.formValues.pass = value
        },
        async onSubmit() {
            if (!this.formValues.email || !this.formValues.pass) {
                alert('Введите данные')
                return
            }
            //this.$emit('login-form-submitted', this.formValues);
            const userApiRes = await fetch(`${process.env.VUE_APP_BACK_URL}/api/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email:  this.formValues.email,
                    password: this.formValues.pass,
                    return_to: 'dashboard'
                })
            })
            const userApiData = await userApiRes.json();
            notificationsStore.setNotifications([{notifyTitle: userApiData.success, notifyMessage: userApiData.message}])
            sessionStore.setUserData({...userApiData.user, token: userApiData.token});
            // this.formValues.email = '';
            // this.formValues.pass = '';
        },
        handleRegisterClick() {
            console.log('REGISTER->', window.location.host);
            window.location.href = `${window.location.host}/register`
        }
    },
    beforeMount() {
      notificationsStore.$subscribe((mutation, state) => {
        if (state.active && !state.active.notifyTitle) {
          this.activeNotify = state.active
          this.showNotification = true
        }
      })
    },
    computed: {
        
    }
  }
</script>
  
<style>
    .login-form {
        width: 30%;
        display: block;
        margin: auto;
        align-content: center;
        align-items: center;
        justify-items: center;
        text-align: center;
    }
    .login-form-title {
        font-family: "Roboto Condensed", sans-serif;
        font-size: 16pt;
    }
    .login-form-btn {
        background: inherit;
        font-family: "Roboto Condensed", sans-serif;
        font-size: 14pt;
        padding: 1em 2em;
        margin: 1em;
        text-align: center;
    }
    .login-form-btn:hover {
        border: 2px solid red;
        color: red;
        cursor: pointer;
    }
</style>