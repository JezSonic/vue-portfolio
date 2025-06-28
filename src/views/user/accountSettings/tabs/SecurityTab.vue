<script lang="ts" setup>
import { ref } from "vue";
import UserService from "@/services/userService.ts";
import { useUserStore } from "@/stores/userStore.js";
import { env } from "@/helpers/app.js";
import type { IUserData } from "@/types/user.d.ts";
import { useI18n } from "vue-i18n";
import Button from "@/components/ui/Button.vue";

const { t } = useI18n();

defineProps<{
    userData: IUserData | null;
}>();

// User store
const userStore = useUserStore();

// Password change
const currentPassword = ref<string>("");
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");
const passwordError = ref<string>("");
const passwordSuccess = ref<string>("");
const isPasswordUpdateLoading = ref<boolean>(false);

// Account deletion
const showDeleteConfirm = ref<boolean>(false);
const isDeleteAccountLoading = ref<boolean>(false);

// Export user data
const exportDataStatus = ref<string>("");
const exportDataError = ref<boolean>(false);
const exportDataSuccess = ref<boolean>(false);
const exportDataLink = ref<string>("");
const isExportDataLoading = ref<boolean>(false);

// Update password
const updatePassword = () => {
    passwordError.value = "";
    passwordSuccess.value = "";

    if (!currentPassword.value) {
        passwordError.value = t("accountSettingsView.security.changePassword.errors.required");
        return;
    }

    if (newPassword.value.length < 8) {
        passwordError.value = t("accountSettingsView.security.changePassword.errors.length");
        return;
    }

    if (newPassword.value !== confirmPassword.value) {
        passwordError.value = t("accountSettingsView.security.changePassword.errors.match");
        return;
    }

    isPasswordUpdateLoading.value = true;

    // Here you would call an API to update the password
    // Example:
    // UserService.updatePassword(currentPassword.value, newPassword.value)
    //     .then(() => {
    //         passwordSuccess.value = t('accountSettingsView.security.changePassword.success');
    //         currentPassword.value = '';
    //         newPassword.value = '';
    //         confirmPassword.value = '';
    //     })
    //     .catch((err) => {
    //         passwordError.value = err.message || 'Failed to update password';
    //     })
    //     .finally(() => {
    //         isPasswordUpdateLoading.value = false;
    //     });

    // For demo purposes:
    setTimeout(() => {
        passwordSuccess.value = t("accountSettingsView.security.changePassword.success");
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
        isPasswordUpdateLoading.value = false;
    }, 1000);
};

// Export user data
const exportUserData = () => {
    exportDataStatus.value = "";
    exportDataError.value = false;
    exportDataSuccess.value = false;
    exportDataLink.value = "";
    isExportDataLoading.value = true;

    UserService.exportUserData()
        .then((data) => {
            if (data.content) {
                exportDataSuccess.value = true;
                exportDataStatus.value = t("userDataExport.status.sent");
                exportDataLink.value = `/user/download-data`;
            } else {
                exportDataError.value = true;
                exportDataStatus.value = t("userDataExport.status.failed");
            }
        })
        .catch(() => {
            exportDataError.value = true;
            exportDataStatus.value = t("userDataExport.status.failed");
        })
        .finally(() => {
            isExportDataLoading.value = false;
        });
};

// Account deletion
const confirmDeleteAccount = () => {
    showDeleteConfirm.value = true;
};

const cancelDeleteAccount = () => {
    showDeleteConfirm.value = false;
};

const deleteAccount = () => {
    isDeleteAccountLoading.value = true;
    UserService.deleteAccount()
        .finally(() => {
            userStore.logout();
            // Logout and redirect
            window.location.href = "/";
            // Note: No need to reset isDeleteAccountLoading since we're redirecting
        });
    showDeleteConfirm.value = false;
};
</script>

