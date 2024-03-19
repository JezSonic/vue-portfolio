import "./assets/main.css";
import VueWriter from "vue-writer";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
createApp(App)
    .use(router)
    .use(VueWriter)
    .mount("#app");
