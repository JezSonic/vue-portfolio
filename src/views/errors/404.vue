<script setup lang="ts">

import Button from "@/components/ui/Button.vue";
import router from "@/router";
</script>

<template>
    <div class="error_404">
        <h1>404 - That's all we know</h1>
        <p>You have requested unknown resource that has not been found</p>
        <Button class="error_404_button" text="Go to home page" @click="router.push('/')"/>
    </div>
</template>

<style scoped lang="scss">
.error_404 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%; right: 50%;
    animation-play-state: running;
    animation-name: test;
    animation-duration: 16s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    transform: translate(50%,-50%);
    &_button {
        margin-top: 16px;
    }
}

@keyframes test {
    0% {
        transform: translate(50%,-50%);
    }
    25% {
        transform: translate(50%,-45%);
    }
    75% {
        transform: translate(50%,-55%);
    }
    100% {
        transform: translate(50%,-50%);
    }
}
</style>