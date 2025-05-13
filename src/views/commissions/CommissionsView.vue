<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import Button from "@/components/ui/Button.vue";
import router from "@/router";
import Badge from "@/components/badges/Badge.vue";
import artist from '@/assets/projects/artist.png'
import old_website from '@/assets/projects/oldwebsite.png'
import ciasteczkowo from '@/assets/projects/ciasteczkowo.png'
import maszyna_reloaded from '@/assets/projects/maszyna_reloaded.webp'
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Hero Section -->
        <div class="mb-12 text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-4">My Projects</h1>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
                Welcome to my portfolio of web development projects. Here you'll find examples of my work, 
                showcasing my skills and experience in creating modern, functional websites.
            </p>
        </div>

        <!-- Commission Information -->
        <Tile title="Commission Information" class="mb-12">
            <template #default>
                <div class="space-y-4">
                    <p class="text-white text-lg">
                        I'm available for freelance projects and commissions. I work closely with clients to create 
                        custom solutions that meet their specific needs and requirements.
                    </p>
                    <p class="text-white text-lg">
                        I agree on the prices individually with each client based on project scope and complexity.
                        For payment details and more information, please reach out to me on:
                    </p>

                    <div class="flex flex-wrap gap-4 my-4">
                        <div class="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg">
                            <font-awesome-icon icon="fa-brands fa-discord" class="w-6 h-6 text-white" />
                            <span class="text-white">Discord: <span class="font-semibold">dos_cutey</span></span>
                        </div>
                        <div class="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg">
                            <font-awesome-icon icon="fa-brands fa-telegram" class="w-6 h-6 text-white" />
                            <a class="text-blue-500 hover:text-blue-400 font-semibold" 
                               href="https://t.me/Futrzasty" target="_blank" rel="noopener noreferrer">@Futrzasty</a>
                        </div>
                    </div>

                    <div class="bg-gray-700 p-4 rounded-lg mt-4">
                        <p class="text-white mb-2">
                            By hiring me to do work, you agree to my Terms of Service.
                        </p>
                        <Button @click="router.push('/commissions/tos')" text="View Terms of Service" />
                    </div>
                </div>
            </template>
        </Tile>

        <!-- Projects Section -->
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 mb-6">Featured Projects</h2>
            <div class="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <Tile title="Old website" :background-image="old_website" hover-shadow-color="#00459280">
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-blue-500">Previous Portfolio</h3>
                        <p class="text-white"><i>This older version of my website is no longer maintained</i></p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Vue" icon="fa-vuejs" bg_color="#42b883" />
                            <Badge text="SCSS" icon="fa-sass" bg_color="#cd6799" />
                            <Badge text="TypeScript" icon="fa-code" bg_color="#3178c6" />
                        </div>
                        <p class="text-gray-300">A previous iteration of my personal portfolio showcasing my earlier work and skills.</p>
                        <div class="flex justify-end mt-4">
                            <a href="https://old-newdev.web.app" rel="noopener noreferrer" target="_blank"
                               class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                                View Project
                            </a>
                        </div>
                    </div>
                </Tile>

                <Tile title="Artist.pl" :background-image="artist" hover-shadow-color="#f7af3260">
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-blue-500">Translation & Language School</h3>
                        <p class="text-white">Website for Artist - Biuro tłumaczeń I Szkoła języków obcych in Dębica</p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="React" icon="fa-react" bg_color="#61dafb" text_color="#000" />
                            <Badge text="WordPress" icon="fa-wordpress" bg_color="#21759b" />
                        </div>
                        <p class="text-gray-300">A professional website for a translation and language school business.</p>
                        <div class="flex justify-end mt-4">
                            <a href="https://artist.com.pl" rel="noopener noreferrer" target="_blank"
                               class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                                View Project
                            </a>
                        </div>
                    </div>
                </Tile>

                <Tile title="Ciasteczkowo" :background-image="ciasteczkowo" hover-shadow-color="#FFFFFF60">
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-blue-500">Bakery Blog</h3>
                        <p class="text-white">A modern blog about cakes and baking</p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="Next.js" icon="fa-react" bg_color="#000000" />
                            <Badge text="HyGraph" icon="fa-database" bg_color="#171A85" />
                            <Badge text="Tailwind" icon="fa-css3-alt" bg_color="#38bdf8" />
                        </div>
                        <p class="text-gray-300">A content-focused blog with a clean, modern design for a bakery business.</p>
                        <div class="flex justify-end mt-4">
                            <a href="https://ciasteczkowo.vercel.app" rel="noopener noreferrer" target="_blank"
                               class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                                View Project
                            </a>
                        </div>
                    </div>
                </Tile>

                <Tile title="MaSzyna: Reloaded" :background-image="maszyna_reloaded" hover-shadow-color="#70685b">
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-blue-500">Train Simulator</h3>
                        <p class="text-white">Port of MaSzyna Train Simulator into Godot Engine</p>
                        <div class="flex flex-wrap gap-2 my-3">
                            <Badge text="C++" icon="fa-code" bg_color="#00599c" />
                            <Badge text="GDScript" icon="fa-code" bg_color="#478cbf" />
                            <Badge text="Godot" icon="fa-gamepad" bg_color="#478cbf" />
                        </div>
                        <p class="text-gray-300">A game development project porting a train simulator to a modern game engine.</p>
                        <div class="flex justify-end mt-4">
                            <a href="https://github.com/MaSzyna-Reloaded" rel="noopener noreferrer" target="_blank"
                               class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                                GitHub Repository
                            </a>
                        </div>
                    </div>
                </Tile>
            </div>
        </div>

        <!-- Contact CTA -->
        <Tile title="Interested in Working Together?" class="mt-12">
            <template #default>
                <p class="text-white text-lg mb-6">
                    If you like my work and are interested in collaborating on a project, I'd love to hear from you!
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="/contact" class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                        Contact Me
                    </a>
                    <Button @click="router.push('/commissions/tos')" text="View Terms of Service" />
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
