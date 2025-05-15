<script lang="ts" setup>
    import { ref } from "vue";
    import { ExceptionResponse } from "@/types/services/api.d";
    import router from "@/router";
    import { useUserStore } from "@/stores/userStore.ts";
    import { OAuthProvider } from "@/types/services/auth.d";
    import AuthService from "@/services/authService.ts";
    import logo from "@/assets/icons/logo.png";
    import Button from "@/components/ui/Button.vue";
    import { useI18n } from "vue-i18n";
import ApiService from "@/services/apiService";

    const password = ref<string>("");
    const email = ref<string>("");
    const name = ref<string>("");
    const success = ref<boolean>(false);
    const errors = ref<{ [key: string]: string[] } | null>(null);
    const userStore = useUserStore();
    const hasAccount = ref<boolean>(true);
    const { t } = useI18n();
    if (userStore.id !== null) {
        router.push("/settings");
    }
    const login = () => {
        ApiService.getIP().then((data) => {
            AuthService.login(email.value, password.value, data.ip)
                .then((res) => {
                    success.value = true;
                    userStore.id = res.content;
                    userStore.token = res.token
                    router.push('/settings')
                })
                .catch((e: ExceptionResponse) => {
                    errors.value = e.errors;
                });
        })
    };

    const register = () => {
        AuthService.register(email.value, name.value, password.value).then((data) => {
            success.value = true;
            userStore.token = data.token
            router.push('/settings')
        })
            .catch((e: ExceptionResponse) => {
                errors.value = e.errors;
            });
    };
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img :src="logo" :alt="t('authView.logo.alt')" class="mx-auto h-16 w-auto" />
            <h2 v-if="hasAccount"
                class="!text-white mt-10 text-center text-2xl/9 font-bold tracking-tight">{{ t('authView.signIn.title') }}</h2>
            <h2 v-else class="!text-white mt-10 text-center text-2xl/9 font-bold tracking-tight">{{ t('authView.register.title') }}</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-6">
                <div>
                    <label class="!text-white block text-sm/6 font-medium" for="email">{{ t('authView.form.emailLabel') }}</label>
                    <div class="mt-2">
                        <input id="email" v-model="email" :required="true" autocomplete="email" class="block w-full rounded-md dark:bg-gray-700 bg-white px-3 py-1.5 text-base dark:text-white text-gray-900 outline-1 -outline-offset-1 outline-gray-300 dark:placeholder:text-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                               name="email"
                               type="email" :placeholder="t('authView.form.emailPlaceholder')"/>
                    </div>
                </div>

                <div v-if="!hasAccount">{{ t('authView.form.nameLabel') }}
                    <label class="!text-white block text-sm/6 font-medium" for="name"></label>
                    <div class="mt-2">
                        <input id="name" v-model="name" :required="true" autocomplete="name" class="block w-full rounded-md dark:bg-gray-700 bg-white px-3 py-1.5 text-base dark:text-white text-gray-900 outline-1 -outline-offset-1 outline-gray-300 dark:placeholder:text-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                               name="name"
                               type="text" :placeholder="t('authView.form.namePlaceholder')"/>
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label class="!text-white block text-sm/6 font-medium"
                               for="password">{{ t('authView.form.passwordLabel') }}</label>
                    </div>
                    <div class="mt-2">
                        <input id="password" v-model="password" :placeholder="t('authView.form.passwordPlaceholder')" :required="true" autocomplete="current-password"
                               class="block w-full rounded-md dark:bg-gray-700 bg-white px-3 py-1.5 text-base dark:text-white text-gray-900 outline-1 -outline-offset-1 outline-gray-300 dark:placeholder:text-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" name="password"
                               type="password" />
                    </div>
                </div>

                <div v-if="hasAccount">
                    <button class="cursor-pointer flex w-full justify-center rounded-md bg-blue-600 dark:bg-blue-700 px-3 py-1.5 text-sm/6 font-semibold !text-white shadow-xs hover:bg-blue-500 dark:hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            @click="login">
                        {{ t('authView.signIn.button') }}
                    </button>
                </div>

                <div v-else>
                    <button class="cursor-pointer flex w-full justify-center rounded-md bg-blue-600 dark:bg-blue-700 px-3 py-1.5 text-sm/6 font-semibold !text-white shadow-xs hover:bg-blue-500 dark:hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            @click="register">
                        {{ t('authView.register.button') }}
                    </button>
                </div>
            </div>

            <p v-if="hasAccount" class="mt-10 text-center text-sm/6 !text-gray-400">
                {{ t('authView.signIn.noAccount') }}&nbsp;
                <a class="font-semibold !text-blue-400 hover:!text-blue-300" href="#" @click="hasAccount = false">{{ t('authView.signIn.createAccount') }}</a>
            </p>

            <p v-else class="mt-10 text-center text-sm/6 !text-gray-400">
                {{ t('authView.register.hasAccount') }}&nbsp;
                <a class="font-semibold !text-blue-400 hover:!text-blue-300" href="#" @click="hasAccount = true">{{ t('authView.register.loginInstead') }}</a>
            </p>
        </div>
        <div>
            <div class="flex justify-between items-center sm:mx-auto sm:w-full sm:max-w-sm mt-5 mb-2">
                <hr class="dark:text-gray-600 !text-gray-300 w-24"/>
                <h2 class="font-semibold dark:text-white !text-white min-w-fit">{{ t('authView.oauth.title') }}</h2>
                <hr class="dark:text-gray-600 !text-gray-300 w-24"/>
            </div>
            <div class="flex justify-between items-center sm:mx-auto sm:w-full sm:max-w-sm">
                <Button :display-loading-text="true" :text="t('authView.oauth.google')" @click="AuthService.performOAuth(OAuthProvider.Google)" class="w-42">
                    <font-awesome-icon class="mr-2" style="color: #DB4437;" :icon="['fab', 'google']" />
                </Button>
                <Button :display-loading-text="true" :text="t('authView.oauth.github')" @click="AuthService.performOAuth(OAuthProvider.GitHub)" class="w-42">
                    <font-awesome-icon class="mr-2" :icon="['fab', 'github']" />
                </Button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .login-form {
        display: flex;
        flex-direction: column;
        gap: 16px;

        button {
            width: 100%;
        }
    }


    input {
        min-width: 342px;
    }

    .social-accounts {
        display: flex;
        gap: 12px;
    }
</style>
