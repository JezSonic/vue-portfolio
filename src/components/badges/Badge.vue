<script lang="ts" setup>
    defineProps({
        icon: { default: "link", type: String },
        text: { default: "Badge", type: String },
        bg_color: { default: "rgba(255, 255, 255, .1)", type: String },
        text_color: { default: "white", type: String },
        link: { default: null, type: String }
    });

    // Convert icon string to FontAwesome format
    const getIconArray = (iconName: string): string[] => {
        // Remove 'fa-' prefix if present
        const name = iconName.startsWith("fa-") ? iconName.substring(3) : iconName;

        // Determine if it's a brand icon or a solid icon
        const prefix = ["vuejs", "css", "php", "laravel", "node-js", "docker", "sass", "js", "html5", "css3-alt", "git-alt", "wordpress", "react", "google", "github", "unity"].includes(name)
            ? "fab"
            : "fas";

        return [prefix, name];
    };
</script>

<template>
    <a v-if="link" :href="link" class="select-none decoration-0 cursor-pointer" rel="noopener noreferrer" target="_blank" v-once>
        <p class="inline-block rounded-md select-none"  :style="{ backgroundColor: bg_color, color: text_color }">
            <font-awesome-icon :icon="getIconArray(icon)" class="mr-1.5" />
            {{ text }}
        </p>
    </a>
    <p v-else class="inline rounded-md select-none" :style="{ backgroundColor: bg_color, color: text_color }" v-once>
        <font-awesome-icon :icon="getIconArray(icon)" />
        {{ text }}
    </p>
</template>

<style lang="scss" scoped>

    p {
        padding: 2px 5px;
        box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    a > p {
        display: inline-block;
    }
</style>
