import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createHead } from "@unhead/vue/client";
import router from "./router/index.ts";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from "pinia";
import i18n from './i18n/index.ts';
import { useThemeStore } from "./stores/themeStore.ts";

// Import FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// Import FontAwesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import specific icons
import { faCode, faLink, faDatabase, faGamepad, faLock, faHouse, faUserSlash, faEnvelope, faLanguage, faSun, faMoon, faUserCircle, faPlus, faEdit, faCalendar, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import { 
    faVuejs, faPhp, faLaravel, faNodeJs, faDocker,
    faSass, faJs, faHtml5, faCss3Alt, faGitAlt, faGoogle, faReact, faWordpress, faDiscord, faLinkedin, faTelegram, faGithub
} from '@fortawesome/free-brands-svg-icons'

// Add icons to the library
library.add(
    faCode, faLink, faVuejs, faPhp, faLaravel, 
    faNodeJs, faDocker, faSass, faJs, faHtml5, faHouse, faUserSlash, faLock,
    faCss3Alt, faGitAlt, faGoogle, faReact, faWordpress, faDatabase, faGamepad, faDiscord, faLinkedin, faEnvelope, faTelegram, faGithub, faLanguage,
    faSun, faMoon, faUserCircle, faPlus, faEdit, faCalendar, faMapMarkerAlt, faClock
)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const head = createHead()

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
    .use(pinia)
    .use(i18n)
    .use(head)
    .mount("#app");

// Initialize theme
const themeStore = useThemeStore();
themeStore.initTheme();
