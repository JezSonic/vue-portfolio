<script setup lang="ts">
    import Navbar from "@/components/ui/Navbar.vue";
    import MouseAura from "@/components/ui/MouseAura.vue";
    import router from "@/router";
</script>

<template>
    <MouseAura />
    <Navbar v-if="router.currentRoute.value.name !== 'error_404'"/>
    <main class="min-h-full place-items-center px-6 py-6 ">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </main>
</template>