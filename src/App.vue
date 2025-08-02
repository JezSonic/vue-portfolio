<script setup lang="ts">
    import Navbar from "@/components/ui/Navbar.vue";
    import MouseAura from "@/components/ui/MouseAura.vue";
    import router from "@/router";
    import { useHead } from "@unhead/vue";
    import Loading from "@/components/ui/Loading.vue";

    // Default / Fallback meta tags + global tags
    useHead({
      // Title is managed by the router
      meta: [
        { name: 'description', content: "JezSonic's portfolio website showcasing projects, skills, and commission information." },
        { name: 'keywords', content: "JezSonic, portfolio, web developer, vue, typescript, javascript, projects, commissions, JezSonic" },
        { property: 'og:site_name', content: 'JezSonic Portfolio' },
      ],
      link: [
        { rel: 'canonical', href: () => window.location.origin + window.location.pathname }
      ],
      htmlAttrs: {
        lang: 'en'
      },
    });
</script>

<template>
    <MouseAura />
    <Navbar v-if="router.currentRoute.value.name !== 'error_404'"/>
    <main class="min-h-full place-items-center px-6 py-6 pt-16 h-[100vh]">
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