<script lang="ts" setup>
    import { ref, watch } from "vue";
    import { useUserStore } from "@/stores/userStore.js";
    import { EOAuthProvider } from "@/types/services/auth.d.ts";
    import AuthService from "@/services/authService.ts";
    import type { IUserData } from "@/types/user.d.ts";
    import { getSupportedOAuthProviders } from "@/helpers/app.js";
    import { useI18n } from "vue-i18n";
    import Button from "@/components/ui/Button.vue";
    import { useAuthStore } from "@/stores/authStore.ts";
    import router from "@/router/index.ts";
    import { useThemeStore } from "@/stores/themeStore.js";
    import { GoogleLogin } from "vue3-google-login";

    const props = defineProps<{
        userData: IUserData | null;
    }>();

    defineEmits<{
        (e: "saveProfileSettings"): void;
    }>();

    const { t } = useI18n();
    const googleProviderLoading = ref<boolean>(false);
    const githubProviderLoading = ref<boolean>(false);
    const supportedProviders = getSupportedOAuthProviders();
    // Stores
    const userStore = useUserStore();

    // Connected social accounts
    const connectedSocialAccounts = ref<EOAuthProvider[]>([]);

    // Initialize data from props
    watch(() => props.userData, (newUserData) => {
        if (newUserData) {
            connectedSocialAccounts.value = [];
            if (newUserData.google) {
                connectedSocialAccounts.value.push(EOAuthProvider.Google);
            }
            if (newUserData.github) {
                connectedSocialAccounts.value.push(EOAuthProvider.GitHub);
            }
        }
    }, { immediate: true });

    // OAuth functions
    const oauth = (provider: EOAuthProvider) => {
        AuthService.getOAuthUrl(provider)
            .then((res) => {
                window.location.href = res.content;
            });
    };

    const toggleSocialAccount = (provider: EOAuthProvider) => {
        const setLoading = (provider: EOAuthProvider, loading: boolean) => {
            switch (provider) {
                case EOAuthProvider.Google:
                    googleProviderLoading.value = loading;
                    break;
                case EOAuthProvider.GitHub:
                    githubProviderLoading.value = loading;
                    break;
                default:
                    break;
            }
        }

        setLoading(provider, true)
        const isConnected = connectedSocialAccounts.value.includes(provider);
        if (isConnected) {
            AuthService.revokeOAuth(provider)
                .then(() => {
                    connectedSocialAccounts.value = connectedSocialAccounts.value.filter(p => p !== provider);
                    setLoading(provider, false)
                });
        } else {
            setLoading(provider, true)
            oauth(provider)
        }
    };

    //@TODO: Make it reflect on enabled oauth providers. add pure-google logic
    const callback = (response: any) => {
        response.credential
        useAuthStore().oneTapToken = response.credential;
        router.push('/auth/google-one-tap/callback')
    }
</script>

