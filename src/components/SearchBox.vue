<script setup lang="ts">
    import Tile from "@/components/Tile.vue";
    import { ref } from "vue";
    import { SearchData, SearchEngine } from "@/helpers/search.ts";

    const filter = ref("");
    const results = ref<SearchData[]>([]);
    const _searchEngine = new SearchEngine()

    const performSearch = (keyword: string) => {
        results.value = _searchEngine.performSearch(keyword)
        console.log(results.value)
    }
</script>

<template>
    <div>
        <input
            v-model="filter"
            @input="performSearch(filter)"
            type="text"
            placeholder="Search..."
        />
        <div class="results">
            <Tile v-if="filter.length > 0 && results.length === 0">
                <h3>No search results</h3>
            </Tile>
            <Tile v-else-if="filter.length > 0 && results.length >= 1">
                <p v-for="(item, index) in results">{{item.title}}</p>
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
