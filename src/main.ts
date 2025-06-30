import "./assets/main.css";

import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";

import { createApp } from "vue";
import App from "./App.vue";
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
import { faCode, faLink, faDatabase, faGamepad, faEnvelope, faLanguage, faSun, faMoon, faUserCircle, faPlus, faEdit, faCalendar, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import { 
    faVuejs, faPhp, faLaravel, faNodeJs, faDocker, 
    faSass, faJs, faHtml5, faCss3Alt, faGitAlt, faGoogle, faReact, faWordpress, faDiscord, faLinkedin, faTelegram, faGithub
} from '@fortawesome/free-brands-svg-icons'

// Add icons to the library
library.add(
    faCode, faLink, faVuejs, faPhp, faLaravel, 
    faNodeJs, faDocker, faSass, faJs, faHtml5, 
    faCss3Alt, faGitAlt, faGoogle, faReact, faWordpress, faDatabase, faGamepad, faDiscord, faLinkedin, faEnvelope, faTelegram, faGithub, faLanguage,
    faSun, faMoon, faUserCircle, faPlus, faEdit, faCalendar, faMapMarkerAlt, faClock
)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
    .use(pinia)
    .use(i18n)
    .mount("#app");

// Initialize theme
const themeStore = useThemeStore();
themeStore.initTheme();

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBDwTqJENLOQ1Sgte9gXSYIXvrlZUZzwHc",
  authDomain: "api-9176249411662404922-339889.firebaseapp.com",
  databaseURL: "https://api-9176249411662404922-339889.firebaseio.com",
  projectId: "api-9176249411662404922-339889",
  storageBucket: "api-9176249411662404922-339889.appspot.com",
  messagingSenderId: "1073018353526",
  appId: "1:1073018353526:web:15ee4721d54885abecac57",
  measurementId: "G-8BNPTG3MXQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Performance Monitoring
getPerformance(firebaseApp);
