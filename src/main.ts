import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from "pinia";
import i18n from './i18n/index.ts';
import { useThemeStore } from "./stores/themeStore.ts";
import vue3GoogleLogin from 'vue3-google-login'
import VueGtag from "vue-gtag-next";

// Import FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// Import FontAwesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import specific icons
import {
    faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
    faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import { env } from "@/helpers/app.js";

// Add icons to the library
library.add(
    faLink, faVuejs
)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
    .use(pinia)
    .use(i18n)
    .use(vue3GoogleLogin, {
        clientId: env('GOOGLE_CLIENT_ID')
    });

const googleAnalyticsId = env('GOOGLE_ANALYTICS_ID');
if (googleAnalyticsId) {
    app.use(VueGtag, {
        property: {
            id: googleAnalyticsId
        }
    }, router); //leave it here as it works
}

app.mount("#app");

// Initialize theme
const themeStore = useThemeStore();
themeStore.initTheme();
