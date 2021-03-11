import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import gAuthPlugin from 'vue3-google-oauth2';
let gauthClientId = "263402996731-85sjjl8mdbohi028lorhh55kviqvalmp.apps.googleusercontent.com";

createApp(App)
    .use(store)
    .use(router)
    .use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: true })
    .mount('#app')