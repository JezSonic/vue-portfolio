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
        class="mouse-aura"
        :style="{
            top: toFixed(y) - height / 2 + 'px',
            left: x - width / 2 + 'px',
            height: height + 'px',
            width: width + 'px'
        }">
    </div>
</template>

<style scoped lang="scss">
    @keyframes rotate {
        from {
            transform: rotateZ(0deg);
            filter: hue-rotate(0deg) blur(120px);
        }

        to {
            transform: rotateZ(360deg);
            filter: hue-rotate(360deg) blur(120px);
        }
    }

    .mouse-aura {
        z-index: -100;
        position: fixed;
        background: linear-gradient(
            90deg,
            rgba(189, 67, 200, 1) 15%,
            rgb(19, 132, 218) 100%
        );
        border-radius: 100%;
        animation-name: rotate;
        animation-duration: 10s;
        animation-delay: 0s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
</style>
