<script setup lang="ts">
    import Navbar from "@/components/ui/Navbar.vue";
    import MouseAura from "@/components/ui/MouseAura.vue";
    import settings from "../data/settings.ts";
    import router from "@/router";
</script>

<template>
    <MouseAura v-if="settings.mouse_aura" />
    <Navbar v-if="router.currentRoute.value.name !== 'error_404'"/>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="slide" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<style scoped>
    main {
        padding-top: 10px;
        width: 100%;
        max-width: 1500px;
        z-index: 8;
    }
    .slide-move,
    .slide-leave-active,
    .slide-enter-active {
        transition: all 0.5s
    }

    .slide-enter-from {
        transform: translate(90vw, 0);
    }

    .slide-leave-to {
        transform: translate(-100vw, 0);
    }
</style>
