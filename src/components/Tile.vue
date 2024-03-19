<script setup lang="ts">
    const props = defineProps({
        title: String,
        text: String,
        addImage: {
            type: Boolean,
            default: false,
            required: false,
        },
        image: undefined
    });
    import settings from "../../data/settings";
    
</script>

<template>
    <div class="repo-tile">
        <div
            v-if="settings.show_banner && props.addImage"
            class="image-container"
        >
            <img
                :src="props.image"
                :alt="
                    props.image
                        ? 'Project Banner'
                        : 'Image is null, please update the repos-cache.json file by running npm run fetch-repos'
                "
            />
        </div>
        <div class="text">
            <p class="title">{{ props.title }}</p>
            <slot name="default" class="description" />
            <div class="badges">
                <slot name="badges" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .badges {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-self: flex-end;
    }

    .title {
        pointer-events: none;
        font-size: 20px;
        color: var(--accent-color);
    }

    .repo-tile {
        border-radius: 10px;
        background-color: var(--color2);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.5);
        transition-duration: 1000ms;
        cursor: default;
        backdrop-filter: blur(50px);
    }

    .repo-tile:hover {
        transform: scale(1.02);
    }

    .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        aspect-ratio: 2/1;
        width: 100%;
    }

    .text {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .repo-tile img {
        object-fit: cover;
        min-width: 100%;
        min-height: 100%;
        height: 100%;
    }

    .description {
        pointer-events: none;
        font-size: 12px;
    }

</style>
