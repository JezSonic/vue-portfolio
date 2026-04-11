<script setup lang="ts">
    import Badge from "./Badge.vue";
    import { faGithub } from "@fortawesome/free-brands-svg-icons";

    interface Props {
        url: string;
    }

    const { url } = defineProps<Props>();
</script>

<template>
    <Badge
        :text="`See on Github`"
        :icon="faGithub"
        :link="url"
    />
</template>
