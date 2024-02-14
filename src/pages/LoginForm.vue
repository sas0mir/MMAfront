<template>
    <form class="login-form" @submit.prevent="onSubmit">
        <h3 class="login-form-title">Вход в аккаунт</h3>
        <TextInput title="почта" @handle-change="setEmail" horizontal/>
        <TextInput title="пароль" @handle-change="setPass" horizontal/>
        <input class="login-form-btn" type="submit" value="Вход"/>
    </form>
</template>
  
<script>

import TextInput from '../components/TextInput.vue'
import { useSessionStore } from '@/stores/SessionStore'

const sessionStore = useSessionStore()

  export default {
    name: 'LoginForm',
    props: {
      value: {
        type: String,
        required: true
      }
    },
    components: {
        TextInput
    },
    data() {
        return {
            formValues: {
                email: '',
                pass: ''
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
            const userApiRes = await fetch(`${'http://localhost:3000'}/api/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email:  this.formValues.email,
                    password: this.formValues.pass,
                    return_to: 'dashboard'
                })
            })
            const userApiData = await userApiRes.json();
            console.log('LOGIN->', userApiData, '\nSTARE->', sessionStore);
            sessionStore.setUserData(userApiData);
            //todo очистку значений в полях
            this.formValues.email = '';
            this.formValues.pass = '';
        }
    },
    computed: {
        
    }
  }
</script>
  
<style>
    .login-form {
        width: 50%;
        display: block;
        margin: auto;
        align-content: center;
        align-items: center;
        justify-items: center;
        text-align: center;
    }
    .login-form-title {

    }
    .login-form-btn {

    }
</style>
  