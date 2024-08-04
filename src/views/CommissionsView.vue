<script setup lang="ts">
import Tile from "@/components/Tile.vue";
import settings from "../../data/settings";
import Button from "@/components/Button.vue";
import router from "@/router";
import artist from '@/assets/img/core-img/artist.png'
import oldwebsite from '@/assets/img/core-img/oldwebsite.png'
import ciasteczkowo from '@/assets/img/core-img/ciasteczkowo.png'
</script>

<template>
    <div class="container" :style="{ gap: settings.gap_size }">
        <h1>Commissions</h1>
        <Tile title="About me" v-motion-pop-visible-once>
            <template #default>
                <p>
                    I agree the prices individually with the client.
                    For payment, and more information, please, reach out to me on discord: dos_cutey (old: DoS#5905) or telegram of mine - <a href="https://t.me/Futrzasty" target="_blank" rel="noopener noreferrer">@Futrzasty</a>
                </p>
                <p>
                    By hiring me to do work, You agree to my ToS.
                </p>
                <Button @click="router.push('/commissions/tos')" text="Terms of Service" />
            </template>
        </Tile>
        <h2>Projects</h2>
        <div class="grid">
            <Tile title="Old website" v-motion-slide-visible-left :background-image="oldwebsite" hover-shadow-color="#00459280">
                <h4>Older version of my website</h4>
                <p>Technology stack: Vue, SCSS, TypeScript</p>
                <div class="button-container">
                    <Button :text="undefined">
                        <a class="a__clear" href="https://old-newdev.web.app" rel="noopener noreferrer" target="_blank">Old website</a>
                    </Button>
                </div>
            </Tile>
            <Tile title="Artist.pl" v-motion-slide-visible-right :background-image="artist" hover-shadow-color="#f7af3260">
                <h4>Website for Artist - Biuro tłumaczeń I Szkoła języków obcych in Dębica</h4>
                <p>Technology stack: React.js, WordPress</p>
                <div class="button-container">
                    <Button :text="undefined">
                        <a class="a__clear" href="https://artist.com.pl" rel="noopener noreferrer" target="_blank">artist.com.pl</a>
                    </Button>
                </div>
            </Tile>
            <Tile title="Ciasteczkowo" v-motion-slide-visible-left :background-image="ciasteczkowo" hover-shadow-color="#FFFFFF60">
                <h4>Blog about cakes</h4>
                <p>Technology stack: Next.js, HyGraph, tailwind CSS</p>
                <div class="button-container">
                    <Button :text="undefined">
                        <a class="a__clear" href="https://ciasteczkowo.vercel.app" rel="noopener noreferrer" target="_blank">Ciasteczkowo</a>
                    </Button>
                </div>
            </Tile>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container {
        width: 100%;
    }

    .tile-separator {
        margin-top: 12px;
        grid-template-columns: calc(50% - 6px) calc(50% - 6px);
        display: grid;
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

    .grid {
        display: grid;
        grid-template-columns: 49% 49%;
        gap: 24px;
        justify-content: center;
    }
    @media (min-width: 1771px) and (max-width: 1600px) {
        .grid {
            grid-template-columns: 80%;
        }
    }
    @media (min-width: 651px) and (max-width: 1170px) {
        .grid {
            grid-template-columns: 80%;
        }
    }
    @media (max-width: 650px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>