<script setup lang="ts">
import Tile from "@/components/tiles/Tile.vue";
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
        grid-template-columns: 49% 49%;
        gap: 24px;
        justify-content: center;
    }
    @media (min-width: 1771px) and (max-width: 1600px) {
        .grid {
            grid-template-columns: 80%;
        }
    }
    @media (min-width: 651px) and (max-width: 1170px) {
        .grid {
            grid-template-columns: 80%;
        }
    }
    @media (max-width: 650px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>