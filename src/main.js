import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import "./assets/styles.css"
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
    FaInstagram,
    FaVk,
    FaYandex,
    FaTelegramPlane,
    FaUser,
    FaBolt,
    FaBell,
    FaGlobeAsia,
    FaBookOpen,
    FaArrowCircleRight,
    FaCloud
} from 'oh-vue-icons/icons'

addIcons(
    FaInstagram,
    FaVk,
    FaYandex,
    FaTelegramPlane,
    FaUser,
    FaBolt,
    FaBell,
    FaGlobeAsia,
    FaBookOpen,
    FaArrowCircleRight,
    FaCloud
);

const app = createApp(App);
app.use(createPinia());
app.component("v-icon", OhVueIcon);
app.mount('#app');