<template>
    <div class="bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-700">
            <h2 class="text-lg font-medium text-gray-200">
                {{ t("accountSettingsView.security.title") }}</h2>
            <p class="mt-1 text-sm text-gray-400">{{ t("accountSettingsView.security.subtitle") }}</p>
        </div>
        <div class="p-6">
            <div class="mb-6" v-if="env('VITE_APP_ENABLE_EMAILING', false)">
                <h3 class="text-sm font-medium text-gray-400 mb-2">
                    {{ t("accountSettingsView.security.changePassword.title") }}
                    <small class="text-xs text-gray-400 mb-4">
                        (beta)
                    </small>
                </h3>
                <div v-if="passwordSuccess" class="mb-4 p-3 bg-green-900 text-green-300 rounded">
                    {{ passwordSuccess }}
                </div>
                <div v-if="passwordError" class="mb-4 p-3 bg-red-900 text-red-300 rounded">
                    {{ passwordError }}
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1"
                               for="current-password">{{ t("accountSettingsView.security.changePassword.currentPassword")
                            }}</label>
                        <input
                            id="current-password"
                            v-model="currentPassword"
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1" for="new-password">{{ t("accountSettingsView.security.changePassword.newPassword")
                            }}</label>
                        <input
                            id="new-password"
                            v-model="newPassword"
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1"
                               for="confirm-password">{{ t("accountSettingsView.security.changePassword.confirmPassword")
                            }}</label>
                        <input
                            id="confirm-password"
                            v-model="confirmPassword"
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                        >
                    </div>
                    <div>
                        <Button
                            variant="primary"
                            @click="updatePassword"
                            :text="t('accountSettingsView.security.changePassword.updateButton')"
                            :loading="isPasswordUpdateLoading"
                            :loading-text="t('accountSettingsView.security.changePassword.updating')"
                        />
                    </div>
                </div>
            </div>

            <div class="pb-6"
                 v-if="env('VITE_APP_ENABLE_DATA_EXPORT', false)">  <!--  pt-6 border-t border-b border-gray-700 -->
                <h3 class="text-sm font-medium text-gray-400 mb-2">
                    {{ t("accountSettingsView.security.dataExport.title") }}
                    <small class="text-xs text-gray-400 mb-4">
                        (beta)
                    </small>
                </h3>
                <p class="text-xs text-gray-400 mb-4">
                    {{ t("accountSettingsView.security.dataExport.description") }}</p>

                <Button
                    variant="primary"
                    @click="exportUserData"
                    :text="t('accountSettingsView.security.dataExport.exportButton')"
                    :loading="isExportDataLoading"
                    :loading-text="t('accountSettingsView.security.dataExport.exporting')"
                />

                <!-- Export status message -->
                <div v-if="exportDataStatus" class="mt-4">
                    <div v-if="exportDataSuccess" class="bg-green-900/50 p-3 rounded border border-green-700">
                        <p class="text-sm text-green-300 mb-2">{{ exportDataStatus }}</p>
                        <router-link 
                            v-if="exportDataLink" 
                            :to="exportDataLink"
                            class="text-sm text-blue-400 hover:text-blue-300 underline cursor-pointer">
                            {{ t("userDataExport.downloadOnceReady") }}
                        </router-link>
                    </div>
                    <div v-else-if="exportDataError" class="bg-red-900/50 p-3 rounded border border-red-700">
                        <p class="text-sm text-red-300">{{ exportDataStatus }}</p>
                    </div>
                </div>
            </div>

            <div :class="env('VITE_APP_ENABLE_DATA_EXPORT', false) && `pt-6 border-t border-gray-700`">
                <h3 class="text-sm font-medium text-gray-400 mb-2">
                    {{ t("accountSettingsView.security.dangerZone.title") }}</h3>
                <div v-if="!showDeleteConfirm">
                    <Button
                        variant="danger"
                        @click="confirmDeleteAccount"
                        :text="t('accountSettingsView.security.dangerZone.deleteButton')"
                    />
                </div>
                <div v-else class="bg-red-900/50 p-4 rounded border border-red-700">
                    <p class="text-sm text-red-300 mb-4">
                        {{ t("accountSettingsView.security.dangerZone.confirmMessage") }}
                    </p>
                    <div class="flex space-x-3">
                        <Button
                            variant="danger"
                            @click="deleteAccount"
                            :text="t('accountSettingsView.security.dangerZone.confirmButton')"
                            :loading="isDeleteAccountLoading"
                            :loading-text="t('accountSettingsView.security.dangerZone.deleting')"
                        />
                        <Button
                            variant="secondary"
                            @click="cancelDeleteAccount"
                            :text="t('accountSettingsView.security.dangerZone.cancelButton')"
                            class="ml-3"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
