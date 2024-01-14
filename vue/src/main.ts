import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import './assets/scss/main.scss'
import { createPinia } from 'pinia'
import './axios'
import 'vue3-toastify/dist/index.css';
import toast, { type ToastContainerOptions } from 'vue3-toastify';
import VueCookies from 'vue-cookies'



// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia()

createApp(App)
  .use(toast, {
    autoClose: 3000,
    position: 'top-right',
    "theme": 'dark',
    "dangerouslyHTMLString": true
  } as ToastContainerOptions)
  .use(pinia)
  .use(VueCookies)
  .use(vuetify)
  .use(router)
  .mount('#app')
