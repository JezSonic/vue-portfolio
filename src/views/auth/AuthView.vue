<script lang="ts" setup>
    import { ref } from "vue";
    import { IExceptionResponse } from "@/types/services/api.d";
    import router from "@/router";
    import { useUserStore } from "@/stores/userStore.ts";
    import { EOAuthProvider } from "@/types/services/auth.d";
    import AuthService from "@/services/authService.ts";
    import logo from "@/assets/icons/logo.png";
    import Button from "@/components/ui/Button.vue";
    import { useI18n } from "vue-i18n";
    import ApiService from "@/services/apiService";
    import { env, getSupportedOAuthProviders } from "@/helpers/app.ts";
    import { GoogleLogin } from "vue3-google-login";
    import { useThemeStore } from "@/stores/themeStore.ts";
    import { useAuthStore } from "@/stores/authStore.ts";


    const password = ref<string>("");
    const email = ref<string>("");
    const name = ref<string>("");
    const success = ref<boolean>(false);
    const errors = ref<{ [key: string]: string[] } | null>(null);
    const userStore = useUserStore();
    const hasAccount = ref<boolean>(true);
    const { t } = useI18n();

    // Loading states
    const isLoginLoading = ref<boolean>(false);
    const isRegisterLoading = ref<boolean>(false);
    const isGoogleLoading = ref<boolean>(false);
    const isGithubLoading = ref<boolean>(false);


    if (userStore.id !== null) {
        router.push("/user/settings");
    } else {
        userStore.logout();
    }

    const login = () => {
        isLoginLoading.value = true;
        ApiService.getIP().then((data) => {
            AuthService.login(email.value, password.value, data.ip)
                .then((res) => {
                    success.value = true;
                    userStore.id = res.id;
                    userStore.token = res.access_token;
                    userStore.tokenExpiration = new Date().getTime() + res.expires_in * 1000;
                    userStore.refreshToken = res.refresh_token;
                    router.push("/user/settings");
                })
                .catch((e: IExceptionResponse) => {
                    errors.value = e.errors;
                    isLoginLoading.value = false;
                });
        }).catch(() => {
            isLoginLoading.value = false;
        });
    };

    const register = () => {
        isRegisterLoading.value = true;
        AuthService.register(email.value, name.value, password.value).then((data) => {
            success.value = true;
            userStore.token = data.access_token;
            userStore.tokenExpiration = new Date().getTime() + data.expires_in * 1000;
            userStore.refreshToken = data.refresh_token;
            login();
        })
        .catch((e: IExceptionResponse) => {
            errors.value = e.errors;
            isRegisterLoading.value = false;
        });
    };

    // Override the OAuth method to handle loading states
    const performOAuth = (provider: EOAuthProvider) => {
        if (provider === EOAuthProvider.Google) {
            isGoogleLoading.value = true;
        } else if (provider === EOAuthProvider.GitHub) {
            isGithubLoading.value = true;
        }

        AuthService.performOAuth(provider);
    };

    const callback = (response: any) => {
        response.credential
        useAuthStore().oneTapToken = response.credential;
        router.push('/auth/google-one-tap/callback')
    }
</script>

