<script setup lang="ts">
    import Tile from "@/components/Tile.vue";
    import { ref } from "vue";
    const emit = defineEmits(["filter"]);
    const filter = ref("");
    const results = ref([]);
</script>

<template>
    <div>
        <input
            v-model="filter"
            @input="emit('filter', filter)"
            type="text"
            placeholder="Search..."
        />
        <div class="results">
            <Tile v-if="filter.length > 0">
                <h3 v-if="results.length === 0">No search results</h3>
            </Tile>
        </div>
    </div>
</template>

<style scoped lang="scss">
    input {
        background-color: var(--color2);
        padding: 10px 15px;
        border-radius: 10px;
        font-size: 10px;
        width: 200px;
    }

    .results {
        width: 200px;
        margin-top: 6px;
        position: fixed;
    }
</style>
