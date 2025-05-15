<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import Button from "@/components/ui/Button.vue";
import router from "@/router";
import Badge from "@/components/badges/Badge.vue";
import artist from '@/assets/projects/artist.png'
import old_website from '@/assets/projects/oldwebsite.png'
import maszyna_reloaded from '@/assets/projects/maszyna_reloaded.webp'
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Hero Section -->
        <div class="mb-12 text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-4">{{ t('commissionsView.hero.title') }}</h1>
            <p class="text-lg !text-gray-300 max-w-3xl mx-auto">
                {{ t('commissionsView.hero.description') }}
            </p>
        </div>

        <!-- Commission Information -->
        <Tile :title="t('commissionsView.info.title')" class="mb-12">
            <template #default>
                <div class="space-y-4">
                    <p class="text-white text-lg">
                        {{ t('commissionsView.info.paragraph1') }}
                    </p>
                    <p class="text-white text-lg">
                        {{ t('commissionsView.info.paragraph2') }}
                    </p>

                    <div class="flex flex-wrap gap-4 my-4">
                        <div class="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg">
                            <font-awesome-icon icon="fa-brands fa-discord" class="w-6 h-6 text-white" />
                            <span class="text-white">{{ t('commissionsView.info.discord') }}: <span class="font-semibold">dos_cutey</span></span>
                        </div>
                        <div class="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg">
                            <font-awesome-icon icon="fa-brands fa-telegram" class="w-6 h-6 text-white" />
                            <a class="text-blue-500 hover:text-blue-400 font-semibold" 
                               href="https://t.me/Futrzasty" target="_blank" rel="noopener noreferrer">@Futrzasty</a>
                        </div>
                    </div>

                    <div class="bg-gray-700 p-4 rounded-lg mt-4">
                        <p class="text-white mb-2">
                            {{ t('commissionsView.info.tos.agreement') }}
                        </p>
                        <Button @click="router.push('/commissions/tos')" :text="t('commissionsView.info.tos.viewButton')" />
                    </div>
                </div>
            </template>
        </Tile>

        <!-- Projects Section -->
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 mb-6">{{ t('commissionsView.projects.title') }}</h2>
            <div class="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <Tile :title="t('commissionsView.projects.oldWebsite.tileTitle')" :background-image="old_website" hover-shadow-color="#00459280">
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.oldWebsite.title') }}</h3>
                        <p class="!text-white"><i>{{ t('commissionsView.projects.oldWebsite.subtitle') }}</i></p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Vue" icon="fa-vuejs" bg_color="#42b883" />
                            <Badge text="SCSS" icon="fa-sass" bg_color="#cd6799" />
                            <Badge text="TypeScript" icon="fa-code" bg_color="#3178c6" />
                        </div>
                        <p class="!text-gray-300">{{ t('commissionsView.projects.oldWebsite.description') }}</p>
                        <div class="flex justify-end mt-4">
                            <a href="https://old-newdev.web.app" rel="noopener noreferrer" target="_blank"
                               class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 !text-white font-medium rounded-lg transition-colors">
                                {{ t('commissionsView.projects.oldWebsite.viewButton') }}
                            </a>
                        </div>
                    </div>
                </Tile>

                <Tile :title="t('commissionsView.projects.artist.tileTitle')" :background-image="artist" hover-shadow-color="#f7af3260">
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.artist.title') }}</h3>
                        <p class="!text-white">{{ t('commissionsView.projects.artist.subtitle') }}</p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="React" icon="fa-react" bg_color="#61dafb" text_color="#000" />
                        </div>
                        <p class="!text-gray-300">{{ t('commissionsView.projects.artist.description') }}</p>
                        <div class="flex justify-end mt-4">
                            <a href="https://artist.com.pl" rel="noopener noreferrer" target="_blank"
                               class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 !text-white font-medium rounded-lg transition-colors">
                                {{ t('commissionsView.projects.artist.viewButton') }}
                            </a>
                        </div>
                    </div>
                </Tile>

                <Tile :title="t('commissionsView.projects.maszyna.tileTitle')" :background-image="maszyna_reloaded" hover-shadow-color="#70685b">
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-blue-500">{{ t('commissionsView.projects.maszyna.title') }}</h3>
                        <p class="!text-white">{{ t('commissionsView.projects.maszyna.subtitle') }}</p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="C++" icon="fa-code" bg_color="#00599c" />
                            <Badge text="GDScript" icon="fa-code" bg_color="#478cbf" />
                            <Badge text="Godot" icon="fa-gamepad" bg_color="#478cbf" />
                        </div>
                        <p class="!text-gray-300">{{ t('commissionsView.projects.maszyna.description') }}</p>
                        <div class="flex justify-end mt-4">
                            <a href="https://github.com/MaSzyna-Reloaded" rel="noopener noreferrer" target="_blank"
                               class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 !text-white font-medium rounded-lg transition-colors">
                                {{ t('commissionsView.projects.maszyna.viewButton') }}
                            </a>
                        </div>
                    </div>
                </Tile>
            </div>
        </div>

        <!-- Contact CTA -->
        <Tile :title="t('commissionsView.cta.title')" class="mt-12">
            <template #default>
                <p class="text-white text-lg mb-6">
                    {{ t('commissionsView.cta.description') }}
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="/contact" class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 !text-white font-medium rounded-lg transition-colors">
                        {{ t('commissionsView.cta.contactButton') }}
                    </a>
                    <Button @click="router.push('/commissions/tos')" :text="t('commissionsView.cta.tosButton')" />
                </div>
            </template>
        </Tile>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
