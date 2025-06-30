import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from "pinia";
import i18n from './i18n/index.ts';
import { useThemeStore } from "./stores/themeStore.ts";
import { useUserStore } from "./stores/userStore.ts";
import { watch } from "vue";

import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

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

Bugsnag.start({
  apiKey: 'YOUR_API_KEY', // IMPORTANT: Replace with your actual Bugsnag API key
  plugins: [new BugsnagPluginVue()],
  // releaseStage: import.meta.env.MODE, // Example: set release stage from Vite env
  // appVersion: import.meta.env.PACKAGE_VERSION // Example: set app version, ensure this is available
});

const app = createApp(App)

// Get the Bugsnag Vue plugin instance
const bugsnagVue = Bugsnag.getPlugin('vue');
if (bugsnagVue) {
  app.use(bugsnagVue);
} else {
  console.error("Bugsnag Vue plugin not found. Error reporting may not work correctly.");
}

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
    .use(pinia)
    .use(i18n)
    .mount("#app");

// Initialize theme
const themeStore = useThemeStore();
themeStore.initTheme();

// Set up Bugsnag user tracking
// Needs to be done after pinia is used by the app
const userStore = useUserStore();

// Function to update Bugsnag user
const updateBugsnagUser = (userId: number | null) => {
  if (userId) {
    Bugsnag.setUser(String(userId)); // Set user ID. Name and email can be added if available
  } else {
    Bugsnag.setUser(null); // Clear user data on logout
  }
};

// Initial Bugsnag user setup
updateBugsnagUser(userStore.id);

// Watch for changes in user ID (login/logout)
watch(() => userStore.id, (newId) => {
  updateBugsnagUser(newId);
});
