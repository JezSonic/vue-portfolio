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
        <div v-if="error" class="error-container">
            <div class="error-card">
                <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="error-icon text-red-500" />
                <h2 class="error-title">Authentication Failed</h2>
                <p class="error-description">We couldn't authenticate you with the provided credentials. Please try again or use a different authentication method.</p>
                <button @click="router.push('/auth')" class="error-button bg-blue-600 hover:bg-blue-700">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
                    Return to Login
                </button>
            </div>
        </div>
    </div>
</template>
