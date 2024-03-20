<script setup lang="ts">
    import Tile from "@/components/Tile.vue";

    const { repo } = defineProps(["repo"]);
    import ForkBadge from "./ForkBadge.vue";
    import GithubLinkBadge from "./GithubLinkBadge.vue";
    import StarsBadge from "./StarsBadge.vue";
    import settings from "../../data/settings";
    import Badge from "./Badge.vue";
    
</script>

<template>
    <Tile :add-image="true" :image="repo.image" :title="repo.title" :badges="true">
        <template #default>
            <p>{{ repo.description }}</p>
        </template>
        <template #badges>
            <StarsBadge
                v-if="settings.show_stars"
                StarsBadge
                :stars="repo.stars"
            />
            <GithubLinkBadge :url="repo.url" />
            <ForkBadge v-if="repo.fork" />
            <Badge v-for="badge in (settings.custom_badges[repo.name] || [])" :text="badge.text" :icon="badge.icon" :link="badge.link" :text_color="badge.text_color" :bg_color="badge.bg_color" />
        </template>
    </Tile>
</template>

<style scoped>
    .repo-tile img {
        object-fit: cover;
        min-width: 100%;
        min-height: 100%;
        height: 100%;
    }
</style>
