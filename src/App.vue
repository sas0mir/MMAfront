<script>
import {h} from 'vue'
import routes from './routes';
import { useSessionStore } from './stores/SessionStore';

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      currentRoute: window.location.pathname,
      cart: [],
      premium: true,
      userData: {}
    }
  },
  methods: {
  },
  computed: {
    ViewComponent() {
        const sessionStore = useSessionStore()
        const matchingPage = routes[this.currentRoute] || '404notFound'
        const isOnRegistration = /register/g.test(window.location.href);
        const isOnLoginOrReg = ['RegisterForm', 'LoginForm'].indexOf(matchingPage) >= 0;
        console.log('000->', !!sessionStore.userData?.token, matchingPage, isOnRegistration);
        if(!sessionStore.userData?.token) {
          return isOnRegistration ? require('./pages/RegisterForm.vue').default : require('./pages/LoginForm.vue').default
        }
        return require(`./pages/${isOnLoginOrReg ? 'HomePage' : matchingPage}.vue`).default
    }
  },
  render() {
      return h(this.ViewComponent)
  },
  created() {
      window.addEventListener('popstate', () => {
          this.currentRoute = window.location.pathname
      })
  }
}
</script>

<style>
#app {
  font-family: "Roboto Condensed", sans-serif;
}
</style>
