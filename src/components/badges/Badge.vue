<script setup lang="ts">
    interface Props {
        icon?: string;
        text?: string;
        bg_color?: string;
        text_color?: string;
        link?: string; // Added link prop
    }

    const {
        icon = "link",
        text = "Badge",
        bg_color = "rgba(255, 255, 255, .1)",
        text_color = "white",
        link
    } = withDefaults(defineProps<Props>(), {
        icon: "link",
        text: "Badge",
        bg_color: "rgba(255, 255, 255, .1)",
        text_color: "white",
        link: undefined // Default to undefined
    });

    // Convert icon string to FontAwesome format
    const getIconArray = (iconName: string): string[] => {
        // Remove 'fa-' prefix if present
        const name = iconName.startsWith('fa-') ? iconName.substring(3) : iconName;

        // Determine if it's a brand icon or a solid icon
        const prefix = ['vuejs', 'php', 'laravel', 'node-js', 'docker', 'sass', 'js', 'html5', 'css3-alt', 'git-alt', 'wordpress', 'react', 'google', 'github'].includes(name)
            ? 'fab' 
            : 'fas';

        return [prefix, name];
    };
</script>

<template>
    <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer" class="badge-link">
        <p :style="{ backgroundColor: bg_color, color: text_color }">
            <font-awesome-icon :icon="getIconArray(icon)" /> {{ text }}
        </p>
    </a>
    <p v-else :style="{ backgroundColor: bg_color, color: text_color }">
        <font-awesome-icon :icon="getIconArray(icon)" /> {{ text }}
    </p>
</template>

<style scoped lang="scss">
    .badge-link {
        text-decoration: none;
    }

    p {
        display: inline;
        padding: 2px 5px;
        border-radius: 5px;
        box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    i {
        margin-right: 5px;
    }

    a {
        cursor: pointer;
    }
</style>