<template>
    <div class="container px-1 py-12 flex min-h-full flex-1 flex-col justify-center">
        <div class="bg-gray-800 rounded-lg shadow-lg max-w-lg lg:min-w-lg md:min-w-md mx-auto p-6">
            <div class="text-center mb-8">
                <img :src="logo" :alt="t('authView.logo.alt')" class="mx-auto h-16 w-auto mb-6" />
                <h2 v-if="hasAccount"
                    class="text-gray-200 text-2xl font-bold">{{ t("authView.signIn.title") }}</h2>
                <h2 v-else class="text-gray-200 text-2xl font-bold">
                    {{ t("authView.register.title") }}</h2>
            </div>

            <div class="space-y-6">
                <div>
                    <label class="text-gray-300 block text-sm font-medium mb-1" for="email">
                        {{ t("authView.form.emailLabel") }}
                    </label>
                    <input id="email" v-model="email" :required="true" autocomplete="email"
                           class="block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           name="email"
                           type="email" :placeholder="t('authView.form.emailPlaceholder')" />
                </div>

                <div v-if="!hasAccount">
                    <label class="text-gray-300 block text-sm font-medium mb-1" for="name">
                        {{ t("authView.form.nameLabel") }}
                    </label>
                    <input id="name" v-model="name" :required="true" autocomplete="name"
                           class="block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           name="name"
                           type="text" :placeholder="t('authView.form.namePlaceholder')" />
                </div>

                <div>
                    <div class="flex items-center justify-between mb-1">
                        <label class="text-gray-300 block text-sm font-medium"
                               for="password">{{ t("authView.form.passwordLabel") }}</label>
                        <label v-if="hasAccount && env('ENABLE_EMAILING')"
                               class="text-blue-400 hover:text-blue-300 block text-sm font-medium cursor-pointer"
                               for="password"
                               @click="AuthService.requestPasswordReset(email)">{{ t("authView.form.forgotPasswordLabel") }}</label>
                    </div>
                    <input id="password" v-model="password" :placeholder="t('authView.form.passwordPlaceholder')"
                           :required="true" autocomplete="current-password"
                           class="block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           name="password"
                           type="password" />
                </div>

                <div v-if="hasAccount">
                    <Button
                        variant="primary"
                        @click="login"
                        :text="t('authView.signIn.button')"
                        :loading="isLoginLoading"
                        :loading-text="t('authView.signIn.loading')"
                        fullWidth
                    />
                </div>

                <div v-else>
                    <Button
                        variant="primary"
                        @click="register"
                        :text="t('authView.register.button')"
                        :loading="isRegisterLoading"
                        :loading-text="t('authView.register.loading')"
                        fullWidth
                    />
                </div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-700">
                <p v-if="hasAccount" class="text-center text-sm text-gray-400">
                    {{ t("authView.signIn.noAccount") }}&nbsp;
                    <a class="font-semibold text-blue-400 hover:text-blue-300" href="#"
                       @click="hasAccount = false">{{ t("authView.signIn.createAccount") }}</a>
                </p>

                <p v-else class="text-center text-sm text-gray-400">
                    {{ t("authView.register.hasAccount") }}&nbsp;
                    <a class="font-semibold text-blue-400 hover:text-blue-300" href="#"
                       @click="hasAccount = true">{{ t("authView.register.loginInstead") }}</a>
                </p>
            </div>

            <div v-if="getSupportedOAuthProviders().length > 0" class="mt-6">
                <div class="flex justify-between items-center mb-4">
                    <hr class="border-gray-700 w-full" />
                    <span class="px-3 text-gray-400 font-medium text-nowrap">{{ t("authView.oauth.title") }}</span>
                    <hr class="border-gray-700 w-full" />
                </div>
                <div class="flex justify-center items-center gap-4 flex-col" >
                    <GoogleLogin popup-type="token" :callback="callback" :id-configuration="{use_fedcm_for_button: true}" :button-config="{text: 'continue_with', theme: useThemeStore().theme == 'dark' ? 'filled_black' : 'filled_white'}"/>
                    <Button 
                        variant="secondary"
                        full-width
                        class="max-w-[290px]"
                        :text="t('authView.oauth.github')" 
                        v-if="getSupportedOAuthProviders().includes(EOAuthProvider.GitHub)"
                        @click="performOAuth(EOAuthProvider.GitHub)" 
                        :loading="isGithubLoading">
                        <font-awesome-icon class="mr-2" :icon="['fab', 'github']" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    input {
        transition: all 0.3s ease;

        &:focus {
            border-color: #3b82f6;
        }
    }
</style>
