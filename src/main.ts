import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from "pinia";
import i18n from './i18n/index.ts';
import { useThemeStore } from "./stores/themeStore.ts";
import vue3GoogleLogin from 'vue3-google-login'

// Import FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// Import FontAwesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import specific icons
import {
    faCode,
    faMobileButton,
    faTabletButton,
    faQuestionCircle,
    faLaptop,
    faComputer,
    faLink,
    faDatabase,
    faGamepad,
    faLock,
    faHouse,
    faUserSlash,
    faEnvelope,
    faLanguage,
    faSun,
    faMoon,
    faUserCircle,
    faPlus,
    faEdit,
    faCalendar,
    faMapMarkerAlt,
    faClock,
    faEye,
    faEyeSlash,
    faBars,
    faTimes,
    faCircleExclamation, faSignInAlt
} from "@fortawesome/free-solid-svg-icons";
import {
    faVuejs,
    faPhp,
    faLaravel,
    faNodeJs,
    faDocker,
    faSass,
    faJs,
    faHtml5,
    faCss3Alt,
    faGitAlt,
    faGoogle,
    faReact,
    faWordpress,
    faDiscord,
    faLinkedin,
    faTelegram,
    faGithub,
    faMicrosoft,
    faUnity, faCss
} from "@fortawesome/free-brands-svg-icons";
import { env } from "@/helpers/app.js";

// Add icons to the library
library.add(
    faCode, faLink, faVuejs, faPhp, faLaravel, faCircleExclamation, faSignInAlt, faCss,
    faNodeJs, faDocker, faSass, faJs, faHtml5, faHouse, faUserSlash, faLock, faUnity, faBars, faTimes,
    faCss3Alt, faGitAlt, faGoogle, faReact, faWordpress, faDatabase, faGamepad, faDiscord, faLinkedin, faEnvelope, faTelegram, faGithub, faMicrosoft,
    faLanguage,
    faSun, faMoon, faUserCircle, faPlus, faEdit, faCalendar, faMapMarkerAlt, faClock, faEye, faEyeSlash, faMobileButton, faTabletButton, faQuestionCircle, faLaptop, faComputer,
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
    })
    .mount("#app");

// Initialize theme
const themeStore = useThemeStore();
themeStore.initTheme();
