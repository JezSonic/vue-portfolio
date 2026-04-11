<script lang="ts" setup>
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    import { faLink } from "@fortawesome/free-solid-svg-icons";
    import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

    interface Props {
        icon?: IconDefinition;
        text?: string;
        color?: string;
        link?: string | null;
    }

    const props = withDefaults(defineProps<Props>(), {
        icon: () => faLink,
        text: "Badge",
        color: "gray",
        link: null
    });

    const colorClasses = {
        blue: "bg-blue-500/20 dark:bg-blue-500/30 text-blue-600 dark:text-blue-400",
        sky: "bg-sky-500/20 dark:bg-sky-500/30 text-sky-600 dark:text-sky-300",
        red: "bg-red-500/20 dark:bg-red-500/30 text-red-600 dark:text-red-400",
        green: "bg-green-500/20 dark:bg-green-500/30 text-green-600 dark:text-green-400",
        emerald: "bg-emerald-500/20 dark:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400",
        indigo: "bg-indigo-500/20 dark:bg-indigo-500/30 text-indigo-600 dark:text-indigo-400",
        pink: "bg-pink-500/20 dark:bg-pink-500/30 text-pink-600 dark:text-pink-400",
        orange: "bg-orange-500/20 dark:bg-orange-500/30 text-orange-600 dark:text-orange-400",
        gray: "bg-gray-500/20 dark:bg-gray-500/30 text-gray-700 dark:text-gray-300",
        yellow: "bg-yellow-500/20 dark:bg-yellow-500/30 text-yellow-600 dark:text-yellow-400",
        cyan: "bg-cyan-500/20 dark:bg-cyan-500/30 text-cyan-600 dark:text-cyan-400",
        slate: "bg-slate-500/20 dark:bg-slate-500/30 text-slate-600 dark:text-slate-400",
    } as Record<string, string>;

    const activeColorClass = colorClasses[props.color] || colorClasses.gray;
</script>

<template>
    <router-link v-if="link && link.startsWith('/')" :to="link" class="select-none decoration-0 cursor-pointer" v-once>
        <p class="py-0.5 px-1.5 shadow-xs inline-block rounded-md select-none" :class="activeColorClass">
            <font-awesome-icon :icon="props.icon" class="mr-1.5" />
            {{ text }}
        </p>
    </router-link>
    <a v-else-if="link" :href="link" class="select-none decoration-0 cursor-pointer" rel="noopener noreferrer" target="_blank" v-once>
        <p class="py-0.5 px-1.5 shadow-xs inline-block rounded-md select-none"  :class="activeColorClass">
            <font-awesome-icon :icon="props.icon" class="mr-1.5" />
            {{ text }}
        </p>
    </a>
    <p v-else class="py-0.5 px-1.5 shadow-xs inline rounded-md select-none" :class="activeColorClass" v-once>
        <font-awesome-icon :icon="props.icon" />
        {{ text }}
    </p>
</template>
