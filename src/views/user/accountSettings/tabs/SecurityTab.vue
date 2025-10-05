<script lang="ts" setup>
import { ref } from "vue";
import UserService from "@/services/userService.ts";
import { useUserStore } from "@/stores/userStore.js";
import { env } from "@/helpers/app.js";
import type { IUserData } from "@/types/user.d.ts";
import { useI18n } from "vue-i18n";
import Button from "@/components/ui/Button.vue";
import AuthService from "@/services/authService.js";
import TwoFactorAuthService from "@/services/2faService.ts";
import type { I2FAPrepareResponse } from "@/types/services/2fa";

const { t } = useI18n();

const props = defineProps({
    userData: {
        type: Object as () => IUserData | null,
        required: true
    }
})

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

// 2FA state
const isPreparing2FA = ref<boolean>(false);
const show2FAModal = ref<boolean>(false);
const qrSvg = ref<string>("");
const twoFACode = ref<string>("");
const isConfirming2FA = ref<boolean>(false);
const twoFAError = ref<string>("");
const twoFASuccess = ref<string>("");

const open2FAModal = () => {
    show2FAModal.value = true;
};
const close2FAModal = () => {
    show2FAModal.value = false;
    qrSvg.value = "";
    twoFACode.value = "";
    twoFAError.value = "";
    twoFASuccess.value = "";
};

const prepare2FA = () => {
    isPreparing2FA.value = true;
    twoFAError.value = "";
    TwoFactorAuthService.prepare2FA()
        .then((res: I2FAPrepareResponse) => {
            qrSvg.value = res.qr_code;
            open2FAModal();
        })
        .catch(() => {
            twoFAError.value = "Failed to prepare 2FA. Please try again.";
        })
        .finally(() => {
            isPreparing2FA.value = false;
        });
}

const confirm2FA = () => {
    twoFAError.value = "";
    twoFASuccess.value = "";
    // sanitize code (digits only)
    const numeric = twoFACode.value.replace(/\D/g, "");
    if (numeric.length < 6) {
        twoFAError.value = "Please enter the 6-digit code from your authenticator app.";
        return;
    }
    isConfirming2FA.value = true;
    TwoFactorAuthService.confirm2FA(Number(numeric))
        .then((resp) => {
            // API returns IApiResponse<boolean>
            const ok = (resp && (resp as any).content === true) || (resp === true);
            if (ok) {
                twoFASuccess.value = "Two-factor authentication enabled.";
                // Close modal after a short delay
                setTimeout(() => {
                    close2FAModal();
                }, 600);
            } else {
                twoFAError.value = "Invalid code. Please try again.";
            }
        })
        .catch(() => {
            twoFAError.value = "Invalid code. Please try again.";
        })
        .finally(() => {
            isConfirming2FA.value = false;
        });
}

// Update password
const requestPasswordReset = () => {
    if (props.userData && props.userData.email) {
        isPasswordUpdateLoading.value = true;
        passwordError.value = "";
        passwordSuccess.value = "";

        AuthService.requestPasswordReset(props.userData.email)
            .then(() => {
                passwordSuccess.value = t("accountSettingsView.security.changePassword.emailSent");
            })
            .catch(() => {
                passwordError.value = t("accountSettingsView.security.changePassword.errors.generic");
            })
            .finally(() => {
                isPasswordUpdateLoading.value = false;
            });
    }
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
            <div class="mb-6" v-if="env('ENABLE_EMAILING')">
                <h3 class="text-sm font-medium text-gray-400 mb-2">
                    {{ t(props.userData?.has_password ? 'accountSettingsView.security.changePassword.resetButton' : 'accountSettingsView.security.changePassword.createButton') }}
                    <small class="text-xs text-gray-400 mb-4">
                        (beta)
                    </small>
                </h3>
                <p class="text-xs text-gray-400 mb-4">
                    {{ t("accountSettingsView.security.changePassword.description") }}
                </p>
                <div v-if="passwordSuccess" class="mb-4 p-3 bg-green-900 text-green-300 rounded">
                    {{ passwordSuccess }}
                </div>
                <div v-if="passwordError" class="mb-4 p-3 bg-red-900 text-red-300 rounded">
                    {{ passwordError }}
                </div>
                <div class="space-y-4">
                    <div>
                        <Button
                            variant="primary"
                            @click="requestPasswordReset"
                            :text="t(props.userData?.has_password ? 'accountSettingsView.security.changePassword.resetButton' : 'accountSettingsView.security.changePassword.createButton')"
                            :loading="isPasswordUpdateLoading"
                            :loading-text="t('accountSettingsView.security.changePassword.updating')"
                        />
                    </div>
                </div>
            </div>

            <div class="pb-6 pt-6 border-t border-b border-gray-700"
                 v-if="env('ENABLE_2FA')">
                <h3 class="text-sm font-medium text-gray-400 mb-2 ">
                    Two-factor authentication
                    <small class="text-xs text-gray-400 mb-4">
                        (beta)
                    </small>
                    <Button
                        variant="primary"
                        @click="prepare2FA"
                        text="Enable"
                        :loading="isPreparing2FA"
                    />
                </h3>
                <p v-if="twoFAError" class="text-xs text-red-400 mt-2">{{ twoFAError }}</p>
            </div>

            <!-- 2FA Modal -->
            <div v-if="show2FAModal" class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60" @click="close2FAModal"></div>
                <div class="relative bg-gray-900 text-gray-200 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 border border-gray-700">
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="text-lg font-semibold">Enable Two‑Factor Authentication</h4>
                        <button class="text-gray-400 hover:text-gray-200" @click="close2FAModal">✕</button>
                    </div>
                    <p class="text-sm text-gray-400 mb-4">Scan this QR code with your authenticator app (e.g., Google Authenticator, Authy), then enter the 6‑digit code to confirm.</p>
                    <div class="flex items-center justify-center mb-4">
                        <div v-html="qrSvg" class="bg-white p-3 rounded"></div>
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm text-gray-300 mb-1">Confirmation Code</label>
                        <input
                            v-model="twoFACode"
                            type="text"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            maxlength="6"
                            placeholder="123456"
                            class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <p v-if="twoFAError" class="text-xs text-red-400 mt-2">{{ twoFAError }}</p>
                        <p v-if="twoFASuccess" class="text-xs text-green-400 mt-2">{{ twoFASuccess }}</p>
                    </div>
                    <div class="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" @click="close2FAModal" text="Cancel" />
                        <Button variant="primary" :loading="isConfirming2FA" @click="confirm2FA" text="Confirm" />
                    </div>
                </div>
            </div>

            <div class="pb-6 pt-6 border-t border-b border-gray-700"
                 v-if="env('ENABLE_DATA_EXPORT')">
                <h3 class="text-sm font-medium text-gray-400 mb-2 ">
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

            <div :class="env('ENABLE_DATA_EXPORT') && `pt-6 border-t border-gray-700`">
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
