<script lang="ts" setup>
    import { onMounted, ref } from "vue";
    import router from "@/router";
    import { useUserStore } from "@/stores/userStore.ts";
    import AuthService from "@/services/authService.ts";
    import { useRoute } from "vue-router";
    import Loading from "@/components/ui/Loading.vue";
    import ApiService from "@/services/apiService";
    const userStore = useUserStore()
    const error = ref<boolean>(false);
    onMounted(() => {
        const driver: string = useRoute().params.id as string;

        ApiService.getIP().then((data) => {
            AuthService.verifyOAuthCallback(driver, data.ip)
                .then((res) => {
                    userStore.id = res.content;
                    userStore.token = res.token;
                    router.push(`/user/settings`);
                }).catch(() => {
                    userStore.logout();
                    error.value = true;
            })
        })
    })
</script>

<template>
    <div>
        <Loading :loading="true" :error="error"/>
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