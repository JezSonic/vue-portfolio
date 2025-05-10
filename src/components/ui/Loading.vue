<script setup lang="ts">
   defineProps({
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        error: {
            type: Boolean,
            required: false,
            default: false
        },
        errorText: {
            type: String,
            required: false,
            default: "Oops! Something went wrong"
        }
    });
</script>

<template>
    <div class="loading-container" v-if="loading || error">
        <div v-if="loading && !error" class="loading-spinner border-t-blue-500 border-t-5 border-5 border-white" />
        <Transition name="fade">
        <div v-if="error" class="error-message">
            <h1 class="text-white">{{errorText || "Oops! Something went wrong"}}</h1>
            <p class="text-white">Please, try again in a while or if the issue persists, report it to me via the <a class="font-semibold text-blue-600 hover:text-blue-500" href="/contact">Contact page</a></p>
        </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .loading-spinner {
        margin: 0;
        padding: 0;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .error-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 6px;
        font-weight: normal;
        min-width: 200px;
        width: 460px;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    /* Style dla przejścia "fade" */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

</style>