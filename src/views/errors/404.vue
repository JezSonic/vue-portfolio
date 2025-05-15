<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <div class="text-center">
        <h3 class="sm:text-3xl font-semibold text-blue-600">{{ t('errors.notFound.code') }}</h3>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance !text-white sm:text-7xl">{{ t('errors.notFound.title') }}</h1>
        <p class="mt-6 text-lg font-medium text-pretty !text-white sm:text-xl/8">{{ t('errors.notFound.message') }}</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="/" class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold !text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{ t('errors.notFound.homeButton') }}</a>
            <a href="/contact" class="text-sm font-semibold !text-white">{{ t('errors.notFound.contactButton') }} <span aria-hidden="true">&rarr;</span></a>
        </div>
    </div>
</template>
