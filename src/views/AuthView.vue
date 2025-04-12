<script setup lang="ts">

import Button from "@/components/ui/Button.vue";
import { ref } from "vue";
import ApiService from "@/services/apiService.ts";
import { ExceptionResponse } from "@/types/services/api.d";
const password = ref<string>("");
const email = ref<string>("");
const errors =ref<{[key: string]: string[]}|null>(null);
</script>

<template>
<div class="login-form">
    <input type="email" v-model="email" />
    <p v-if="errors !== null && errors['email']" v-for="(item, index) in errors['email']" :key="index">{{ item }}</p>
    <input type="password" v-model="password"/>
    <p v-if="errors !== null && errors['password']" v-for="(item, index) in errors['password']" :key="index">{{ item }}</p>
    <Button :text="'Submit'" @click="() => {
        ApiService.post('auth/login', {
            email: email,
            password: password
        })
        .then(console.log)
        .catch((e: ExceptionResponse) => {
            errors = e.errors
        })
    }" />
</div>
</template>

<style scoped lang="scss">

</style>