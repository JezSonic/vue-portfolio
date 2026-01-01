<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        text: String,
        backgroundImage: {
            type: String,
            default: null,
        },
        hoverShadowColor: {
            type: String,
            default: '#2e303ea0'
        },
        badges: {
            type: Boolean,
            default: false,
        },
        textClass: {
            type: String,
            default: "",
            required: false
        }
    });
</script>

<template>
    <div :class="`contain-content rounded-xl p-6 shadow-sm ${props.backgroundImage == null ? 'bg-gray-800' : 'background-image bg-blend-darken'}`">
        <div :class="`${props.badges ? 'text__badges' : 'text'} ${props.textClass}`">
            <h2 class="text-2xl/7 font-display font-medium text-blue-600 mb-2">{{ props.title }}</h2>
            <slot name="default" />
            <div class="badges" v-if="props.badges">
                <slot name="badges" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .background-image {
        background: rgba(0, 0, 0, .6) v-bind("`url('${backgroundImage}')`") no-repeat 50% 50% / cover;
    }
</style>
