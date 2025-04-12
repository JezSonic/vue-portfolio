<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import settings from "../../data/settings";
import mail_img from '@/assets/img/core-img/gmail_new.webp'
import discord_img from '@/assets/img/core-img/discord.webp'
import telegram_img from '@/assets/img/core-img/telegram.webp'
import LinkedInProfileCard from "@/components/linkedIn/LinkedInProfileCard.vue";


</script>

<template>
    <div class="container" :style="{ gap: settings.gap_size }">
        <Tile title="Contact me" v-motion-pop-visible-once>
            <p>
                I have listed there all possible ways to contact me. Feel welcome to use any of them!
            </p>
        </Tile>
        <div class="tile-separator">
            <Tile title="Discord" v-motion-slide-visible-left :background-image="discord_img" hover-shadow-color="#00459280">
                <h3>Discord username: dos_cutey</h3>
                <h5>Old nickname: DoS#5905</h5>
            </Tile>
            <Tile v-motion-slide-visible-bottom title="Email" hover-shadow-color="#92550066" :background-image="mail_img">
                <p>Feel free to email me. I'll respond as soon as I will receive the email</p>
                <a href="mailto:karoltomaszewskimusic@gmail.com">karoltomaszewskimusic@gmail.com</a>
            </Tile>

            <Tile v-motion-slide-visible-bottom title="Telegram" hover-shadow-color="#92550066" :background-image="telegram_img">
                <p>I do use telegram as well. You're welcome to contact me there too!</p>
                <a href="https://t.me/Futrzaty">@Futrzasty</a>
            </Tile>
            <LinkedInProfileCard />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container {
        width: 100%;
    }

    .tile-separator {
        margin-top: 12px;
        grid-template-columns: calc(33% - 6px) calc(33% - 6px) calc(33% - 6px);
        display: grid;
        gap: 18px;
        justify-content: space-between;
        align-items: stretch;
        align-content: stretch;
        justify-items: stretch;
    }

    .button-container {
        display: flex;
        justify-content: flex-end;
    }
    @media (max-width: 1550px) and (min-width: 1201px) {
        .container {
            width: 90%;
        }
    }

    @media (max-width: 1200px) {
        .container {
            width: 90%;
        }

        .tile-separator {
            margin-top: 12px;
            grid-template-columns: 1fr;
            gap: 12px;
            display: grid;
            justify-content: space-between;
            align-items: stretch;
            align-content: stretch;
            justify-items: stretch;
        }
    }
</style>