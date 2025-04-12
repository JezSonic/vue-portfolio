<script setup lang="ts">
    const props = defineProps({
        title: String,
        text: String,
        addImage: {
            type: Boolean,
            default: false,
            required: false,
        },
        image: undefined,
        backgroundImage: {
            type: String,
            default: '',
        },
        hoverShadowColor: {
            type: String,
            default: '#2e303ea0'
        },
        badges: {
            type: Boolean,
            default: false,
        }
    });
    import settings from "../../../data/settings";
    
</script>

<template>
    <div :class="`tile ${backgroundImage == '' ? '' : 'background-image'}`">
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
        <div :class="`${props.badges == true ? 'text__badges' : 'text'}`">
            <p class="title">{{ props.title }}</p>
            <slot name="default" class="description" />
            <div class="badges" v-if="badges">
                <slot name="badges" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
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

    .tile {
        border-radius: 10px;
        background-color: var(--color2);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.5);
        transition-duration: 1000ms;
        cursor: default;
        backdrop-filter: blur(50px);
    }

    .tile:hover {
        box-shadow: -1px 1px 20px 10px v-bind(hoverShadowColor);
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
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: space-between;

        &__badges {
            width: 100%;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            justify-content: space-between;
        }
    }

    .tile img {
        object-fit: cover;
        min-width: 100%;
        min-height: 100%;
        height: 100%;
    }

    .description {
        pointer-events: none;
        font-size: 12px;
    }

    .background-image {
        background-blend-mode: darken;
        background: rgba(0, 0, 0, .6) v-bind("`url('${backgroundImage}')`") no-repeat 50% 50% / cover;
    }

</style>
