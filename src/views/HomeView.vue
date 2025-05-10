<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
</script>

<template>
    <div class="w-auto max-w-400">
        <Tile title="Hello there">
            <template #default>
                <p class="text-white">
                    I'm Karol, a junior full-stack web developer with a passion for designing websites and web applications to fit any taste while I have about {{ new Date().getFullYear() - 2023}} years of professional experience, be it front-end coding for much longer and am constantly eager to learn new technologies. My background includes experience with both front-end and back-end development, as evidenced by the technology stack I've included on this page (TypeScript, SCSS, Vue.js)
                </p>
                <p class="text-white">
                    While web development is my primary focus,
                    I enjoy game development and have some game projects on GitHub under the username JezSonic.
                </p>
                <p class="text-white">
                    I’m proficient in a variety of web development technologies, including PHP, Docker, Node.js, Vue.js, Laravel and other well-known frameworks.
                    I’m always looking for opportunities to expand my skill set and learn new technologies.
                    This website is a platform for me to showcase my abilities and experience in these areas. Here, you’ll find examples of my web development projects, and even games that I’ve worked on.
                </p>
                <p class="text-white">
                    Feel free to catch me on Discord, email and more – see the <a class="font-semibold text-blue-600 hover:text-blue-500" href="/contact" target="_blank" rel="noopener noreferrer">Contact</a> page.
                </p>
            </template>
        </Tile>
    </div>
</template>