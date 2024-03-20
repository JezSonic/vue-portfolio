<script setup lang="ts">
    const props = defineProps({
        text: String
    });
</script>

<template>
    <button class="button">
        <span>{{ props.text }}&nbsp;</span>
    </button>
</template>

<style scoped>
    span {
        position: relative;
        left: 0;
        color: var(--color1);
        transition: all .5s ease-in-out;
    }

    button {
        cursor: pointer;
        background: var(--text-color);
        color: var(--color1);
        height: max-content;
        padding: 10px 24px;
        width: max-content;
        border-radius: 8px;
        transition: all 0.5s ease-in-out;
        position: relative;
        overflow: hidden;

        &::after {
            content: '🡒';
            position: absolute;
            right: 1.5em;
            opacity: 0;
            transition: all .5s ease-in-out;
        }

        &:hover {
            &::after {
                right: 1em;
                opacity: 1;
            }

            span {
                left: -0.5em;
            }

            transition: all 0.5s ease-in-out;
        }
    }

</style>