<script setup lang="ts">
    import Badge from "./Badge.vue";

    interface Props {
        url: string;
    }

    const { url } = defineProps<Props>();
</script>

<template>
    <Badge
        :text="`See on Github`"
        icon="fa-github"
        :link="url"
    />
</template>
