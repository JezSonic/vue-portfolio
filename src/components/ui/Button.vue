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
    <button class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer" @click="() => {if (props.displayLoadingText) {isLoading = true}}">
        <span v-if="props.text !== null && !isLoading">{{ props.text }}&nbsp;</span>
        <span v-if="props.text == null && !isLoading"><slot class="button-text"/>&nbsp;</span>
        <span v-if="isLoading">Loading...</span>
    </button>
</template>

<style lang="scss" scoped>
    //span {
    //    position: relative;
    //    left: 0;
    //    color: var(--color1);
    //    transition: all .5s ease-in-out;
    //}
    //
    //button {
    //    cursor: pointer;
    //    background: #FFF;
    //    color: var(--color1);
    //    height: max-content;
    //    padding: 10px 24px;
    //    width: max-content;
    //    border-radius: 8px;
    //    transition: all 0.5s ease-in-out;
    //    position: relative;
    //    overflow: hidden;
    //
    //    &:disabled {
    //        background: gray;
    //    }
    //
    //    &::after {
    //        content: '🡒';
    //        position: absolute;
    //        right: 1.5em;
    //        opacity: 0;
    //        transition: all .5s ease-in-out;
    //    }
    //
    //    &:hover {
    //        &::after {
    //            right: 1em;
    //            opacity: 1;
    //        }
    //
    //        span {
    //            left: -0.5em;
    //        }
    //
    //        transition: all 0.5s ease-in-out;
    //    }
    //}

</style>