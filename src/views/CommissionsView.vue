<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import Button from "@/components/ui/Button.vue";
import router from "@/router";
import artist from '@/assets/img/core-img/artist.png'
import old_website from '@/assets/img/core-img/oldwebsite.png'
import ciasteczkowo from '@/assets/img/core-img/ciasteczkowo.png'
import maszyna_reloaded from '@/assets/img/core-img/maszyna_reloaded.webp'
</script>

<template>
    <div class="w-auto gap-4">
        <Tile title="About me">
            <template #default>
                <p class="text-white">
                    I agree on the prices individually with the client.
                    For payment, and more information, please, reach out to me on discord: dos_cutey (old: DoS#5905) or telegram of mine - <a href="https://t.me/Futrzasty" target="_blank" rel="noopener noreferrer">@Futrzasty</a>
                </p>
                <p class="text-white">
                    By hiring me to do work, You agree to my ToS.
                </p>
                <Button @click="router.push('/commissions/tos')" text="Terms of Service" />
            </template>
        </Tile>
        <div class="grid gap-4 my-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <Tile title="Old website" :background-image="old_website" hover-shadow-color="#00459280">
                <h4 class="text-white">Older version of my website</h4>
                <p class="text-white"><i>This older version of this website is not maintained any longer</i></p>
                <p class="text-white">Technology stack: Vue, SCSS, TypeScript</p>
                <div class="flex justify-end">
                    <Button :text="undefined">
                        <a class="a__clear" href="https://old-newdev.web.app" rel="noopener noreferrer" target="_blank">Old website</a>
                    </Button>
                </div>
            </Tile>
            <Tile title="Artist.pl" :background-image="artist" hover-shadow-color="#f7af3260">
                <h4 class="text-white">Website for Artist - Biuro tłumaczeń I Szkoła języków obcych in Dębica</h4>
                <p class="text-white">Technology stack: React.js, WordPress</p>
                <div class="flex justify-end">
                    <Button :text="undefined">
                        <a class="a__clear" href="https://artist.com.pl" rel="noopener noreferrer" target="_blank">artist.com.pl</a>
                    </Button>
                </div>
            </Tile>
            <Tile title="Ciasteczkowo" :background-image="ciasteczkowo" hover-shadow-color="#FFFFFF60">
                <h4 class="text-white">Blog about cakes</h4>
                <p class="text-white">Technology stack: Next.js, HyGraph, tailwind CSS</p>
                <div class="flex justify-end">
                    <Button :text="undefined">
                        <a class="a__clear" href="https://ciasteczkowo.vercel.app" rel="noopener noreferrer" target="_blank">Ciasteczkowo</a>
                    </Button>
                </div>
            </Tile>
            <Tile title="MaSzyna: Reloaded" :background-image="maszyna_reloaded" hover-shadow-color="#70685b">
                <h4 class="text-white">Port of MaSzyna Train Simulator into Godot Engine</h4>
                <p class="text-white">Technology stack: C++, GDScript, Godot Engine</p>
                <div class="flex justify-end">
                    <Button :text="undefined">
                        <a class="a__clear" href="https://github.com/MaSzyna-Reloaded" rel="noopener noreferrer" target="_blank">GitHub organization</a>
                    </Button>
                </div>
            </Tile>
        </div>
    </div>
</template>