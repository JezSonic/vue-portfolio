<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    const error = ref<boolean>(false);
    import Loading from "@/components/ui/Loading.vue";
    import type { ExceptionResponse } from "@/types/services/api.d.ts";
    import logo from "@/assets/icons/logo.png";
    import { useI18n } from "vue-i18n";
    import AuthService from "@/services/authService.ts";
    import router from "@/router/index.ts";
    import { env } from "@/helpers/app.js";
    const errorText = ref<string|undefined>(undefined);
    const loading = ref<boolean>(true);
    const { t } = useI18n();
    const password = ref<string>("");
    const passwordConfirm = ref<string>("");
    const token = ref<string>("");
    onMounted(() => {
        token.value = useRoute().params.token as string;
        AuthService.verifyPasswordResetToken(token.value)
            .then((data) => {
                if (!data.content) {
                    errorText.value = "Provided password reset token is outdated. Please request the password reset again.";
                    error.value = true;
                    loading.value = true;
                } else {
                    error.value = false;
                    loading.value = false;
                }
            })
            .catch((err: ExceptionResponse) => {
                if (err.message == "invalid_token") {
                    errorText.value = "Invalid email verification token provided";
                }
                error.value = true;
            })
    })

    const resetPassword = () => {
        if (password.value !== passwordConfirm.value) {
            errorText.value = "Passwords do not match";
            return;
        }
        AuthService.resetPassword(token.value, password.value)
            .then(() => {
                router.push('/auth')
            })
            .catch((err: ExceptionResponse) => {
                if (err.message == "invalid_token") {
                    errorText.value = "Invalid password reset token provided";
                }
                error.value = true;
            })
    }
</script>

<template>
    <div v-if="loading" class="loading">
        <Loading :loading="true" :error="error" :error-text="errorText"/>
    </div>
    <div v-else class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img :src="logo" :alt="t('authView.logo.alt')" class="mx-auto h-16 w-auto" />
            <h2 class="!text-white mt-10 text-center text-2xl/9 font-bold tracking-tight">{{ t('authView.resetPassword.title') }}</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-6">
                <div>
                    <div class="flex items-center justify-between">
                        <label class="!text-white block text-sm/6 font-medium"
                               for="newPassword">{{ t('authView.form.newPasswordLabel') }}</label>
                    </div>
                    <div class="mt-2">
                        <input id="newPassword" v-model="password" :placeholder="t('authView.form.newPasswordPlaceholder')" :required="true"
                               class="block w-full rounded-md dark:bg-gray-700 bg-white px-3 py-1.5 text-base dark:text-white text-gray-900 outline-1 -outline-offset-1 outline-gray-300 dark:placeholder:text-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" name="password"
                               type="password" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label class="!text-white block text-sm/6 font-medium"
                               for="confirmNewPassword">{{ t('authView.form.confirmNewPasswordLabel') }}</label>
                    </div>
                    <div class="mt-2">
                        <input id="confirmNewPassword" v-model="passwordConfirm" :placeholder="t('authView.form.confirmNewPasswordPlaceholder')" :required="true"
                               class="block w-full rounded-md dark:bg-gray-700 bg-white px-3 py-1.5 text-base dark:text-white text-gray-900 outline-1 -outline-offset-1 outline-gray-300 dark:placeholder:text-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" name="password"
                               type="password" />
                    </div>
                </div>
                <div>
                    <button class="cursor-pointer flex w-full justify-center rounded-md bg-blue-600 dark:bg-blue-700 px-3 py-1.5 text-sm/6 font-semibold !text-white shadow-xs hover:bg-blue-500 dark:hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            @click="resetPassword">
                        {{ t('authView.resetPassword.button') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    div.loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%; right: 50%;
        transform: translate(50%,-50%);
    }
</style>