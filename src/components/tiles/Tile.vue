<script setup lang="ts">
    const props = defineProps({
        title: String,
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
    <div :class="`rounded-xl px-6 py-8 shadow-sm ${props.backgroundImage == null ? 'bg-gray-800' : 'background-image'}`" style="contain: content;">
        <div :class="`${props.badges ? 'text__badges' : 'text'} ${props.textClass}`">
            <h2 class="text-2xl/7 font-display font-medium text-blue-600 mb-2">{{ props.title }}</h2>
            <slot name="default" />
            <div class="badges" v-if="props.badges">
                <slot name="badges" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .background-image {
        background-blend-mode: darken;
        background: rgba(0, 0, 0, .6) v-bind("`url('${backgroundImage}')`") no-repeat 50% 50% / cover;
    }

</style>
