<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    import router from "@/router/index.ts";
    const error = ref<boolean>(false);
    import { useUserStore } from "@/stores/userStore.ts";
    import UserService from "@/services/userService.ts";
    import Loading from "@/components/ui/Loading.vue";
    import type { IExceptionResponse } from "@/types/services/api.d.ts";
    import logo from "@/assets/img/logo.webp";
    const userStore = useUserStore();
    const errorText = ref<string|undefined>(undefined);
    const isInvalidToken = ref<boolean>(false);
    const loading = ref<boolean>(true);

    onMounted(() => {
        const token: string = useRoute().params.token as string;
        if (!userStore.isLoggedIn()) {
            router.push(`/auth`)
            return;
        }
        UserService.verifyEmail(token)
            .then(() => {
                router.push(`/user/settings`)
            })
            .catch((err: IExceptionResponse) => {
                if (err.content.message == "invalid_token") {
                    errorText.value = "Invalid token";
                    isInvalidToken.value = true;
                } else {
                    errorText.value = "Failed to verify email";
                }
                error.value = true;
                loading.value = false;
            })
    })
</script>

<template>
    <div class="container px-4 py-12 flex min-h-full flex-1 flex-col justify-center">
        <div v-if="loading" class="flex justify-center">
            <Loading :loading="true" :error="error" :error-text="errorText"/>
        </div>
        <div v-else class="bg-gray-800 rounded-lg shadow-lg max-w-lg lg:min-w-lg md:min-w-md mx-auto p-6">
            <div class="text-center mb-8">
                <img :src="logo" alt="Logo" class="mx-auto h-16 w-auto mb-6" />
                <h2 class="text-gray-200 text-2xl font-bold">Email Verification</h2>
            </div>

            <div v-if="error" class="space-y-6">
                <div v-if="isInvalidToken" class="bg-red-900/50 p-4 rounded border-2 border-red-600 shadow-lg">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p class="text-sm font-medium text-red-300">{{ errorText }}</p>
                    </div>
                </div>
                <div v-else class="bg-red-900/50 p-3 rounded border border-red-700">
                    <p class="text-sm text-red-300">{{ errorText }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
