<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import mail_img from '@/assets/img/social/gmail.webp'
import discord_img from '@/assets/img/social/discord.webp'
import telegram_img from '@/assets/img/social/telegram.webp'
import linkedin_img from '@/assets/img/social/linkedinimg.webp'
import img from '@/assets/profile/linkedin_avatar.webp'
</script>

<template>
    <div class="container mx-auto px-4 py-6 sm:py-8">
        <Tile title="Get in Touch" class="mb-8">
            <p class="text-white text-base sm:text-lg mb-4">
                I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out through any of the following channels:
            </p>
            <p class="text-white text-base sm:text-lg">
                For professional inquiries, LinkedIn and Email are the best options. For quick questions or casual conversations, Discord and Telegram work great!
            </p>
        </Tile>

        <div class="contact-grid">
            <!-- LinkedIn Card -->
            <Tile title="LinkedIn" text-class="flex flex-col h-full" hover-shadow-color="#0a66c280">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex items-start mb-4">
                        <img class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-transparent mr-3" :src="img" alt="Karol Tomaszewski">
                        <div>
                            <h3 class="text-white font-medium text-base sm:text-lg">Karol Tomaszewski</h3>
                            <p class="text-gray-300 text-sm sm:text-base">Student at Zespół Szkół nr 4 im. Mikołaja Kopernika W Dębicy</p>
                            <p class="text-gray-300 text-sm sm:text-base">Kenja K.K.</p>
                        </div>
                    </div>
                    <a class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors w-full sm:w-auto text-center"
                       href="https://pl.linkedin.com/in/karol-tomaszewski-91671423b" target="_blank">
                        View LinkedIn Profile
                    </a>
                </div>
            </Tile>

            <!-- Email Card -->
            <Tile title="Email" text-class="flex flex-col h-full" hover-shadow-color="#92550066" :background-image="mail_img">
                <div class="flex flex-col justify-between h-full">
                    <p class="text-white mb-4">Best for detailed inquiries and professional communication. I check my email regularly and will respond promptly.</p>
                    <div class="flex flex-col sm:flex-row items-start sm:items-center">
                        <a class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors w-full sm:w-auto text-center"
                           href="mailto:karoltomaszewskimusic@gmail.com">
                            Send Email
                        </a>
                        <span class="mt-2 sm:mt-0 sm:ml-3 text-gray-300 break-all">karoltomaszewskimusic@gmail.com</span>
                    </div>
                </div>
            </Tile>

            <!-- Discord Card -->
            <Tile title="Discord" text-class="flex flex-col h-full" :background-image="discord_img" hover-shadow-color="#00459280">
                <div class="flex flex-col justify-between h-full">
                    <p class="text-white mb-4">Perfect for quick questions and real-time communication. I'm active on Discord most days.</p>
                    <div class="bg-gray-700 p-3 rounded-lg inline-block shrink-0 max-w-max overflow-x-auto">
                        <h3 class="text-white font-medium">Username: dos_cutey</h3>
                        <h5 class="text-gray-300 text-sm">Previous: DoS#5905</h5>
                    </div>
                </div>
            </Tile>

            <!-- Telegram Card -->
            <Tile title="Telegram" text-class="flex flex-col h-full" hover-shadow-color="#92550066" :background-image="telegram_img">
                <div class="flex flex-col justify-between h-full">
                    <p class="text-white mb-4">Another great option for quick messages. I check Telegram regularly throughout the day.</p>
                    <div class="flex flex-col sm:flex-row items-start sm:items-center">
                        <a class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors w-full sm:w-auto text-center"
                           href="https://t.me/Futrzasty" target="_blank">
                            Message on Telegram
                        </a>
                        <span class="mt-2 sm:mt-0 sm:ml-3 text-gray-300">@Futrzasty</span>
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
