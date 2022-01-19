import { createApp } from 'vue'
import Home from './views/Home.vue'
import router from './router'
import store from './store'

createApp(Home).use(store).use(router).mount('#app')
