<script lang="ts" setup>
    import { onMounted, ref } from "vue";
    import router from "@/router";
    import { useUserStore } from "@/stores/userStore.ts";
    import AuthService from "@/services/authService.ts";
    import { useRoute } from "vue-router";
    import Loading from "@/components/ui/Loading.vue";
    import ApiService from "@/services/apiService";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    import { EOAuthProvider } from "@/types/services/auth.d.ts";
    import { useAuthStore } from "@/stores/authStore.ts";
    import Button from "@/components/ui/Button.vue";
    const userStore = useUserStore()
    const authStore = useAuthStore();
    const error = ref<boolean>(false);
    const loading = ref<boolean>(true);
    onMounted(() => {
        const driver: string = useRoute().params.id as string;

        ApiService.getIP().then((data) => {
            let token = "";
            if (driver == EOAuthProvider.GoogleOneTap) {
                token = authStore.oneTapToken || ""
            }

            AuthService.verifyOAuthCallback(driver, data.ip, token)
                .then((res) => {
                    userStore.id = res.id;
                    userStore.token = res.access_token;
                    userStore.tokenExpiration = new Date().getTime() + res.expires_in * 1000;
                    userStore.refreshToken = res.refresh_token;
                    authStore.oneTapToken = null;
                    router.push(`/user/settings`);
                }).catch(() => {
                    userStore.logout();
                    error.value = true;
                    loading.value = false;
            })
        })
    })
</script>

<template>
    <div class="w-full h-full">
        <Loading v-if="loading && !error" :loading="true" />
        <div v-if="error" class="flex flex-col items-center justify-center absolute top-1/2 right-1/2 width-full max-w-125 translate-x-1/2 -translate-y-1/2">
            <div class="bg-gray-800 rounded-xl shadow p-8 text-center w-full flex flex-col items-center ">
                <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-6xl mb-4 text-red-500" />
                <h2 class="text-gray-800 dark:text-white text-2xl font-bold mb-3">Authentication Failed</h2>
                <p class="text-gray-500 dark:text-white mb-6 text-lg">We couldn't authenticate you with the provided credentials. Please try again or use a different authentication method.</p>
                <Button variant="primary" @click="router.push('/auth')" text="Return to Login" />
            </div>
        </div>
    </div>
</template>
