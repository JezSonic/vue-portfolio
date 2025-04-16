<script lang="ts" setup>

    import Button from "@/components/ui/Button.vue";
    import { ref } from "vue";
    import ApiService from "@/services/apiService.ts";
    import { ExceptionResponse } from "@/types/services/api.d";
    import router from "@/router";
    import { useUserStore } from "@/stores/userStore.ts";
    import { OAuthProvider } from "@/types/services/auth.d";
    import AuthService from "@/services/authService.ts";

    const login_password = ref<string>("");
    const login_email = ref<string>("");
    const register_password = ref<string>("");
    const register_email = ref<string>("");
    const success = ref<boolean>(false);
    const errors = ref<{ [key: string]: string[] } | null>(null);

    const login = () => {
        ApiService.post<{ content: number }, { email: string, password: string }>("auth/login", {
            email: login_email.value,
            password: login_password.value
        })
            .then((res) => {
                success.value = true;
                useUserStore().id = res.content;
                router.push("/profile");
            })
            .catch((e: ExceptionResponse) => {
                errors.value = e.errors;
            });
    };

    const register = () => {
        ApiService.post<{ content: number }, { email: string, password: string }>("auth/register", {
            email: register_email.value,
            password: register_password.value
        })
            .then(() => {
                success.value = true;
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
    <div class="login-form">
        <h2>Login</h2>
        <input v-model="login_email" placeholder="Email..." type="email" />
        <p v-for="(item, index) in errors['email']" v-if="errors !== null && errors['email']" :key="index">{{ item }}</p>
        <input v-model="login_password" placeholder="Password..." type="password" />
        <p v-for="(item, index) in errors['password']" v-if="errors !== null && errors['password']" :key="index">{{ item }}</p>
        <Button :disabled="login_email.length == 0 || login_password.length == 0" :text="'Submit'" @click="login" :display-loading-text="true" />
        <h2>...or create an account</h2>
        <input v-model="register_email" placeholder="Email..." type="email" />
        <p v-for="(item, index) in errors['email']" v-if="errors !== null && errors['email']" :key="index">{{ item }}</p>
        <input v-model="register_password" placeholder="Password..." type="password" />
        <p v-for="(item, index) in errors['password']" v-if="errors !== null && errors['password']" :key="index">{{ item }}</p>
        <Button :disabled="register_email.length == 0 || register_password.length == 0" :text="'Submit'"
                @click="register" :display-loading-text="true" />
        <h2>Authenticate using social accounts</h2>
        <div class="social-accounts">
            <Button text="Google" @click="oauth(OAuthProvider.Google)" :display-loading-text="true" />
            <Button text="GitHub" @click="oauth(OAuthProvider.GitHub)" :display-loading-text="true" />
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