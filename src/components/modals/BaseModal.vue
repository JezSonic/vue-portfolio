<script setup lang="ts">
import type { PropType } from "vue";

// Accept an optional `close` method. If provided, BaseModal will call it to close itself.
const props = defineProps({
    close: { type: Function as PropType<() => void>, required: false }
});

const emit = defineEmits(["close"])

const doClose = () => {
    if (props.close) {
        props.close();
    } else {
        // Fallback for components not using the programmatic modal service
        emit('close');
    }
}
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/60" @click="doClose"></div>
        <div class="relative bg-gray-900 text-gray-200 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 border border-gray-700">
            <slot />
        </div>
    </div>
</template>