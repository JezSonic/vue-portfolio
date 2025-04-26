<script setup lang="ts">
    defineProps<{
        loading?: boolean;
        error?: boolean;
    }>();
</script>

<template>
    <div class="loading-container" v-if="loading || error">
        <div v-if="loading && !error" class="loading-spinner"></div>
        <Transition name="fade">

        <div v-if="error" class="error-message">
            <h1>Oops! Something went wrong</h1>
            <p>Please a try again in a while or if the issue persists, please report it to me via the <a href="/contact">Contact page</a></p>
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
        width: 64px;
        height: 64px;
        border: 5px solid white;
        border-top: 5px solid var(--accent-color);
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