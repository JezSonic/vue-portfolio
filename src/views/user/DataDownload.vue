<script lang="ts" setup>
    import { computed, onMounted, ref } from "vue";
    import router from "@/router";
    import { useUserStore } from "@/stores/userStore.ts";
    import Loading from "@/components/ui/Loading.vue";
    import UserService from "@/services/userService.ts";
    import { getApiUrl } from "@/helpers/app.ts";
    import { useI18n } from "vue-i18n";
    import Button from "@/components/ui/Button.vue";
    import { EUserExportDataStatus } from "@/types/user.d.ts";

    const userStore = useUserStore()
    const isLoading = ref<boolean>(true);
    const dataStatus = ref<EUserExportDataStatus>(EUserExportDataStatus.NOT_FOUND);
    const validUntil = ref<number>(0);
    const error = ref<boolean>(false);

    const { t } = useI18n();

    onMounted(() => {
        const _id = userStore.id;
        if (!_id) {
            router.push(`/auth`)
            return;
        }

        UserService.checkUserDataExportStatus(_id)
            .then((status) => {
                isLoading.value = false;
                dataStatus.value = status.status;
                validUntil.value = status.valid_until || 0;
            })
            .catch(() => {
                isLoading.value = false;
                error.value = true;
            });
    });

    const statusClass = computed(() => {
        if (dataStatus.value === EUserExportDataStatus.COMPLETED) {
            return 'text-green-500 bg-green-500/20';
        } else if (dataStatus.value === EUserExportDataStatus.QUEUED || dataStatus.value === EUserExportDataStatus.PROCESSING) {
            return 'text-amber-500 bg-amber-500/20';
        } else if (dataStatus.value === EUserExportDataStatus.NOT_FOUND || dataStatus.value === EUserExportDataStatus.FAILED) {
            return 'text-red-500 bg-red-500/20';
        }
    })
</script>

<template>
    <div class="flex flex-col absolute items-center justify-center w-full top-1/2 left-1/2 translate-[-50%] py-0 px-4 sm:px-2">
        <Loading :loading="isLoading" :error="error" v-if="isLoading"/>
        <div v-else class="bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full p-6">
            <div class="pb-4 border-b border-gray-700 mb-6">
                <h2 class="text-xl font-medium text-gray-200">{{ t("accountSettingsView.security.dataExport.title") }}</h2>
            </div>

            <div class="flex flex-col items-center space-y-6 px-4">
                <!-- Status message -->
                <div class="flex flex-col items-center mb-4">
                    <div :class="`flex items-center justify-center rounded-full ${statusClass} w-16 h-16`">
                        <svg v-if="dataStatus === EUserExportDataStatus.COMPLETED" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <svg v-else-if="dataStatus === EUserExportDataStatus.QUEUED || dataStatus === EUserExportDataStatus.PROCESSING" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p class="text-xl font-medium text-center text-gray-200 mt-2">
                        {{ t(`userDataExport.status.${dataStatus}`) }}
                    </p>
                </div>

                <!-- Valid until information -->
                <div v-if="validUntil && dataStatus === EUserExportDataStatus.COMPLETED" class="text-center space-y-2 w-full">
                    <p class="text-gray-300 text-md">
                        {{ t(`userDataExport.validUntil {datetime}`, {datetime: new Date(validUntil * 1000).toLocaleString()}) }}
                    </p>
                    <p class="text-gray-400 text-sm italic">
                        {{ t(`userDataExport.validUntil.subtext`) }}
                    </p>
                </div>

                <!-- Download button -->
                <div v-if="dataStatus === EUserExportDataStatus.COMPLETED" class="mt-6 w-full flex justify-center">
                    <a
                        download
                        :href="getApiUrl() + `user/${userStore.id}/export-data/download`"
                        class="rounded-md bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer flex items-center justify-center transition-colors w-full max-w-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {{ t("userDataExport.download") }}
                    </a>
                </div>

                <!-- Return to settings button -->
                <div class="mt-1 w-full flex justify-center">
                    <Button @click="router.push('/user/settings?tab=security')" class="w-full max-w-xs">
                        {{ t("accountSettingsView.tabs.security") }}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
