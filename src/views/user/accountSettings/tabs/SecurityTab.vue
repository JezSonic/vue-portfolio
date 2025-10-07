<script lang="ts" setup>
import { ref } from "vue";
import UserService from "@/services/userService.ts";
import { useUserStore } from "@/stores/userStore.ts";
import { env } from "@/helpers/app.ts";
import type { IUserData } from "@/types/user.d.ts";
import { useI18n } from "vue-i18n";
import Button from "@/components/ui/Button.vue";
import AuthService from "@/services/authService.ts";
import TwoFactorAuthService from "@/services/2faService.ts";
import { I2FAPrepareResponse, I2FAConfirmResponse, I2FARecoveryCode } from "@/types/services/2fa";
import TwoFactorRecoveryCodesModal from "@/components/modals/TwoFactorRecoveryCodesModal.vue";
import TwoFactorSetupModal from "@/components/modals/TwoFactorSetupModal.vue";
import { configureModal, type ModalController } from "@/services/modalService.ts";

const { t } = useI18n();

const props = defineProps({
    userData: {
        type: Object as () => IUserData | null,
        required: true
    }
})

// Events to notify parent to refresh user data after 2FA changes
const emit = defineEmits(["refreshUserData"])

// User store
const userStore = useUserStore();

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
let setupModalCtrl: ModalController | null = null;
let recoveryModalCtrl: ModalController | null = null;
const qrSvg = ref<string>("");
const twoFACode = ref<string>("");
const isConfirming2FA = ref<boolean>(false);
const twoFASetupError = ref<boolean>(false);
const recoveryCodes = ref<I2FARecoveryCode[]>([]);

const isDisabling2FA = ref<boolean>(false);
const isShowing2FARecoveryCodes = ref<boolean>(false);

const disable2FA = () => {
    isDisabling2FA.value = true;
    TwoFactorAuthService.disable2FA()
        .then(() => {
            // After disabling 2FA, refresh the user data
            emit('refreshUserData');
        })
        .finally(() => {
            isDisabling2FA.value = false;
        });
}

const show2FARecoveryCodes = () => {
    isShowing2FARecoveryCodes.value = true;
    TwoFactorAuthService.showRecoveryCodes()
        .then((res) => {
            recoveryCodes.value = res.recovery_codes;
            if (recoveryModalCtrl) {
                recoveryModalCtrl.close();
                recoveryModalCtrl = null;
            }
            recoveryModalCtrl = configureModal(TwoFactorRecoveryCodesModal, {
                recoveryCodes: recoveryCodes.value,
                onClose: () => {
                    if (recoveryModalCtrl) {
                        recoveryModalCtrl.close();
                        recoveryModalCtrl = null;
                    }
                }
            });
            recoveryModalCtrl.open();
        })
        .finally(() => {
            isShowing2FARecoveryCodes.value = false;
        });
}

const cleanup2FAFlow = () => {
    qrSvg.value = "";
    twoFACode.value = "";
    twoFASetupError.value = false;
};

const prepare2FA = () => {
    isPreparing2FA.value = true;
    TwoFactorAuthService.prepare2FA()
        .then((res: I2FAPrepareResponse) => {
            qrSvg.value = res.qr_code;
            twoFASetupError.value = false;

            if (setupModalCtrl) {
                setupModalCtrl.close();
                setupModalCtrl = null;
            }

            setupModalCtrl = configureModal(TwoFactorSetupModal, {
                qrSvg: qrSvg.value,
                error: twoFASetupError.value,
                onConfirm: (code: string) => confirm2FA(code),
                onClose: () => {
                    if (setupModalCtrl) {
                        setupModalCtrl.close();
                        setupModalCtrl = null;
                    }
                    cleanup2FAFlow();
                },
            });
            setupModalCtrl.open();
        })
        .finally(() => {
            isPreparing2FA.value = false;
        });
}

const confirm2FA = (code: string) => {
    // sanitize code (digits only)
    const numeric = code.replace(/\D/g, "");
    isConfirming2FA.value = true;
    TwoFactorAuthService.confirm2FA(Number(numeric))
        .then((resp: I2FAConfirmResponse) => {
            const ok = resp && resp.recovery_codes && resp.recovery_codes.length > 0;
            if (ok) {
                recoveryCodes.value = resp.recovery_codes;

                if (setupModalCtrl) {
                    setupModalCtrl.close();
                    setupModalCtrl = null;
                }
                if (recoveryModalCtrl) {
                    recoveryModalCtrl.close();
                    recoveryModalCtrl = null;
                }

                recoveryModalCtrl = configureModal(TwoFactorRecoveryCodesModal, {
                recoveryCodes: recoveryCodes.value,
                onClose: () => {
                    if (recoveryModalCtrl) {
                        recoveryModalCtrl.close();
                        recoveryModalCtrl = null;
                    }
                    cleanup2FAFlow();
                    // After enabling 2FA and handling recovery codes, refresh user data
                    emit('refreshUserData');
                },
            });
                recoveryModalCtrl.open();

                // Clear the code input now that it's confirmed
                twoFACode.value = "";
            } else {
                twoFASetupError.value = true;
                if (setupModalCtrl) {
                    setupModalCtrl.close();
                    setupModalCtrl = null;
                }
                setupModalCtrl = configureModal(TwoFactorSetupModal, {
                    qrSvg: qrSvg.value,
                    error: true,
                    onConfirm: (code: string) => confirm2FA(code),
                    onClose: () => {
                        if (setupModalCtrl) {
                            setupModalCtrl.close();
                            setupModalCtrl = null;
                        }
                        cleanup2FAFlow();
                    },
                });
                setupModalCtrl.open();
            }
        })
        .catch(() => {
            twoFASetupError.value = true;
            if (setupModalCtrl) {
                setupModalCtrl.close();
                setupModalCtrl = null;
            }
            setupModalCtrl = configureModal(TwoFactorSetupModal, {
                qrSvg: qrSvg.value,
                error: true,
                onConfirm: (code: string) => confirm2FA(code),
                onClose: () => {
                    if (setupModalCtrl) {
                        setupModalCtrl.close();
                        setupModalCtrl = null;
                    }
                    cleanup2FAFlow();
                },
            });
            setupModalCtrl.open();
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
                <h3 class="text-sm font-medium text-gray-400 mb-2">
                    Two-factor authentication
                    <small class="text-xs text-gray-400 mb-4">
                        (beta)
                    </small>
                </h3>
                <p class="text-xs text-gray-400 mb-4">Manage your 2FA-related settings</p>
                <Button v-if="!userData?.has_two_factor_enabled"
                    variant="primary"
                    @click="prepare2FA"
                    text="Enable"
                    :loading="isPreparing2FA"
                />
                <div v-else class="flex gap-3">
                    <Button
                        variant="danger"
                        @click="disable2FA"
                        text="Disable"
                        :loading="isDisabling2FA"
                    />

                    <Button
                        variant="secondary"
                        @click="show2FARecoveryCodes"
                        text="Generate recovery codes"
                        :loading="isShowing2FARecoveryCodes"
                    />
                </div>
            </div>

            <div class="pb-6 pt-6 border-t border-b border-gray-700"
                 v-if="env('ENABLE_DATA_EXPORT')">
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
