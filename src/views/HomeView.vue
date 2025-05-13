<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
import Badge from "@/components/badges/Badge.vue";
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Hero Section -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div class="md:w-1/2">
                <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Hello, I'm Karol</h1>
                <h2 class="text-2xl md:text-3xl font-medium text-gray-200 mb-6">Full-Stack Web Developer</h2>
                <p class="text-lg text-gray-300 mb-6">
                    A passionate developer with {{ new Date().getFullYear() - 2023 }} years of professional experience, 
                    creating websites and web applications that combine functionality with elegant design.
                </p>
                <div class="flex gap-4">
                    <a href="/commissions" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                        View Projects
                    </a>
                    <a href="/contact" class="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-colors">
                        Contact Me
                    </a>
                </div>
            </div>
            <div class="md:w-1/2 flex justify-center">
                <img src="@/assets/profile/linkedin_avatar.webp" alt="Karol - Web Developer" class="rounded-full w-64 h-64 object-cover border-4 border-blue-600 shadow-lg">
            </div>
        </div>

        <!-- About Me Section -->
        <Tile title="About Me" class="mb-12">
            <template #default>
                <div class="space-y-4">
                    <p class="text-white text-lg">
                        I'm a junior full-stack web developer with a passion for designing websites and web applications to fit any taste. 
                        While I have about {{ new Date().getFullYear() - 2023 }} years of professional experience, I've been coding front-end for much longer 
                        and am constantly eager to learn new technologies.
                    </p>
                    <p class="text-white text-lg">
                        My background includes experience with both front-end and back-end development, as evidenced by the technology stack 
                        I've included on this page. While web development is my primary focus, I enjoy game development and have some game 
                        projects on GitHub under the username JezSonic.
                    </p>
                    <p class="text-white text-lg">
                        This website is a platform for me to showcase my abilities and experience. Here, you'll find examples of my web development 
                        projects, and even games that I've worked on.
                    </p>
                </div>
            </template>
        </Tile>

        <!-- Skills Section -->
        <Tile title="My Skills" class="mb-12" :badges="true">
            <template #default>
                <p class="text-white text-lg mb-6">
                    I'm proficient in a variety of web development technologies, including:
                </p>
            </template>
            <template #badges>
                <div class="flex flex-wrap gap-3 mt-4">
                    <Badge text="TypeScript" icon="fa-code" bg_color="#3178c6" />
                    <Badge text="Vue.js" icon="fa-vuejs" bg_color="#42b883" />
                    <Badge text="PHP" icon="fa-php" bg_color="#777bb3" />
                    <Badge text="Laravel" icon="fa-laravel" bg_color="#ff2d20" />
                    <Badge text="Node.js" icon="fa-node-js" bg_color="#68a063" />
                    <Badge text="Docker" icon="fa-docker" bg_color="#2496ed" />
                    <Badge text="SCSS" icon="fa-sass" bg_color="#cd6799" />
                    <Badge text="JavaScript" icon="fa-js" bg_color="#f7df1e" text_color="#000" />
                    <Badge text="HTML5" icon="fa-html5" bg_color="#e34f26" />
                    <Badge text="CSS3" icon="fa-css3-alt" bg_color="#264de4" />
                    <Badge text="Git" icon="fa-git-alt" bg_color="#f05032" />
                </div>
            </template>
        </Tile>

        <!-- Featured Projects -->
        <Tile title="Featured Projects" class="mb-12">
            <template #default>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div class="bg-gray-700 rounded-lg overflow-hidden shadow-md">
                        <img src="@/assets/projects/oldwebsite.png" alt="Project Screenshot" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="text-xl font-semibold text-blue-500 mb-2">Previous Portfolio</h3>
                            <p class="text-gray-300 mb-4">My previous portfolio website showcasing my earlier work and skills.</p>
                            <div class="flex gap-2">
                                <Badge text="Vue.js" icon="fa-vuejs" bg_color="#42b883" />
                                <Badge text="CSS" icon="fa-css3-alt" bg_color="#264de4" />
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-700 rounded-lg overflow-hidden shadow-md">
                        <img src="@/assets/projects/ciasteczkowo.png" alt="Project Screenshot" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="text-xl font-semibold text-blue-500 mb-2">Ciasteczkowo</h3>
                            <p class="text-gray-300 mb-4">A web application for a bakery business with online ordering capabilities.</p>
                            <div class="flex gap-2">
                                <Badge text="Laravel" icon="fa-laravel" bg_color="#ff2d20" />
                                <Badge text="PHP" icon="fa-php" bg_color="#777bb3" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-center">
                    <a href="/commissions" class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                        View All Projects
                    </a>
                </div>
            </template>
        </Tile>

        <!-- Contact Section -->
        <Tile title="Get In Touch">
            <template #default>
                <p class="text-white text-lg mb-6">
                    I'm always open to new opportunities and collaborations. Feel free to reach out to me through any of the following channels:
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="/contact"
                       class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <font-awesome-icon icon="fa-brands fa-discord" class="w-6 h-6 text-white" />
                        <span class="text-white">Discord</span>
                    </a>
                    <a href="/contact"
                       class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <font-awesome-icon icon="fa-solid fa-envelope" class="w-6 h-6 text-white" />
                        <span class="text-white">Email</span>
                    </a>
                    <a href="/contact"
                       class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <font-awesome-icon icon="fa-brands fa-linkedin" class="w-6 h-6 text-white" />
                        <span class="text-white">LinkedIn</span>
                    </a>
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