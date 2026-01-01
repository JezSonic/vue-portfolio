<script lang="ts" setup>
    import { computed } from "vue";

    const props = defineProps({
        centered: {
            type: Boolean,
            default: true,
            required: false
        },

        loading: {
            type: Boolean,
            default: false,
            required: false
        },
        error: {
            type: Boolean,
            default: false,
            required: false
        },
        errorText: {
            type: String,
            default: "Oops! Something went wrong",
            required: false
        }
    })

    const _class = computed(() => {
        return props.centered ? "flex flex-col items-center justify-center absolute top-1/2 right-1/2 translate-1/2" : "flex flex-col items-center justify-center p-5"
    });
</script>

<template>
    <div v-if="loading || error" :class="_class">
        <div v-if="loading && !error" class="animate-spin m-0 p-0 w-16 h-16 rounded-[50%] border-t-blue-500 border-t-5 border-5 border-white" />
        <div v-if="error" class="flex flex-col items-center justify-center text-center gap-1.5 font-normal min-w-52 w-md">
            <h1 class="text-white">{{ errorText || "Oops! Something went wrong" }}</h1>
            <p class="text-white">Please, try again in a while or if the issue persists, report it to me via the <a
                class="font-semibold text-blue-600 hover:text-blue-500" href="/contact">Contact page</a></p>
        </div>
    </div>
</template>