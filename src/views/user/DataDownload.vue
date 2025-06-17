<script lang="ts" setup>
    import { onMounted, ref } from "vue";
    import router from "@/router";
    import { useUserStore } from "@/stores/userStore.ts";
    import Loading from "@/components/ui/Loading.vue";
    import UserService from "@/services/userService.ts";
    import { getApiUrl } from "@/helpers/app.ts";
    import { useI18n } from "vue-i18n";
    import Button from "@/components/ui/Button.vue";
    import { UserExportDataStatus } from "@/types/user.d.ts";

    const userStore = useUserStore()
    const isLoading = ref<boolean>(true);
    const dataStatus = ref<UserExportDataStatus>(UserExportDataStatus.NOT_FOUND);
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
                validUntil.value = status.valid_until;
            })
            .catch(() => {
                isLoading.value = false;
                error.value = true;
            });
    });
</script>

<template>
    <div class="data-download-container">
        <Loading :loading="isLoading" :error="error" v-if="isLoading"/>

        <div v-else class="bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full p-6">
            <div class="px-6 py-4 border-b border-gray-700 mb-6">
                <h2 class="text-xl font-medium text-gray-200">{{ t("accountSettingsView.security.dataExport.title") }}</h2>
            </div>

            <div class="flex flex-col items-center space-y-6 px-4">
                <!-- Status message -->
                <div class="status-container">
                    <div class="status-icon" :class="dataStatus">
                        <svg v-if="dataStatus === UserExportDataStatus.COMPLETED" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <svg v-else-if="dataStatus === UserExportDataStatus.QUEUED || dataStatus === UserExportDataStatus.PROCESSING" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <div v-if="validUntil && dataStatus === 'completed'" class="text-center space-y-2 w-full">
                    <p class="text-gray-300 text-md">
                        {{ t(`userDataExport.validUntil {datetime}`, {datetime: new Date(validUntil * 1000).toLocaleString()}) }}
                    </p>
                    <p class="text-gray-400 text-sm italic">
                        {{ t(`userDataExport.validUntil.subtext`) }}
                    </p>
                </div>

                <!-- Download button -->
                <div v-if="dataStatus === 'completed'" class="mt-6 w-full flex justify-center">
                    <a 
                        download 
                        :href="getApiUrl() + `user/${userStore.id}/export-data/download`"
                        class="rounded-md bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer flex items-center justify-center transition-colors w-full max-w-xs"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {{ t("userDataExport.download") }}
                    </a>
                </div>

                <!-- Return to settings button -->
                <div class="mt-4 w-full flex justify-center">
                    <Button @click="router.push('/user/settings')" class="w-full max-w-xs">
                        {{ t("accountSettingsView.tabs.security") }}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .data-download-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%; 
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        padding: 0 1rem;
    }

    .status-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    .status-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        margin-bottom: 1rem;

        &.completed {
            background-color: rgba(16, 185, 129, 0.2);
            color: #10b981; /* green-500 */
        }

        &.pending, &.queued {
            background-color: rgba(245, 158, 11, 0.2);
            color: #f59e0b; /* amber-500 */
        }

        &.failed, &.not_found {
            background-color: rgba(239, 68, 68, 0.2);
            color: #ef4444; /* red-500 */
        }
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .data-download-container {
            padding: 0 0.5rem;
        }
    }
</style>
