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
    <a v-if="link" :href="link" class="badge-link cursor-pointer" rel="noopener noreferrer" target="_blank" v-once>
        <p :style="{ backgroundColor: bg_color, color: text_color }">
            <font-awesome-icon :icon="getIconArray(icon)" />
            {{ text }}
        </p>
    </a>
    <p v-else :style="{ backgroundColor: bg_color, color: text_color }" v-once>
        <font-awesome-icon :icon="getIconArray(icon)" />
        {{ text }}
    </p>
</template>

<style lang="scss" scoped>
    .badge-link {
        user-select: none;
        text-decoration: none;
    }

    p {
        user-select: none;
        display: inline;
        padding: 2px 5px;
        border-radius: 5px;
        box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    i {
        margin-right: 5px;
    }

    a > p {
        display: inline-block;
    }
</style>
