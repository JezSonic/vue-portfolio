<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import mail_img from '@/assets/img/social/gmail.webp'
import discord_img from '@/assets/img/social/discord.webp'
import telegram_img from '@/assets/img/social/telegram.webp'
import LinkedInProfileCard from "@/components/linkedIn/LinkedInProfileCard.vue";
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <Tile title="Get in Touch">
            <p class="text-white text-lg mb-4">
                I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out through any of the following channels:
            </p>
            <p class="text-white text-lg">
                For professional inquiries, LinkedIn and Email are the best options. For quick questions or casual conversations, Discord and Telegram work great!
            </p>
        </Tile>

        <div class="mt-8 mb-4">
            <h2 class="text-2xl font-bold text-blue-600">Professional</h2>
        </div>
        <div class="grid gap-6 mb-8 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <LinkedInProfileCard />

            <Tile title="Email" text-class="flex flex-col h-full" hover-shadow-color="#92550066" :background-image="mail_img">
                <div class="flex flex-col justify-between h-full">
                    <p class="text-white mb-3">Best for detailed inquiries and professional communication. I check my email regularly and will respond promptly.</p>
                    <div class="flex items-center">
                        <a class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                           href="mailto:karoltomaszewskimusic@gmail.com">
                            Send Email
                        </a>
                        <span class="ml-3 text-gray-300">karoltomaszewskimusic@gmail.com</span>
                    </div>
                </div>
            </Tile>
        </div>

        <div class="mt-8 mb-4">
            <h2 class="text-2xl font-bold text-blue-600">Quick Contact</h2>
        </div>
        <div class="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <Tile title="Discord" text-class="flex flex-col h-full" :background-image="discord_img" hover-shadow-color="#00459280">
                <div class="flex flex-col justify-between h-full">
                    <p class="text-white mb-3">Perfect for quick questions and real-time communication. I'm active on Discord most days.</p>
                    <div class="bg-gray-700 p-3 rounded-lg inline-block shrink-0 w-max">
                        <h3 class="text-white font-medium">Username: dos_cutey</h3>
                        <h5 class="text-gray-300 text-sm">Previous: DoS#5905</h5>
                    </div>
                </div>
            </Tile>

            <Tile title="Telegram" text-class="flex flex-col h-full" hover-shadow-color="#92550066" :background-image="telegram_img">
                <div class="flex flex-col justify-between h-full">
                    <p class="text-white mb-3">Another great option for quick messages. I check Telegram regularly throughout the day.</p>
                    <div class="flex items-center">
                        <a class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                           href="https://t.me/Futrzasty" target="_blank">
                            Message on Telegram
                        </a>
                        <span class="ml-3 text-gray-300">@Futrzasty</span>
                    </div>
                </div>
            </Tile>
        </div>
    </div>
</template>
