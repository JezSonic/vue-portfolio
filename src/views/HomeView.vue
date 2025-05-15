<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import Badge from "@/components/badges/Badge.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const currentYear = new Date().getFullYear();
const yearsOfExperience = currentYear - 2023;
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Hero Section -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div class="md:w-1/2">
                <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-4">{{ t('home.hero.greeting') }}</h1>
                <h2 class="text-2xl md:text-3xl font-medium !text-gray-200 mb-6">{{ t('home.hero.title') }}</h2>
                <p class="text-lg !not-dark:text-white !text-gray-300 mb-6">
                    {{ t('home.hero.description', { years: yearsOfExperience }) }}
                </p>
                <div class="flex gap-4">
                    <a href="/commissions" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 !text-white font-medium rounded-lg transition-colors">
                        {{ t('home.hero.viewProjects') }}
                    </a>
                    <a href="/contact" class="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:!text-white font-medium rounded-lg transition-colors">
                        {{ t('home.hero.contactMe') }}
                    </a>
                </div>
            </div>
            <div class="md:w-1/2 flex justify-center">
                <img src="@/assets/profile/linkedin_avatar.webp" alt="Karol - Web Developer" class="rounded-full w-64 h-64 object-cover border-4 border-blue-600 shadow-lg">
            </div>
        </div>

        <!-- About Me Section -->
        <Tile :title="t('home.aboutMe.title')" class="mb-12">
            <template #default>
                <div class="space-y-4">
                    <p class="text-white text-lg">
                        {{ t('home.aboutMe.paragraph1', { years: yearsOfExperience }) }}
                    </p>
                    <p class="text-white text-lg">
                        {{ t('home.aboutMe.paragraph2') }}
                    </p>
                    <p class="text-white text-lg">
                        {{ t('home.aboutMe.paragraph3') }}
                    </p>
                </div>
            </template>
        </Tile>

        <!-- Skills Section -->
        <Tile :title="t('home.skills.title')" class="mb-12" :badges="true">
            <template #default>
                <p class="text-white text-lg mb-6">
                    {{ t('home.skills.description') }}
                </p>
            </template>
            <template #badges>
                <div class="flex flex-wrap gap-3 mt-4">
                    <Badge text="TypeScript" icon="fa-code" bg_color="#3178c6" />
                    <Badge text="Vue.js" icon="fa-vuejs" bg_color="#42b883" />
                    <Badge text="PHP" icon="fa-php" bg_color="#777bb3" />
                    <Badge text="Laravel" icon="fa-laravel" bg_color="#ff2d20" />
                    <Badge text="Node.js" icon="fa-node-js" bg_color="#68a063" />
                    <Badge text="Docker" icon="fa-docker" bg_color="#2496ed" />
                    <Badge text="SCSS" icon="fa-sass" bg_color="#cd6799" />
                    <Badge text="JavaScript" icon="fa-js" bg_color="#f7df1e" text_color="#000" />
                    <Badge text="HTML5" icon="fa-html5" bg_color="#e34f26" />
                    <Badge text="CSS3" icon="fa-css3-alt" bg_color="#264de4" />
                    <Badge text="Git" icon="fa-git-alt" bg_color="#f05032" />
                </div>
            </template>
        </Tile>

        <!-- Featured Projects -->
        <Tile :title="t('home.projects.title')" class="mb-12">
            <template #default>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div class="bg-gray-700 rounded-lg overflow-hidden shadow-md">
                        <img src="@/assets/projects/oldwebsite.png" alt="Project Screenshot" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="text-xl font-semibold text-blue-500 mb-2">{{ t('home.projects.previousPortfolio.title') }}</h3>
                            <p class="text-gray-300 mb-4">{{ t('home.projects.previousPortfolio.description') }}</p>
                            <div class="flex gap-2">
                                <Badge text="Vue.js" icon="fa-vuejs" bg_color="#42b883" />
                                <Badge text="CSS" icon="fa-css3-alt" bg_color="#264de4" />
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-700 rounded-lg overflow-hidden shadow-md">
                        <img src="@/assets/projects/maszyna_reloaded.webp" alt="Project Screenshot" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="text-xl font-semibold text-blue-500 mb-2">{{ t('home.projects.maszynaReloaded.title') }}</h3>
                            <p class="text-gray-300 mb-4">{{ t('home.projects.maszynaReloaded.description') }}</p>
                            <div class="flex gap-2">
                                <Badge text="C++" icon="fa-code" bg_color="#00599c" />
                                <Badge text="GDScript" icon="fa-code" bg_color="#478cbf" />
                                <Badge text="Godot" icon="fa-gamepad" bg_color="#478cbf" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-center">
                    <a href="/commissions" class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 !text-white font-medium rounded-lg transition-colors">
                        {{ t('home.projects.viewAll') }}
                    </a>
                </div>
            </template>
        </Tile>

        <!-- Contact Section -->
        <Tile :title="t('home.contact.title')">
            <template #default>
                <p class="text-white text-lg mb-6">
                    {{ t('home.contact.description') }}
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="/contact"
                       class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <font-awesome-icon icon="fa-brands fa-discord" class="w-6 h-6 text-white" />
                        <span class="text-white">{{ t('home.contact.discord') }}</span>
                    </a>
                    <a href="/contact"
                       class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <font-awesome-icon icon="fa-solid fa-envelope" class="w-6 h-6 text-white" />
                        <span class="text-white">{{ t('home.contact.email') }}</span>
                    </a>
                    <a href="/contact"
                       class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <font-awesome-icon icon="fa-brands fa-linkedin" class="w-6 h-6 text-white" />
                        <span class="text-white">{{ t('home.contact.linkedin') }}</span>
                    </a>
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
