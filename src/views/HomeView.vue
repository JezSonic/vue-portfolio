<script setup lang="ts">
import Tile from "@/components/Tile.vue";
import settings from "../../data/settings";
</script>

<template>
    <div :style="{ gap: settings.gap_size }">
        <Tile title="About me">
            <template #default>
                <p>
                    I’m Karol, a junior full-stack web developer with a passion for bringing websites and web applications to life.
                    While I have about 2 years of professional experience,
                    I’ve been coding for much longer and am constantly eager to learn new technologies.
                    My background includes experience with both front-end and back-end development, as evidenced by the technology stack I’ve included on this page (TypeScript, SCSS, Vue.js).
                </p>
                <p>
                    While web development is my primary focus, I also enjoy game development and have a number of game projects on GitHub under the username JezSonic.
                </p>
                <p>
                    I’m proficient in a variety of web development technologies, including PHP, Docker, Node.js, Vue.js, Laravel and other well-known frameworks.
                    I’m always looking for opportunities to expand my skill set and learn new technologies.
                    This website is a platform for me to showcase my abilities and experience in these areas. Here, you’ll find examples of my web development projects, and even games that I’ve worked on.
                </p>
                <p>
                    All of my games are open-sourced and free to download and modify. On this site you can find links to all my GitHub repositories.<br/>
                    You can check my <a href="https://play.google.com/store/apps/dev?id=9176249411662404922" target="_blank" rel="noopener noreferrer">Google Play Developer Page</a> to see my mobile games and projects.
                </p>
                <p>
                    Currently, I'm learning in high school on IT profile, but all my projects, i.g. games and this website are non-school projects.<br/>
                    My most favourite game engines are <strong>Unity Engine</strong> and <strong>Godot Engine</strong>.
                </p>
                <p>
                    Feel free to catch me on Discord, email and more – see the <a href="/contact" target="_blank" rel="noopener noreferrer">Contact</a> page.
                </p>
            </template>
        </Tile>
    </div>
</template>

<style scoped>

</style>