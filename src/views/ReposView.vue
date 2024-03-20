<script setup lang="ts">

    import settings from "../../data/settings";
    import repos from "../../data/repos-cache.json";

    import { ref } from "vue";
    import RepoTile from "@/components/RepoTile.vue";

    const filter_by = ref("");

    const filter = (text: string) => {
        filter_by.value = text.toLowerCase();
    };
</script>

<template>
    <div
        :style="{ gap: settings.gap_size }"
        class="tile-list"
    >
        <RepoTile
            v-for="repo in repos"
            v-show="
                    repo.name.toLowerCase().includes(filter_by) ||
                    repo.description.toLowerCase().includes(filter_by)
                "
            :key="repo.name"
            :repo="repo"
        />
    </div>
</template>