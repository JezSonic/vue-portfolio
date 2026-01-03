<script setup lang="ts">
    import { onMounted, ref, onUnmounted } from "vue";

    interface Props {
        height?: number;
        width?: number;
    }

    const { height = 200, width = 300 } = defineProps<Props>();

    const x = ref(0);
    const y = ref(0);

    // Making the mouse aura stay in place was a headache.
    let currentScroll = 0;

    const handleMouseMove = (event: MouseEvent) => {
        x.value = event.clientX;
        y.value = event.clientY + window.scrollY;
    };

    const handleScroll = () => {
        currentScroll = window.scrollY;
    };

    onMounted(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
    });

    const toFixed = (absScroll: number) => absScroll - currentScroll;
</script>

<template>
    <div
        class="fixed z-[-100] rounded-full bg-linear-to-r from-[#bd43c8] from-15% to-[#1384da] animate-mouse-rotate"
        :style="{
            top: toFixed(y) - height / 2 + 'px',
            left: x - width / 2 + 'px',
            height: height + 'px',
            width: width + 'px'
        }">
    </div>
</template>
