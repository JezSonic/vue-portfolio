<script setup lang="ts">
    import Badge from "./Badge.vue";

    interface Props {
        stars: number | string; // Allow string in case it comes from an API like that, template literal will handle it
    }

    const { stars } = defineProps<Props>();
</script>

<template>
    <Badge
        :text="`${stars} star(s)`"
        icon="fa-star"
        bg_color="rgb(196, 177, 68)"
    />
</template>
