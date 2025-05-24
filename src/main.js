import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.directive('bg-color', {
  beforeMount(el, binding) {
    el.style.backgroundColor = binding.value || 'red';
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value || 'red';
  }
});

app.mount('#app')