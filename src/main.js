
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './assets/scrolbar.css'
import 'jquery';
const app = createApp(App)

app.use(router)

app.mount('#app')
