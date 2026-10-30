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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faTypescript,
    faReact,
    faUnity,
    faDocker,
    faCss3Alt,
    faGitAlt,
    faDiscord,
    faLinkedin,
    faLaravel,
    faSymfony, faTailwindCss
} from "@fortawesome/free-brands-svg-icons";
import {
    faCode,
    faGamepad,
    faEnvelope, faDatabase
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

        <!-- Skills Section -->
        <Tile :title="t('home.skills.title')" class="mb-12" :badges="true">
            <template #default>
                <p class="text-gray-900 dark:text-white text-lg mb-6">
                    {{ t('home.skills.description') }}
                </p>
            </template>
            <template #badges>
                <div v-once class="mt-4 space-y-6">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ t('home.skills.strong') }}</h3>
                        <div class="flex flex-wrap gap-3">
                            <Badge text="Laravel" :icon="faLaravel" color="red" link="https://laravel.com/" />
                            <Badge text="Symfony" :icon="faSymfony" color="slate" link="https://symfony.com/" />
                            <Badge text="TypeScript" :icon="faTypescript" color="blue" link="https://www.typescriptlang.org/" />
                            <Badge text="CSS3" :icon="faCss3Alt" color="blue" />
                        </div>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ t('home.skills.familiar') }}</h3>
                        <div class="flex flex-wrap gap-3">
                            <Badge text="Docker" :icon="faDocker" color="blue" link="https://www.docker.com/" />
                            <Badge text="SQL" :icon="faDatabase" color="cyan" />
                            <Badge text="Git" :icon="faGitAlt" color="red" link="https://git-scm.com/" />
                            <Badge text="C++" :icon="faCode" color="blue" />
                        </div>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ t('home.skills.hobby') }}</h3>
                        <div class="flex flex-wrap gap-3">
                            <Badge text="Godot Engine" :icon="faGamepad" color="sky" link="https://godotengine.org/" />
                            <Badge text="Unity Engine" :icon="faUnity" color="gray" link="https://unity.com/" />
                        </div>
                    </div>
                </div>
            </template>
        </Tile>

        <!-- Featured Projects -->
        <Tile :title="t('home.projects.title')" class="mb-12">
            <template #default>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <Tile :background-image="artist" v-once :title="t('commissionsView.projects.artist.tileTitle')">
                        <div class="space-y-3">
                            <h4 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.artist.title') }}</h4>
                            <p class="text-white">{{ t('commissionsView.projects.artist.subtitle') }}</p>
                            <div class="flex flex-wrap gap-2 my-3">
                                <Badge text="Next.js" :icon="faReact" color="sky" link="https://nextjs.org/"/>
                                <Badge text="TailwindCSS" :icon="faTailwindCss" color="sky" link="https://tailwindcss.com/" />
                            </div>
                            <p class="text-gray-300">{{ t('commissionsView.projects.artist.description') }}</p>
                            <div class="flex justify-end mt-4">
                                <Button @click="goTo('https://artist.com.pl')" variant="primary" :text="t('commissionsView.projects.artist.viewButton')" />
                            </div>
                        </div>
                    </Tile>
                    <Tile :background-image="maszyna_reloaded" v-once :title="t('commissionsView.projects.maszyna.tileTitle')">
                        <div class="space-y-3">
                            <h4 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.maszyna.title') }}</h4>
                            <p class="text-white">{{ t('commissionsView.projects.maszyna.subtitle') }}</p>
                            <div class="flex flex-wrap gap-2 my-3">
                                <Badge text="C++" :icon="faCode" color="blue" />
                                <Badge text="GDScript" :icon="faCode" color="sky" />
                                <Badge text="Godot Engine" :icon="faGamepad" color="sky" link="https://godotengine.org/" />
                            </div>
                            <p class="text-gray-300">{{ t('commissionsView.projects.maszyna.description') }}</p>
                            <div class="flex justify-end mt-4">
                                <Button @click="goTo('https://github.com/MaSzyna-Reloaded')" variant="primary" :text="t('commissionsView.projects.maszyna.viewButton')" />
                            </div>
                        </div>
                    </Tile>
                </div>
                <div class="mt-6 text-center flex justify-center gap-4">
                    <Button variant="primary" @click="router.push('/projects')" size="lg">
                        {{ t('home.projects.viewAll') }}
                    </Button>
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
                            <a href="https://godocik.pl" target="_blank" rel="noopener" class="text-blue-300 hover:text-blue-200 font-semibold underline">Godocik</a>
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