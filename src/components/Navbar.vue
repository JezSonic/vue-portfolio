<script setup lang="ts">
    import SearchBox from "@/components/SearchBox.vue";
    import { onMounted, ref } from "vue";
    import settings from "../../data/settings";
    const emit = defineEmits(["filter"]);
    const filter = (text: string) => emit("filter", text);
    const transparent = ref(true);
    const onDocumentScroll = () => {
        transparent.value = window.scrollY === 0;
    };
    onMounted(() => {
        window.addEventListener("scroll", onDocumentScroll);
        onDocumentScroll();
    });
</script>

<template>
    <div :class="{ 'nav-container': true, 'transparent': transparent }">
        <nav>
            <div class="left">
                <router-link to="/">{{ settings.title }}</router-link>
            </div>

            <div class="right">
                <router-link to="/games">Games</router-link>
                <router-link to="/commissions">Commissions</router-link>
                <router-link to="/projects">GitHub Projects</router-link>
                <router-link to="/contact">Contact</router-link>
            </div>
        </nav>
    </div>
</template>

<style scoped lang="scss">
    .nav-container {
        width: 100%;
        display: flex;
        justify-content: center;
        position: fixed;
        padding: 10px 25px;
        top: 0;
        left: 0;
        z-index: 10;
        backdrop-filter: blur(10px);
        transition-duration: 500ms;

        &:not(.transparent) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(0, 0, 0, 0.5);
            box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.5);
        }
    }

    .title {
        cursor: pointer;
        user-select: none;
        display: inline;
        text-decoration: none;
        color: var(--accent-color);
        font-size: 25px;
        font-weight: bold;
    }

    nav {
        max-width: 1500px;
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    nav > div {
        flex: 1;
    }

    .right {
        display: flex;
        justify-content: end;
        align-items: center;
        a {
            margin-right: 12px;
        }
    }
</style>
