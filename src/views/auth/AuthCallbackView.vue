<script lang="ts" setup>

    import Button from "@/components/ui/Button.vue";
    import { onMounted, ref } from "vue";
    import ApiService from "@/services/apiService.ts";
    import { ExceptionResponse } from "@/types/services/api";
    import router from "@/router";
    import { useUserStore } from "@/stores/userStore.ts";
    import { OAuthProvider } from "@/types/services/auth";
    import AuthService from "@/services/authService.ts";
    import { useRoute } from "vue-router";
    import Loading from "@/components/ui/Loading.vue";

    const login_password = ref<string>("");
    const login_email = ref<string>("");
    const register_password = ref<string>("");
    const register_email = ref<string>("");
    const success = ref<boolean>(false);
    const errors = ref<{ [key: string]: string[] } | null>(null);
    //@TODO: Add error handling
    //@TODO: Add separate texts for: Registering an account. logging into account, connecting social account
    onMounted(() => {
        AuthService.verifyOAuthCallback(useRoute().params.id as string)
            .then((res) => {
                useUserStore().id = res.content;
                router.push("/profile");
            })
    })
</script>

<template>
    <div>
        <Loading :loading="true"/>
    </div>
</template>

<style lang="scss" scoped>
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