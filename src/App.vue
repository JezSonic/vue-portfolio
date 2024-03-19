<script setup lang="ts">
    import Navbar from "@/components/Navbar.vue";
    import MouseAura from "@/components/MouseAura.vue";
    import settings from "../data/settings.ts";


</script>

<template>
    <MouseAura v-if="settings.mouse_aura" />

    <Navbar @filter="filter" />
    <main>
        <router-view />
    </main>
</template>

<style scoped>
    main {
        padding-top: 10px;
        width: 100%;
        max-width: 1500px;
        z-index: 8;
    }

    .tile-list {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(100px, min(100%, 400px))
        );
        width: 100%;
        justify-content: center;
    }
</style>
