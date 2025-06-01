<script setup lang="ts">

    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    import router from "@/router/index.ts";
    const error = ref<boolean>(false);
    import { useUserStore } from "@/stores/userStore.ts";
    import UserService from "@/services/userService.ts";
    import Loading from "@/components/ui/Loading.vue";
    import type { ExceptionResponse } from "@/types/services/api.d.ts";
    const userStore = useUserStore();
    const errorText = ref<string|undefined>(undefined);
    onMounted(() => {
        const token: string = useRoute().params.token as string;
        if (!userStore.isLoggedIn()) {
            router.push(`/auth`)
            return;
        }
        UserService.verifyEmail(token)
            .then(() => {
                router.push(`/settings`)
            })
            .catch((err: ExceptionResponse) => {
                if (err.message == "invalid_token") {
                    errorText.value = "Invalid token";
                }
                error.value = true;
            })
    })
</script>

<template>
    <div>
        <Loading :loading="true" :error="error" :error-text="errorText"/>
    </div>
</template>

<style scoped lang="scss">
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%; right: 50%;
        transform: translate(50%,-50%);
    }
</style>