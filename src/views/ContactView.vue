<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import mail_img from '@/assets/img/social/gmail.webp'
import discord_img from '@/assets/img/social/discord.webp'
import telegram_img from '@/assets/img/social/telegram.webp'
import img from '@/assets/profile/linkedin_avatar.webp'
import { useI18n } from "vue-i18n";
import Button from "@/components/ui/Button.vue";

const { t } = useI18n();
const goTo = (url: string) => {
    window.location.href = url
}
</script>

<template>
    <div class="container mx-auto px-4 py-6 sm:py-8">
        <Tile :title="t('contactView.getInTouch.title')" class="mb-8">
            <p class="text-white text-base sm:text-lg mb-4">
                {{ t('contactView.getInTouch.paragraph1') }}
            </p>
            <p class="text-white text-base sm:text-lg">
                {{ t('contactView.getInTouch.paragraph2') }}
            </p>
        </Tile>

        <div class="contact-grid">
            <!-- LinkedIn Card -->
            <Tile :title="t('contactView.linkedin.title')" text-class="flex flex-col h-full" hover-shadow-color="#0a66c280">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex items-start mb-4">
                        <img class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-transparent mr-3" :src="img" :alt="t('contactView.linkedin.name')">
                        <div>
                            <h3 class="text-white font-medium text-base sm:text-lg">{{ t('contactView.linkedin.name') }}</h3>
                            <p class="text-gray-300 text-sm sm:text-base">{{ t('contactView.linkedin.school') }}</p>
                            <p class="text-gray-300 text-sm sm:text-base">{{ t('contactView.linkedin.company') }}</p>
                        </div>
                    </div>
                    <Button variant="primary" @click="goTo('https://linkedin.com/in/karol-tomaszewski-91671423b')">
                        {{ t('contactView.linkedin.viewProfile') }}
                    </Button>
                </div>
            </Tile>

            <!-- Email Card -->
            <Tile :title="t('contactView.email.title')" text-class="flex flex-col h-full" hover-shadow-color="#92550066" :background-image="mail_img">
                <div class="flex flex-col justify-between h-full">
                    <p class="!text-white mb-4">{{ t('contactView.email.description') }}</p>
                    <div class="flex flex-col sm:flex-row items-start sm:items-center">
                        <Button variant="primary" @click="goTo('mailto:karoltomaszewskimusic@gmail.com')">
                            {{ t('contactView.email.sendButton') }}
                        </Button>
                        <span class="mt-2 sm:mt-0 sm:ml-3 !text-gray-300 break-all">karoltomaszewskimusic@gmail.com</span>
                    </div>
                </div>
            </Tile>

            <!-- Discord Card -->
            <Tile :title="t('contactView.discord.title')" text-class="flex flex-col h-full" :background-image="discord_img" hover-shadow-color="#00459280">
                <div class="flex flex-col justify-between h-full">
                    <p class="!text-white mb-4">{{ t('contactView.discord.description') }}</p>
                    <div class="!bg-gray-700 p-3 rounded-lg inline-block shrink-0 max-w-max overflow-x-auto">
                        <h3 class="!text-white font-medium">{{ t('contactView.discord.username') }}: dos_cutey</h3>
                        <h5 class="!text-gray-300 text-sm">{{ t('contactView.discord.previous') }}: DoS#5905</h5>
                    </div>
                </div>
            </Tile>

            <!-- Telegram Card -->
            <Tile :title="t('contactView.telegram.title')" text-class="flex flex-col h-full" hover-shadow-color="#92550066" :background-image="telegram_img">
                <div class="flex flex-col justify-between h-full">
                    <p class="!text-white mb-4">{{ t('contactView.telegram.description') }}</p>
                    <div class="flex flex-col sm:flex-row items-start sm:items-center">
                        <Button variant="primary" @click="goTo('https://t.me/Futrzasty')">
                            {{ t('contactView.telegram.messageButton') }}
                        </Button>
                        <span class="mt-2 sm:mt-0 sm:ml-3 !text-gray-300">@Futrzasty</span>
                    </div>
                </div>
            </Tile>
        </div>
    </div>
</template>

<style scoped lang="scss">
.contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }
}
</style>
