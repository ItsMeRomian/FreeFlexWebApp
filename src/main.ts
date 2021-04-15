import { createApp } from 'vue'
// @ts-ignore
import Toaster from "@meforma/vue-toaster";
import App from './App.vue'
import router from './router'
import store from './store'

// @ts-ignore
import gAuthPlugin from 'vue3-google-oauth2';
let gauthClientId = "919599346784-psmncpu51onenn0pt6ob5o0iqitlg63e.apps.googleusercontent.com";

createApp(App)
    .use(store)
    .use(router)
    .use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: true })
    .use(Toaster)
    .mount('#app')