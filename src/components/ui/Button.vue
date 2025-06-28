<script lang="ts" setup>
    import { ref, computed, watch } from "vue";

    type size = 'sm' | 'md' | 'lg';
    type variant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'link';

    const props = defineProps({
        text: {
            type: String,
            required: false
        },
        displayLoadingText: {
            type: Boolean,
            required: false,
            default: false
        },
        outline: {
            type: Boolean,
            required: false,
            default: false
        },
        variant: {
            type: Object () as () => variant,
            required: false,
            default: 'default',
            validator: (value: string) => ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'link'].includes(value)
        },
        size: {
            type: Object () as () => size,
            required: false,
            default: 'md',
            validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
        },
        fullWidth: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        }
    });

    const emit = defineEmits(['click']);
    const isLoading = ref<boolean>(props.loading);

    // Watch for external loading prop changes
    watch(() => props.loading, (newValue) => {
        isLoading.value = newValue;
    });

    const handleClick = (event: MouseEvent) => {
        if (props.disabled || isLoading.value) return;

        if (props.displayLoadingText) {
            isLoading.value = true;
        }

        emit('click', event);
    };

    const buttonClasses = computed(() => {
        const baseClasses = "rounded-md font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95";

        // Size classes
        const sizeClasses = {
            sm: "px-2.5 py-1.5 text-xs min-w-20",
            md: "px-3.5 py-2.5 text-sm min-w-36",
            lg: "px-5 py-3 text-base min-w-36"
        };

        // Variant classes
        const variantClasses = {
            default: "bg-white dark:bg-gray-600 text-black dark:text-white shadow-xs hover:bg-gray-100 dark:hover:bg-gray-500",
            primary: "bg-blue-600 text-white shadow-xs hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
            secondary: "bg-gray-200 text-gray-800 shadow-xs hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
            success: "bg-green-600 text-white shadow-xs hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800",
            danger: "bg-red-600 text-white shadow-xs hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
            warning: "bg-yellow-500 text-white shadow-xs hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700",
            info: "bg-blue-400 text-white shadow-xs hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600",
            link: "bg-transparent text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline p-0"
        };

        // Width class
        const widthClass = props.fullWidth ? "w-full" : "";

        // Disabled class
        const disabledClass = props.disabled ? "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100" : "";

        return `${baseClasses} ${sizeClasses[props.size]} ${variantClasses[props.variant]} ${widthClass} ${disabledClass}`;
    });
</script>

<template>
    <button 
        :class="buttonClasses" 
        @click="handleClick"
        :disabled="disabled || isLoading">
            <div v-if="isLoading" class="spinner mr-2"></div>
            <slot v-if="!isLoading"></slot>
            <span v-if="props.text !== null && !isLoading">{{ props.text }}</span>
            <span v-if="props.text == null && !isLoading"><slot name="text" class="button-text"/></span>
            <span v-if="isLoading">Loading...</span>
    </button>
</template>

<style scoped>
/* Additional animation for focus */
button:focus {
    animation: pulse 1s;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
}

/* Loading spinner */
.spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
