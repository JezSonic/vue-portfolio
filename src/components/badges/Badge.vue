<script setup lang="ts">
    const { icon, text, bg_color, text_color } = defineProps({
        icon: { default: "link" },
        text: { default: "Badge" },
        bg_color: { default: "rgba(255, 255, 255, .1)" },
        text_color: { default: "white" }
    });

    // Convert icon string to FontAwesome format
    const getIconArray = (iconName: string) => {
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
    <p :style="{ backgroundColor: bg_color, color: text_color }">
        <font-awesome-icon :icon="getIconArray(icon)" /> {{ text }}
    </p>
</template>

<style scoped lang="scss">
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