<template>
    <div class="bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-700">
            <h2 class="text-lg font-medium text-gray-200">
                {{ t("accountSettingsView.connectedAccounts.title") }}</h2>
            <p class="mt-1 text-sm text-gray-400">{{ t("accountSettingsView.connectedAccounts.subtitle")
                }}</p>
        </div>
        <div class="p-6">
            <div class="pb-6 border-b border-gray-700">
                <h3 class="text-sm font-medium text-gray-400 mb-3">
                    {{ t("accountSettingsView.connectedAccounts.avatarSource.title") }}</h3>
                <p class="text-xs text-gray-400 mb-4">
                    {{ t("accountSettingsView.connectedAccounts.avatarSource.description") }}</p>

                <div class="space-y-2">
                    <label :class="{'opacity-50': !userData?.google?.avatar_url}"
                           class="flex items-center space-x-3">
                        <input v-model="userStore.avatarSource"
                               :disabled="!userData?.google?.avatar_url"
                               class="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                               type="radio"
                               value="google">
                        <span
                            class="text-sm text-gray-300">{{ t("accountSettingsView.connectedAccounts.avatarSource.google")
                            }}</span>
                        <span v-if="!userData?.google?.avatar_url"
                              class="text-xs text-gray-400">{{ t("accountSettingsView.connectedAccounts.avatarSource.notAvailable")
                            }}</span>
                    </label>

                    <label :class="{'opacity-50': !userData?.github?.avatar_url}"
                           class="flex items-center space-x-3">
                        <input v-model="userStore.avatarSource"
                               :disabled="!userData?.github?.avatar_url"
                               class="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                               type="radio"
                               value="github">
                        <span
                            class="text-sm text-gray-300">{{ t("accountSettingsView.connectedAccounts.avatarSource.github")
                            }}</span>
                        <span v-if="!userData?.github?.avatar_url"
                              class="text-xs text-gray-400">{{ t("accountSettingsView.connectedAccounts.avatarSource.notAvailable")
                            }}</span>
                    </label>

                    <label class="flex items-center space-x-3">
                        <input v-model="userStore.avatarSource"
                               class="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                               type="radio"
                               value="default">
                        <span
                            class="text-sm text-gray-300">{{ t("accountSettingsView.connectedAccounts.avatarSource.default")
                            }}</span>
                    </label>
                </div>
            </div>

            <ul class="divide-y divide-gray-700">
                <li v-if="supportedProviders.includes(EOAuthProvider.Google) || supportedProviders.includes(EOAuthProvider.GoogleOneTap)" class="py-4 flex justify-between items-center">
                    <div class="flex items-center">
                        <svg class="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                        </svg>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-200">
                                {{ t("accountSettingsView.connectedAccounts.avatarSource.google") }}</p>
                            <p class="text-xs text-gray-400">
                                {{ connectedSocialAccounts.includes(EOAuthProvider.Google) ? t("accountSettingsView.connectedAccounts.status.connected") : t("accountSettingsView.connectedAccounts.status.notConnected")
                                }}
                            </p>
                        </div>
                    </div>
                    <GoogleLogin v-if="!connectedSocialAccounts.includes(EOAuthProvider.Google) && supportedProviders.includes(EOAuthProvider.GoogleOneTap)" popup-type="token" :callback="callback" :id-configuration="{use_fedcm_for_button: true}" :button-config="{text: 'continue_with', theme: useThemeStore().theme == 'dark' ? 'filled_black' : 'filled_white'}"/>

                    <Button variant="primary" v-if="!connectedSocialAccounts.includes(EOAuthProvider.Google) && supportedProviders.includes(EOAuthProvider.Google)"
                            size="md" @click="toggleSocialAccount(EOAuthProvider.Google)" :loading="googleProviderLoading">
                        {{t("accountSettingsView.connectedAccounts.buttons.connect")}}
                    </Button>

                    <Button variant="danger" size="md" @click="toggleSocialAccount(EOAuthProvider.Google)" :loading="googleProviderLoading" v-if="(supportedProviders.includes(EOAuthProvider.Google) || supportedProviders.includes(EOAuthProvider.GoogleOneTap)) && connectedSocialAccounts.includes(EOAuthProvider.Google)">
                        {{t("accountSettingsView.connectedAccounts.buttons.disconnect")}}
                    </Button>
                </li>
                <li v-if="supportedProviders.includes(EOAuthProvider.GitHub)"
                    class="pt-4 flex justify-between items-center">
                    <div class="flex items-center">
                        <svg class="h-6 w-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path clip-rule="evenodd"
                                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                                  fill-rule="evenodd" />
                        </svg>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-200">
                                {{ t("accountSettingsView.connectedAccounts.avatarSource.github") }}</p>
                            <p class="text-xs text-gray-400">
                                {{ connectedSocialAccounts.includes(EOAuthProvider.GitHub) ? t("accountSettingsView.connectedAccounts.status.connected") : t("accountSettingsView.connectedAccounts.status.notConnected") }}
                            </p>
                        </div>
                    </div>
                    <Button :variant="connectedSocialAccounts.includes(EOAuthProvider.GitHub) ? 'danger' : 'primary'"
                            size="md" @click="toggleSocialAccount(EOAuthProvider.GitHub)" :loading="githubProviderLoading">
                        {{ connectedSocialAccounts.includes(EOAuthProvider.GitHub) ? t("accountSettingsView.connectedAccounts.buttons.disconnect") : t("accountSettingsView.connectedAccounts.buttons.connect") }}
                    </Button>
                </li>
            </ul>
        </div>
    </div>
</template>
0