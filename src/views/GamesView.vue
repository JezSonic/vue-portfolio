<script setup lang="ts">
import Tile from "@/components/Tile.vue";
import gameData from "../../helpers/games.ts";
</script>

<template>
    <div class="scroll">
        <Tile v-for="(item, index) in gameData" :key="item" :title="item.title" :add-image="true" :image="item.images[0]" badges>
            {{ item.description }}
        </Tile>
    </div>
</template>

<style scoped lang="scss">
    .scroll {
        display: flex;
        flex-direction: row;
    }
</style>