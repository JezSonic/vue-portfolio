<script setup lang="ts">
    import Badge from "./Badge.vue";
    import { faStar } from "@fortawesome/free-solid-svg-icons";

    interface Props {
        stars: number | string; // Allow string in case it comes from an API like that, template literal will handle it
    }

    const { stars } = defineProps<Props>();
</script>

<template>
    <Badge
        :text="`${stars} star(s)`"
        :icon="faStar"
        bg_color="rgb(196, 177, 68)"
    />
</template>
