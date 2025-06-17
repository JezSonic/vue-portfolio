<script lang="ts" setup>
import { ref } from "vue";
import UserService from "@/services/userService.ts";
import { useUserStore } from "@/stores/userStore.js";
import { env } from "@/helpers/app.js";
import type { IUserData } from "@/types/user.d.ts";
import { useI18n } from "vue-i18n";

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

// Account deletion
const showDeleteConfirm = ref<boolean>(false);

// Export user data
const exportDataStatus = ref<string>("");
const exportDataError = ref<boolean>(false);
const exportDataSuccess = ref<boolean>(false);
const exportDataLink = ref<string>("");

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
    //     });

    // For demo purposes:
    passwordSuccess.value = t("accountSettingsView.security.changePassword.success");
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
};

// Export user data
const exportUserData = () => {
    exportDataStatus.value = "";
    exportDataError.value = false;
    exportDataSuccess.value = false;
    exportDataLink.value = "";

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
    UserService.deleteAccount()
        .finally(() => {
            userStore.logout();
            // Logout and redirect
            window.location.href = "/";
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
                    {{ t("accountSettingsView.security.changePassword.title") }}</h3>
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
                        <button
                            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors cursor-pointer"
                            @click="updatePassword"
                        >
                            {{ t("accountSettingsView.security.changePassword.updateButton") }}
                        </button>
                    </div>
                </div>
            </div>

            <div class="pb-6"
                 v-if="env('VITE_APP_ENABLE_DATA_EXPORT', false)">  <!--  pt-6 border-t border-b border-gray-700 -->
                <h3 class="text-sm font-medium text-gray-400 mb-2">
                    {{ t("accountSettingsView.security.dataExport.title") }}</h3>
                <p class="text-xs text-gray-400 mb-4">
                    {{ t("accountSettingsView.security.dataExport.description") }}</p>

                <button
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors cursor-pointer"
                    @click="exportUserData">

                    {{ t("accountSettingsView.security.dataExport.exportButton") }}
                </button>

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
                    <button
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors cursor-pointer"
                        @click="confirmDeleteAccount">
                        {{ t("accountSettingsView.security.dangerZone.deleteButton") }}
                    </button>
                </div>
                <div v-else class="bg-red-900/50 p-4 rounded border border-red-700">
                    <p class="text-sm text-red-300 mb-4">
                        {{ t("accountSettingsView.security.dangerZone.confirmMessage") }}
                    </p>
                    <div class="flex space-x-3">
                        <button
                            class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors cursor-pointer"
                            @click="deleteAccount"
                        >
                            {{ t("accountSettingsView.security.dangerZone.confirmButton") }}
                        </button>
                        <button
                            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors cursor-pointer"
                            @click="cancelDeleteAccount"
                        >
                            {{ t("accountSettingsView.security.dangerZone.cancelButton") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
