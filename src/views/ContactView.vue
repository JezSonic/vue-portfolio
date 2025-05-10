<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import mail_img from '@/assets/img/core-img/gmail_new.webp'
import discord_img from '@/assets/img/core-img/discord.webp'
import telegram_img from '@/assets/img/core-img/telegram.webp'
import LinkedInProfileCard from "@/components/linkedIn/LinkedInProfileCard.vue";
</script>

<template>
    <div class="w-auto">
        <Tile title="Contact me">
            <p class="text-white">
                I have listed there all possible ways to contact me. Feel welcome to use any of them!
            </p>
        </Tile>
        <div class="grid gap-4 my-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            <Tile title="Discord" :background-image="discord_img" hover-shadow-color="#00459280">
                <h3 class="text-white">Discord username: dos_cutey</h3>
                <h5 class="text-white">Old nickname: DoS#5905</h5>
            </Tile>
            <Tile title="Email" hover-shadow-color="#92550066" :background-image="mail_img">
                <p class="text-white">Feel free to email me. I'll respond as soon as I will receive the email</p>
                <a class="font-semibold text-blue-600 hover:text-blue-500" href="mailto:karoltomaszewskimusic@gmail.com">karoltomaszewskimusic@gmail.com</a>
            </Tile>

            <Tile title="Telegram" hover-shadow-color="#92550066" :background-image="telegram_img">
                <p class="text-white">I do use Telegram as well. You're welcome to contact me there too!</p>
                <a class="font-semibold text-blue-600 hover:text-blue-500" href="https://t.me/Futrzasty">@Futrzasty</a>
            </Tile>
            <LinkedInProfileCard />
        </div>
    </div>
</template>