<script setup lang="ts">
import Tile from "@/components/Tile.vue";
import gameData from "@/helpers/games.ts";
</script>

<template>
    <div class="grid">
        <Tile v-motion-pop-visible-once v-for="(item, index) in gameData" :key="index" :title="item.title" :add-image="true" :image="item.images[0]" badges>
            {{ item.shortDescription }}
        </Tile>
    </div>
</template>

<style scoped lang="scss">
    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
        gap: 24px;
    }

    @media (max-width: 1670px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>