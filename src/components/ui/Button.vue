<script lang="ts" setup>
    const props = defineProps({
        text: {
            type: String,
            required: false
        }
    });
</script>

<template>
    <button class="button">
        <span v-if="props.text !== null">{{ props.text }}&nbsp;</span>
        <span v-if="props.text == null"><slot class="button-text"/>&nbsp;</span>
    </button>
</template>

<style lang="scss" scoped>
    span {
        position: relative;
        left: 0;
        color: var(--color1);
        transition: all .5s ease-in-out;
    }

    button {
        cursor: pointer;
        background: #FFF;
        color: var(--color1);
        height: max-content;
        padding: 10px 24px;
        width: max-content;
        border-radius: 8px;
        transition: all 0.5s ease-in-out;
        position: relative;
        overflow: hidden;

        &:disabled {
            background: gray;
        }

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