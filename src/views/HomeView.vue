<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import Badge from "@/components/badges/Badge.vue";
import { useI18n } from 'vue-i18n';
import Button from "@/components/ui/Button.vue";
import router from "@/router/index.js";
import { ref, onMounted } from 'vue';
import { useLazyLoad } from '@/composables/useLazyLoad';

// Image imports for webpack processing
import artist from '@/assets/projects/artist.webp';
import maszyna_reloaded from '@/assets/projects/maszyna_reloaded.webp';
import godocik_img from '@/assets/projects/godocik.webp'
import VLazyImage from "v-lazy-image";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faTypescript,
    faReact,
    faVuejs,
    faPhp,
    faUnity,
    faNodeJs,
    faDocker,
    faSass,
    faJs,
    faHtml5,
    faCss3Alt,
    faGitAlt,
    faDiscord,
    faLinkedin,
    faTailwindCss
} from "@fortawesome/free-brands-svg-icons";
import {
    faCode,
    faGamepad,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const { t } = useI18n();
const goTo = (url: string) => {
    window.open(url, '_blank');
};
const oldWebsitePicRef = ref<HTMLPictureElement | null>(null);
const maszynaReloadedPicRef = ref<HTMLPictureElement | null>(null);

useLazyLoad(oldWebsitePicRef);
useLazyLoad(maszynaReloadedPicRef);

</script>

<template>
    <div class="w-full max-w-7xl mx-auto py-8">
        <!-- Hero Section -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div class="md:w-1/2">
                <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-4">{{ t('home.hero.greeting') }}</h1>
                <h2 class="text-2xl md:text-3xl font-medium text-white mb-6">{{ t('home.hero.title') }}</h2>
                <div class="flex gap-4">
                    <Button variant="primary" @click="router.push('/projects')" size="lg">
                        {{ t('home.hero.viewProjects') }}
                    </Button>
                    <Button variant="primary" @click="router.push('/contact')" outline size="lg">
                        {{ t('home.hero.contactMe') }}
                    </Button>
                </div>
            </div>
        </div>

        <!-- About Me Section -->
        <Tile :title="t('home.aboutMe.title')" class="mb-12">
            <template #default>
                <div class="space-y-4">
                    <p class="text-gray-900 dark:text-white text-lg">
                        {{ t('home.aboutMe.paragraph1') }}
                    </p>
                    <p class="text-gray-900 dark:text-white text-lg">
                        {{ t('home.aboutMe.paragraph2') }} <a href="https://github.com/jezsonic" class="text-blue-600 hover:text-blue-500">on GitHub</a>.
                    </p>
                    <p class="text-gray-900 dark:text-white text-lg">
                        {{ t('home.aboutMe.paragraph3') }}
                    </p>
                </div>
            </template>
        </Tile>

        <!-- Featured Projects -->
        <Tile :title="t('home.projects.title')" class="mb-12">
            <template #default>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div v-once class="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
                        <a href="https://artist.com.pl" target="_blank" rel="noopener">
                            <v-lazy-image :src="artist" class="w-full h-48 object-cover" alt="Artist.com.pl"/>
                        </a>
                        <div class="p-4">
                            <a href="https://artist.com.pl" target="_blank" rel="noopener" class="text-xl font-semibold text-blue-500 mb-2">
                                {{ t('commissionsView.projects.artist.title') }}
                            </a>
                            <p class="text-gray-600 dark:text-white mb-4">{{ t('commissionsView.projects.artist.description') }}</p>
                            <div class="flex gap-2 flex-wrap">
                                <Badge text="Next.js" :icon="faReact" color="sky" link="https://nextjs.org/"/>
                            </div>
                        </div>
                    </div>
                    <div v-once class="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
                        <a href="https://github.com/MaSzyna-Reloaded" target="_blank" rel="noopener">
                            <v-lazy-image :src="maszyna_reloaded" class="w-full h-48 object-cover" alt="Maszyna Reloaded Screenshot"/>
                        </a>
                        <div class="p-4">
                            <a href="https://github.com/MaSzyna-Reloaded" target="_blank" rel="noopener" class="text-xl font-semibold text-blue-500 mb-2">
                                {{ t('home.projects.maszynaReloaded.title') }}
                            </a>
                            <p class="text-gray-600 dark:text-white mb-4">{{ t('home.projects.maszynaReloaded.description') }}</p>
                            <div class="flex gap-2 flex-wrap">
                                <Badge text="C++" :icon="faCode" color="blue" />
                                <Badge text="GDScript" :icon="faCode" color="sky" />
                                <Badge text="Godot Engine" :icon="faGamepad" color="sky" link="https://godotengine.org/" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-center flex justify-center gap-4">
                    <Button variant="primary" @click="router.push('/projects')" size="lg">
                        {{ t('home.projects.viewAll') }}
                    </Button>
                </div>
            </template>
        </Tile>

        <!-- Skills Section -->
        <Tile :title="t('home.skills.title')" class="mb-12" :badges="true">
            <template #default>
                <p class="text-gray-900 dark:text-white text-lg mb-6">
                    {{ t('home.skills.description') }}
                </p>
            </template>
            <template #badges>
                <div v-once class="flex flex-wrap gap-3 mt-4">
                    <Badge text="TypeScript" :icon="faTypescript" color="blue" link="https://www.typescriptlang.org/" />
                    <Badge text="Vue.js" :icon="faVuejs" color="emerald" link="https://vuejs.org/" />
                    <Badge text="PHP" :icon="faPhp" color="indigo" link="https://www.php.net/" />
                    <Badge text="Godot Engine" :icon="faGamepad" color="sky" link="https://godotengine.org/" />
                    <Badge text="Unity Engine" :icon="faUnity" color="gray" link="https://unity.com/" />
                    <Badge text="Node.js" :icon="faNodeJs" color="green" link="https://nodejs.org/"/>
                    <Badge text="Docker" :icon="faDocker" color="blue" link="https://www.docker.com/" />
                    <Badge text="SCSS" :icon="faSass" color="pink" link="https://sass-lang.com/" />
                    <Badge text="JavaScript" :icon="faJs" color="yellow" />
                    <Badge text="HTML5" :icon="faHtml5" color="orange" />
                    <Badge text="Next.js" :icon="faReact" color="sky" link="https://nextjs.org/"/>
                    <Badge text="CSS3" :icon="faCss3Alt" color="blue" />
                    <Badge text="TailwindCSS" :icon="faTailwindCss" color="sky" link="https://tailwindcss.com/" />
                    <Badge text="Git" :icon="faGitAlt" color="red" link="https://git-scm.com/" />
                </div>
            </template>
        </Tile>

        <!-- Contact & Discord Section -->
        <div class="flex flex-col md:flex-row gap-6 mb-12">
            <Tile :title="t('home.contact.title')" class="flex-1">
                <template #default>
                    <p class="text-gray-900 dark:text-white text-lg mb-6">
                        {{ t('home.contact.description') }}
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <router-link to="/contact"
                                     class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <font-awesome-icon :icon="faDiscord" class="w-6 h-6 text-gray-900 dark:text-white" />
                            <span class="text-gray-900 dark:text-white">{{ t('home.contact.discord') }}</span>
                        </router-link>
                        <router-link to="/contact"
                                     class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <font-awesome-icon :icon="faEnvelope" class="w-6 h-6 text-gray-900 dark:text-white" />
                            <span class="text-gray-900 dark:text-white">{{ t('home.contact.email') }}</span>
                        </router-link>
                        <router-link to="/contact"
                                     class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <font-awesome-icon :icon="faLinkedin" class="w-6 h-6 text-gray-900 dark:text-white" />
                            <span class="text-gray-900 dark:text-white">{{ t('home.contact.linkedin') }}</span>
                        </router-link>
                    </div>
                </template>
            </Tile>

            <Tile :title="t('home.discordAd.title')" class="flex-1 bg-position-[50%_30%]!" :background-image="godocik_img">
                <template #default>
                    <i18n-t keypath="home.discordAd.description" tag="p" class="text-white text-lg mb-6">
                        <template #link>
                            <a href="https://godocik.pl" target="_blank" rel="noopener" class="text-blue-300 hover:text-blue-200 font-semibold underline">godocik.pl</a>
                        </template>
                    </i18n-t>
                    <div class="flex flex-wrap gap-4">
                        <Button variant="primary" @click="goTo('https://godocik.pl')" size="md" class="flex items-center gap-2">
                            <font-awesome-icon :icon="faDiscord" />
                            {{ t('home.discordAd.button') }}
                        </Button>
                    </div>
                </template>
            </Tile>
        </div>
    </div>
</template>