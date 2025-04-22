<script setup lang="ts">
    defineProps<{
        loading?: boolean;
        error?: string;
    }>();
</script>

<template>
    <div class="loading-container" v-if="loading || error">
        <div v-if="loading" class="loading-spinner"></div>
        <div v-if="error" class="error-message">{{ error }}</div>
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
        color: #e74c3c;
        margin-top: 10px;
        text-align: center;
        font-weight: bold;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>