<script lang="ts" setup>
    import { ref } from "vue";

    const props = defineProps({
        text: {
            type: String,
            required: false
        },
        displayLoadingText: {
            type: Boolean,
            required: false,
            default: false
        }
    });

    const isLoading = ref<boolean>(false)
</script>

<template>
    <button class="rounded-md dark:bg-gray-600 bg-white px-3.5 py-2.5 text-sm font-semibold text-black dark:text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer flex items-center justify-center" @click="() => {if (props.displayLoadingText) {isLoading = true}}">
        <slot></slot>
        <span v-if="props.text !== null && !isLoading">{{ props.text }}</span>
        <span v-if="props.text == null && !isLoading"><slot name="text" class="button-text"/></span>
        <span v-if="isLoading">Loading...</span>
    </button>
</template>
