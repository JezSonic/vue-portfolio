<script lang="ts" setup>
    import { ref } from "vue";
    import { ExceptionResponse } from "@/types/services/api.d";
    import router from "@/router";
    import { useUserStore } from "@/stores/userStore.ts";
    import { OAuthProvider } from "@/types/services/auth.d";
    import AuthService from "@/services/authService.ts";
    import logo from "@/assets/icons/logo.png";
    import Button from "@/components/ui/Button.vue";

    const password = ref<string>("");
    const email = ref<string>("");
    const name = ref<string>("");
    const success = ref<boolean>(false);
    const errors = ref<{ [key: string]: string[] } | null>(null);
    const userStore = useUserStore();
    const hasAccount = ref<boolean>(true);
    if (userStore.id !== null) {
        router.push("/settings");
    }
    const login = () => {
        AuthService.login(email.value, password.value)
            .then((res) => {
                success.value = true;
                userStore.id = res.content;
                userStore.token = res.token
            })
            .catch((e: ExceptionResponse) => {
                errors.value = e.errors;
            });
    };

    const register = () => {
        AuthService.register(email.value, name.value, password.value).then((data) => {
            success.value = true;
            userStore.token = data.token
        })
            .catch((e: ExceptionResponse) => {
                errors.value = e.errors;
            });
    };

    const oauth = (provider: OAuthProvider) => {
        AuthService.getOAuthUrl(provider)
            .then((res) => {
                window.location.href = res.content;
            });
    };
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img :src="logo" alt="Your Company" class="mx-auto h-16 w-auto" />
            <h2 v-if="hasAccount"
                class="text-white mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            <h2 v-else class="text-white mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create
                your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-6">
                <div>
                    <label class="text-white block text-sm/6 font-medium text-gray-900" for="email">Email
                        address</label>
                    <div class="mt-2">
                        <input id="email" v-model="email" :required="true" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                               name="email"
                               type="email" placeholder="E-mail..."/>
                    </div>
                </div>

                <div v-if="!hasAccount">
                    <label class="text-white block text-sm/6 font-medium text-gray-900" for="email">Name</label>
                    <div class="mt-2">
                        <input id="email" v-model="name" :required="true" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                               name="email"
                               type="email" placeholder="Name..."/>
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label class="text-white block text-sm/6 font-medium text-gray-900"
                               for="password">Password</label>
                    </div>
                    <div class="mt-2">
                        <input id="password" v-model="password" placeholder="Password..." :required="true" autocomplete="current-password"
                               class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" name="password"
                               type="password" />
                    </div>
                </div>

                <div v-if="hasAccount">
                    <button class="cursor-pointer flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            @click="login">
                        Sign in
                    </button>
                </div>

                <div v-else>
                    <button class="cursor-pointer flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            @click="register">
                        Create an account
                    </button>
                </div>
            </div>

            <p v-if="hasAccount" class="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?
                {{ " " }}
                <a class="font-semibold text-blue-600 hover:text-blue-500" href="#" @click="hasAccount = false">Create
                    an account instead</a>
            </p>

            <p v-else class="mt-10 text-center text-sm/6 text-gray-500">
                Already a member?
                {{ " " }}
                <a class="font-semibold text-blue-600 hover:text-blue-500" href="#" @click="hasAccount = true">Login to
                    your account</a>
            </p>
        </div>
        <div>
            <div class="flex justify-between items-center sm:mx-auto sm:w-full sm:max-w-sm mt-5 mb-2">
                <hr class="text-gray-500 w-24"/>
                <h2 class="font-semibold text-white min-w-fit">Or continue with</h2>
                <hr class="text-gray-500 w-24"/>
            </div>
            <div class="flex justify-between items-center sm:mx-auto sm:w-full sm:max-w-sm">
                <Button :display-loading-text="true" text="Google" @click="oauth(OAuthProvider.Google)" class="w-42"/>
                <Button :display-loading-text="true" text="GitHub" @click="oauth(OAuthProvider.GitHub)" class="w-42"/>
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