<script setup lang="ts">
import Tile from "@/components/Tile.vue";
import settings from "../../data/settings";
import { ref } from "vue";
import Button from "@/components/Button.vue";
import router from "@/router";
const code = "console.log(\"Hello there!\")"
const code2 = "import { onMounted } from 'vue' \n\nconst site = () => {\n   const description = \"This site is my portfolio showing some projects that I have been working on\";\n   console.log(description);\n   return;\n}\n\nonMounted(() => {\n   site();\n}"
const typeValue = ref('')
const typeValue2 = ref('')
import img from '@/assets/img/games/foxy-adventure/bg.webp'
const typeEffect = () => {
    if (typeValue.value.length < code.length) {
        typeValue.value += code.charAt(typeValue.value.length);
        setTimeout(typeEffect, 50);
    }
}
const typeEffect2 = () => {
    if (typeValue2.value.length < code2.length) {
        typeValue2.value += code2.charAt(typeValue2.value.length);
        setTimeout(typeEffect2, 10);
    }
}
typeEffect()
typeEffect2()
</script>

<template>
    <div :style="{ gap: settings.gap_size }">
        <Tile title="About me">
            <template #default>
                <highlightjs language="typescript" :code="typeValue"></highlightjs>
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
                    Feel free to catch me on Discord, email and more – see the <a href="/contact" target="_blank" rel="noopener noreferrer">Contact</a> page.
                </p>
            </template>
        </Tile>
        <div class="tile-separator">
            <Tile title="Games" :background-image="img" hover-shadow-color="#00459280">
                <p>
                    All of my games are open-sourced and free to download and modify. On this site you can find links to all my GitHub repositories.
                </p>
                <p>
                    You can check my <a href="https://play.google.com/store/apps/dev?id=9176249411662404922" target="_blank" rel="noopener noreferrer">Google Play Developer Page</a> to see my mobile games and projects.
                </p>
                <p>
                    Currently, I'm learning in high school on IT profile, but all my projects, i.g. games and this website are non-school projects.
                </p>
                <p>
                    My most favourite game engines are <a href="https://unity.com/" target="_blank" rel="noreferrer noopener"><strong>Unity Engine</strong></a> and <a href="https://godotengine.com" target="_blank" rel="noreferrer noopener"><strong>Godot Engine</strong></a> .
                </p>

                <div class="button-container">
                    <Button @click="router.push('/games')" text="Go to Games" />
                </div>
            </Tile>
            <Tile title="About this site" hover-shadow-color="#92550066">
                <highlightjs language="typescript" :code="typeValue2"></highlightjs>
            </Tile>
        </div>
    </div>
</template>

<style scoped lang="scss">
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

</style>