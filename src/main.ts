import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from "pinia";

// Import FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// Import FontAwesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import specific icons
import { faCode, faLink, faDatabase, faGamepad, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { 
    faVuejs, faPhp, faLaravel, faNodeJs, faDocker, 
    faSass, faJs, faHtml5, faCss3Alt, faGitAlt, faGoogle, faReact, faWordpress, faDiscord, faLinkedin, faTelegram, faGithub
} from '@fortawesome/free-brands-svg-icons'

// Add icons to the library
library.add(
    faCode, faLink, faVuejs, faPhp, faLaravel, 
    faNodeJs, faDocker, faSass, faJs, faHtml5, 
    faCss3Alt, faGitAlt, faGoogle, faReact, faWordpress, faDatabase, faGamepad, faDiscord, faLinkedin, faEnvelope, faTelegram, faGithub
)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
    .use(pinia)
    .mount("#app");
