<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    const error = ref<boolean>(false);
    const success = ref<boolean>(false);
    const isInvalidToken = ref<boolean>(false);
    import Loading from "@/components/ui/Loading.vue";
    import Button from "@/components/ui/Button.vue";
    import type { IExceptionResponse } from "@/types/services/api.d.ts";
    import logo from "@/assets/img/logo.webp";
    import { useI18n } from "vue-i18n";
    import AuthService from "@/services/authService.ts";
    import router from "@/router/index.ts";
    const errorText = ref<string|undefined>(undefined);
    const loading = ref<boolean>(true);
    const isResetLoading = ref<boolean>(false);
    const { t } = useI18n();
    const password = ref<string>("");
    const passwordConfirm = ref<string>("");
    const token = ref<string>("");
    const isCreatingNewPassword = ref<boolean>(false);
    onMounted(() => {
        token.value = useRoute().params.token as string;
        AuthService.verifyPasswordResetToken(token.value)
            .then((data) => {
                isCreatingNewPassword.value = data.creating_password;
                if (!data.content) {
                    errorText.value = t('authView.resetPassword.errors.tokenExpired');
                    error.value = true;
                    loading.value = false;
                } else {
                    error.value = false;
                    loading.value = false;
                }
            })
            .catch((err: IExceptionResponse) => {
                if (err.content.message == "invalid_token") {
                    errorText.value = t('authView.resetPassword.errors.invalidToken');
                    isInvalidToken.value = true;
                }
                error.value = true;
                loading.value = false;
            })
    })

    const resetPassword = () => {
        if (password.value !== passwordConfirm.value) {
            errorText.value = t('authView.resetPassword.errors.passwordsDoNotMatch');
            error.value = true;
            isInvalidToken.value = false;
            return;
        }

        isResetLoading.value = true;
        error.value = false;
        isInvalidToken.value = false;

        AuthService.resetPassword(token.value, password.value)
            .then((data) => {
                if (data.content) {
                    success.value = true;
                    isResetLoading.value = false;
                    // Redirect after a short delay to show the success message
                    setTimeout(() => {
                        router.push('/auth');
                    }, 2000);}
            })
            .catch((err: IExceptionResponse) => {
                if (err.content.message == "invalid_token") {
                    errorText.value = t('authView.resetPassword.errors.invalidToken');
                    isInvalidToken.value = true;
                } else {
                    errorText.value = t('authView.resetPassword.errors.generic');
                    isInvalidToken.value = false;
                }
                error.value = true;
                isResetLoading.value = false;
            })
    }
</script>

<template>
    <div class="container px-4 py-12 flex min-h-full flex-1 flex-col justify-center h-100">
        <div v-if="loading" class="flex justify-center">
            <Loading :loading="true" :error="error" :error-text="errorText"/>
        </div>
        <div v-else class="bg-gray-800 rounded-lg shadow-lg max-w-lg lg:min-w-lg md:min-w-md mx-auto p-6">
            <div class="text-center mb-8">
                <img :src="logo" :alt="t('authView.logo.alt')" class="mx-auto h-16 w-auto mb-6" />
                <h2 class="text-gray-200 text-2xl font-bold">{{ isCreatingNewPassword ? t('authView.resetPassword.createTitle') : t('authView.resetPassword.title') }}</h2>
            </div>

            <div v-if="success" class="mb-6">
                <div class="bg-green-900/50 p-3 rounded border border-green-700 mb-4">
                    <p class="text-sm text-green-300">{{ isCreatingNewPassword ? t('authView.resetPassword.createSuccess') : t('authView.resetPassword.success') }}</p>
                </div>
                <p class="text-center text-sm text-gray-400">{{ t('authView.resetPassword.redirecting') }}</p>
            </div>

            <div v-else-if="error" class="space-y-6">
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
                <div v-if="!isInvalidToken">
                    <label class="text-gray-300 block text-sm font-medium mb-1" 
                           for="newPassword">{{ t('authView.form.newPasswordLabel') }}</label>
                    <input id="newPassword" v-model="password" :placeholder="t('authView.form.newPasswordPlaceholder')" :required="true"
                           class="transition-all duration-300 ease-in-out block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           name="password" type="password" />
                </div>

                <div v-if="!isInvalidToken">
                    <label class="text-gray-300 block text-sm font-medium mb-1"
                           for="confirmNewPassword">{{ t('authView.form.confirmNewPasswordLabel') }}</label>
                    <input id="confirmNewPassword" v-model="passwordConfirm" :placeholder="t('authView.form.confirmNewPasswordPlaceholder')" :required="true"
                           class="transition-all duration-300 ease-in-out block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           name="password" type="password" />
                </div>
                <div v-if="!isInvalidToken">
                    <Button
                        variant="primary"
                        @click="resetPassword"
                        :text="isCreatingNewPassword ? t('authView.resetPassword.createButton') : t('authView.resetPassword.button')"
                        :loading="isResetLoading"
                        :loading-text="isCreatingNewPassword ? t('authView.resetPassword.createLoading') : t('authView.resetPassword.loading')"
                        fullWidth
                    />
                </div>
            </div>

            <div v-else class="space-y-6">
                <div>
                    <label class="text-gray-300 block text-sm font-medium mb-1"
                           for="newPassword">{{ t('authView.form.newPasswordLabel') }}</label>
                    <input id="newPassword" v-model="password" :placeholder="t('authView.form.newPasswordPlaceholder')" :required="true"
                           class="transition-all duration-300 ease-in-out block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           name="password" type="password" />
                </div>

                <div>
                    <label class="text-gray-300 block text-sm font-medium mb-1"
                           for="confirmNewPassword">{{ t('authView.form.confirmNewPasswordLabel') }}</label>
                    <input id="confirmNewPassword" v-model="passwordConfirm" :placeholder="t('authView.form.confirmNewPasswordPlaceholder')" :required="true"
                           class="transition-all duration-300 ease-in-out block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           name="password" type="password" />
                </div>
                <div>
                    <Button
                        variant="primary"
                        @click="resetPassword"
                        :text="isCreatingNewPassword ? t('authView.resetPassword.createButton') : t('authView.resetPassword.button')"
                        :loading="isResetLoading"
                        :loading-text="isCreatingNewPassword ? t('authView.resetPassword.createLoading') : t('authView.resetPassword.loading')"
                        fullWidth
                    />
                </div>
            </div>
        </div>
    </div>
</template>
