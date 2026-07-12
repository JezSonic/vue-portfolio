<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import Button from "@/components/ui/Button.vue";
import router from "@/router";
import Badge from "@/components/badges/Badge.vue";
import old_website from '@/assets/projects/oldwebsite.webp';
import maszyna_reloaded from '@/assets/projects/maszyna_reloaded.webp';
import artist from '@/assets/projects/artist.webp';
import irenka from "@/assets/projects/irenka.webp"
import gladosWebChat from "@/assets/projects/glados-web-chat.webp"
import acServerManager from '@/assets/projects/ac_server_manager.webp';
import { useI18n } from "vue-i18n";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faDiscord,
    faTelegram,
    faReact,
    faVuejs,
    faSass,
    faTailwindCss, faTypescript, faPython, faRust, faDocker
} from "@fortawesome/free-brands-svg-icons";
import {
    faCode,
    faGamepad, faPlug, faTerminal
} from "@fortawesome/free-solid-svg-icons";

const { t } = useI18n();

const goTo = (url: string) => {
    window.open(url, '_blank')
}
</script>

<template>
    <div class="w-full max-w-7xl mx-auto py-8">
        <!-- Hero Section -->
        <div class="mb-12 text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-4">{{ t('commissionsView.hero.title') }}</h1>
            <p class="text-lg text-white max-w-3xl mx-auto">
                {{ t('commissionsView.hero.description') }}
            </p>
        </div>

        <!-- Commission Information -->
        <Tile :title="t('commissionsView.info.title')" class="mb-12">
            <template #default>
                <div class="space-y-4">
                    <p class="text-gray-900 dark:text-white text-lg">
                        {{ t('commissionsView.info.paragraph1') }}
                    </p>
                    <p class="text-gray-900 dark:text-white text-lg">
                        {{ t('commissionsView.info.paragraph2') }}
                    </p>

                    <div v-once class="flex flex-wrap gap-4 mt-4">
                        <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <font-awesome-icon :icon="faDiscord" class="w-6 h-6 text-gray-900 dark:text-white" />
                            <span class="text-gray-900 dark:text-white">{{ t('commissionsView.info.discord') }}: <span class="font-semibold">dos_cutey</span></span>
                        </div>
                        <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <font-awesome-icon :icon="faTelegram" class="w-6 h-6 text-gray-900 dark:text-white" />
                            <a class="text-blue-500 hover:text-blue-400 font-semibold" 
                               href="https://t.me/Futrzasty" target="_blank" rel="noopener noreferrer">@Futrzasty</a>
                        </div>
                    </div>
                </div>
            </template>
        </Tile>

        <!-- Projects Section -->
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 mb-6">{{ t('commissionsView.projects.title') }}</h2>
            <div class="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <Tile :background-image="acServerManager" v-once :title="t('commissionsView.projects.acServerManager.tileTitle')">
                    <div class="space-y-3">
                        <h4 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.acServerManager.title') }}</h4>
                        <p class="text-white">{{ t('commissionsView.projects.acServerManager.subtitle') }}</p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Rust" :icon="faRust" color="orange" link="https://www.rust-lang.org/" />
                            <Badge text="Qt/QML" :icon="faCode" color="emerald" link="https://www.qt.io/" />
                            <Badge text="Docker" :icon="faDocker" color="blue" link="https://www.docker.com/" />
                            <Badge text="SSH" :icon="faTerminal" color="gray" />
                        </div>
                        <p class="text-gray-300">{{ t('commissionsView.projects.acServerManager.description') }}</p>
                        <div class="flex justify-end mt-4">
                            <Button @click="goTo('https://github.com/JezSonic/ac-cloud-server-manager')" variant="primary" :text="t('commissionsView.projects.acServerManager.viewButton')" />
                        </div>
                    </div>
                </Tile>
                <Tile :background-image="gladosWebChat" v-once :title="t('commissionsView.projects.gladosWebApp.tileTitle')">
                    <div class="space-y-3">
                        <h4 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.gladosWebApp.title') }}</h4>
                        <p class="text-white">{{ t('commissionsView.projects.gladosWebApp.subtitle') }}</p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Next.js" :icon="faReact" color="sky" link="https://nextjs.org/"/>
                            <Badge text="TypeScript" :icon="faTypescript" color="blue" link="https://www.typescriptlang.org/" />
                            <Badge text="TailwindCSS" :icon="faTailwindCss" color="sky" link="https://tailwindcss.com/" />
                            <Badge text="Python" :icon="faPython" color="yellow" link="https://www.python.org/" />
                            <Badge text="WebSockets" :icon="faPlug" color="sky" link="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" />
                        </div>
                        <p class="text-gray-300">{{ t('commissionsView.projects.gladosWebApp.description') }}</p>
                        <div class="flex justify-end mt-4">
                            <Button @click="goTo('https://glados-web-chat.web.app/')" variant="primary" :text="t('commissionsView.projects.gladosWebApp.viewButton')" />
                        </div>
                    </div>
                </Tile>
                <Tile :background-image="irenka" v-once :title="t('commissionsView.projects.irenka.tileTitle')">
                    <div class="space-y-3">
                        <h4 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.irenka.title') }}</h4>
                        <p class="text-white">{{ t('commissionsView.projects.irenka.subtitle') }}</p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Next.js" :icon="faReact" color="sky" link="https://nextjs.org/"/>
                            <Badge text="TypeScript" :icon="faTypescript" color="blue" link="https://www.typescriptlang.org/" />
                            <Badge text="TailwindCSS" :icon="faTailwindCss" color="sky" link="https://tailwindcss.com/" />
                        </div>
                        <p class="text-gray-300">{{ t('commissionsView.projects.irenka.description') }}</p>
                        <div class="flex justify-end mt-4">
                            <Button @click="goTo('https://irenka-511e7.web.app/')" variant="primary" :text="t('commissionsView.projects.irenka.viewButton')" />
                        </div>
                    </div>
                </Tile>
                <Tile :background-image="old_website" v-once text-class="h-full" :title="t('commissionsView.projects.oldWebsite.tileTitle')">
                    <div class="flex flex-col justify-between h-full pb-6">
                        <div class="space-y-3">
                            <h4 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.oldWebsite.title') }}</h4>
                            <p class="text-white"><i>{{ t('commissionsView.projects.oldWebsite.subtitle') }}</i></p>
                            <div class="flex flex-wrap gap-2 my-3">
                                <Badge text="Vue.js" :icon="faVuejs" color="emerald" link="https://vuejs.org/" />
                                <Badge text="SCSS" :icon="faSass" color="pink" link="https://sass-lang.com/" />
                                <Badge text="TypeScript" :icon="faTypescript" color="blue" link="https://www.typescriptlang.org/" />
                            </div>
                            <p class="text-gray-300">{{ t('commissionsView.projects.oldWebsite.description') }}</p>
                        </div>
                        <div class="flex justify-end mt-4">
                            <Button @click="goTo('https://old-newdev.web.app')" variant="primary" :text="t('commissionsView.projects.oldWebsite.viewButton')" />
                        </div>
                    </div>
                </Tile>

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
                <Tile :background-image="maszyna_reloaded" v-once :title="t('commissionsView.projects.maszyna.tileTitle') ">
                    <div class="space-y-3">
                        <h4 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.maszyna.title') }}</h4>
                        <p class="text-white">{{ t('commissionsView.projects.maszyna.subtitle') }}</p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="C++" :icon="faCode" color="blue" />
                            <Badge text="Godot Engine" :icon="faGamepad" color="sky" link="https://godotengine.org/" />
                        </div>
                        <p class="text-gray-300">{{ t('commissionsView.projects.maszyna.description') }}</p>
                        <div class="flex justify-end mt-4">
                            <Button @click="goTo('https://github.com/MaSzyna-Reloaded')" variant="primary" :text="t('commissionsView.projects.maszyna.viewButton')" />
                        </div>
                    </div>
                </Tile>
            </div>
        </div>

        <!-- Unfinished projects Section -->
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 mb-6">Unfinished projects</h2>
            <div class="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <Tile v-once title="Foxy Adventure">
                    <div class="space-y-3">
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Godot Engine" :icon="faGamepad" color="sky" link="https://godotengine.org/" />
                        </div>
                        <p class="text-gray-600 dark:text-gray-300">
                            Small platformer game with a blue fox as a main character, where you have to fight monsters and collect treasures.
                        </p>
                        <div class="flex justify-end mt-4">
                            <Button @click="goTo('https://github.com/NewDEV-github/Foxy-Adventure')" variant="primary" :text="t('commissionsView.projects.irenka.viewButton')" />
                        </div>
                    </div>
                </Tile>

                <Tile v-once title="RCKU Stories">
                    <div class="space-y-3">
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Godot Engine" :icon="faGamepad" color="sky" link="https://godotengine.org/" />
                        </div>
                            <p class="text-gray-600 dark:text-gray-300">RPG-like game concept localised in school with pixel-art style and adventure elements</p>
                        <div class="flex justify-end mt-4">
                            <Button @click="goTo('https://github.com/NewDEV-github/RCKU-Stories')" variant="primary" :text="t('commissionsView.projects.maszyna.viewButton')" />
                        </div>
                    </div>
                </Tile>

                <Tile v-once title="Super Duper Disco">
                    <div class="space-y-3">
                        <p class="text-gray-900 dark:text-white!">Small game made for <a class="text-blue-500 hover:text-blue-400 font-semibold" href="https://itch.io/jam/godocikowy-dzem-4">Godocikowy Dżem #4</a></p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Godot Engine" :icon="faGamepad" color="sky" link="https://godotengine.org/" />
                        </div>
                        <p class="text-gray-600 dark:text-gray-300">Inspired by Friday Night Funkin' - local multiplayer game where you have to press keys in time</p>
                        <div class="flex justify-end mt-4">
                            <Button @click="goTo('https://github.com/NewDEV-github/super-duper-disco')" variant="primary" :text="t('commissionsView.projects.oldWebsite.viewButton')" />
                        </div>
                    </div>
                </Tile>

                <Tile v-once title="Furry Potato">
                    <div class="space-y-3">
                        <p class="text-gray-900 dark:text-white!">Small game made for <a class="text-blue-500 hover:text-blue-400 font-semibold" href="https://itch.io/jam/godocikowy-dzem-5">Godocikowy Dżem #5</a></p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Godot Engine" :icon="faGamepad" color="sky" link="https://godotengine.org/" />
                        </div>
                        <p class="text-gray-600 dark:text-gray-300">Small DJ Simulator a bit mixed up with visual novel where you go up the DJ carrer ladder</p>
                        <div class="flex justify-end mt-4">
                            <Button @click="goTo('https://github.com/NewDEV-github/Furry-Potato')" variant="primary" :text="t('commissionsView.projects.artist.viewButton')" />
                        </div>
                    </div>
                </Tile>
            </div>
        </div>

        <!-- Contact CTA -->
        <Tile :title="t('commissionsView.cta.title')" class="mt-12">
            <template #default>
                <p class="text-gray-900 dark:text-white text-lg mb-6">
                    {{ t('commissionsView.cta.description') }}
                </p>
                <div class="flex flex-wrap gap-4">
                    <Button @click="router.push('/contact')" variant="primary" :text="t('commissionsView.cta.contactButton')" size="lg"/>
                </div>
            </template>
        </Tile>
    </div>
</template>
