<script setup lang="ts">
    import Badge from "./Badge.vue";
    import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
    <Badge
        :text="`Fork`"
        :icon="faCodeBranch"
    />
</template>
