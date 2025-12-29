<script setup lang="ts">
    import Navbar from "@/components/ui/Navbar.vue";
    import MouseAura from "@/components/ui/MouseAura.vue";
    import router from "@/router";
    import Loading from "@/components/ui/Loading.vue";
</script>

<template>
    <MouseAura />
    <Navbar v-if="router.currentRoute.value.name !== 'error_404'"/>
    <main class="min-h-full place-items-center px-6 py-6 pt-16 h-screen">
        <router-view v-slot="{ Component }">
            <Suspense>
                <template #default>
                    <component :is="Component" />
                </template>
                <template #fallback>
                    <Loading :loading="true" />
                </template>
            </Suspense>
        </router-view>
    </main>
</template>