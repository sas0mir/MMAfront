<template>
    <form class="login-form" @submit.prevent="onSubmit">
        <h3 class="login-form-title">Создание аккаунта</h3>
        <TextInput title="имя" @handle-change="setName" horizontal/>
        <TextInput title="организация" @handle-change="setOrg" horizontal/>
        <TextInput title="почта" @handle-change="setEmail" horizontal/>
        <TextInput title="пароль" @handle-change="setPass" horizontal/>
        <input class="login-form-btn" type="submit" value="Зарегистрироваться"/>
        <input class="login-form-btn" @click="handleLoginClick" value="Есть аккаунт"/>
    </form>
</template>
  
<script>

import TextInput from '../components/TextInput.vue'
import { useSessionStore } from '@/stores/SessionStore'

const sessionStore = useSessionStore()

  export default {
    name: 'RegisterForm',
    props: {
    },
    components: {
        TextInput
    },
    data() {
        return {
            formValues: {
                name: '',
                email: '',
                pass: '',
                org: ''
            }
        }
    },
    methods: {
        setName(value) {
            this.formValues.name = value
        },
        setOrg(value) {
            this.formValues.org = value
        },
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
            const userApiRes = await fetch(`${process.env.VUE_APP_BACK_URL}/api/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: this.formValues.name,
                    email:  this.formValues.email,
                    password: this.formValues.pass,
                    organization: this.formValues.org,
                    return_to: 'dashboard'
                })
            })
            const userApiData = await userApiRes.json();
            console.log('REGISTER->', userApiData);
            //this.formValues.name = '';
            //this.formValues.email = '';
            //this.formValues.pass = '';
            if(userApiData.success) {
                sessionStore.setUserData({...userApiData.user, token: userApiData.token});
                window.Location.href = 'http://localhost:8080/login'
            } else {
                alert(userApiData.message)
            }
        },
        handleLoginClick() {
            window.location.href = `${window.location.host}/login`
        }
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
        color: grey;
        cursor: pointer;
    }
</style>