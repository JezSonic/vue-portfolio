import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import '@/assets/code.css'
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import { MotionPlugin } from '@vueuse/motion'

hljs.registerLanguage('typescript', typescript);

createApp(App)
    .use(router)
    .use(MotionPlugin)
    .use(hljsVuePlugin)
    .mount("#app");
