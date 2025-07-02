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
        // Example: { property: 'og:image', content: 'https://jezsonic.dev/default-og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        // Example: { name: 'twitter:site', content: '@JezSonic' },
        // Example: { name: 'twitter:creator', content: '@JezSonic' },
      ],
      link: [
        { rel: 'canonical', href: () => window.location.origin + window.location.pathname }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        {
          type: 'application/ld+json',
          children: () => JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'JezSonic Portfolio',
            'url': window.location.origin,
            // If the site has search functionality, you can add PotentialAction for Sitelinks Search Box
            // 'potentialAction': {
            //   '@type': 'SearchAction',
            //   'target': `${window.location.origin}/search?q={search_term_string}`,
            //   'query-input': 'required name=search_term_string'
            // }
          }),
        },
        {
          type: 'application/ld+json',
          children: () => JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': 'JezSonic', // Replace with actual name if different or preferred
            'url': window.location.origin,
            // Add other relevant Person properties like sameAs for social media profiles
            // 'sameAs': [
            //   'https://github.com/JezSonic',
            //   'https://www.linkedin.com/in/jezsonic/' // Example
            // ]
            // 'jobTitle': 'Web Developer', // Example
            // 'image': 'url_to_profile_picture.jpg' // Example
          }),
        }
      ]
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