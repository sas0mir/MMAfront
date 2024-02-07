<template>
    <form class="login-form" @submit.prevent="onSubmit">
        <h3 class="login-form-title">Вход в аккаунт</h3>
        <TextInput title="почта" @handle-change="setEmail"/>
        <TextInput title="пароль" @handle-change="setPass"/>
        <input class="login-form-btn" type="submit" value="Вход"/>
    </form>
</template>
  
<script>

import TextInput from './TextInput.vue'

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
        onSubmit() {
            if (!this.formValues.email || !this.formValues.pass) {
                alert('Введите данные')
                return
            }
            this.$emit('login-form-submitted', this.formValues);
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

</style>
  