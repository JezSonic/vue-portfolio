<script lang="ts" setup>
import { ref } from "vue";
import type { IUserData } from "@/types/user.d.ts";
import Button from "@/components/ui/Button.vue";
import TwoFactorAuthService from "@/services/2faService.ts";
import { I2FAPrepareResponse, I2FAConfirmResponse, I2FARecoveryCode } from "@/types/services/2fa";
import TwoFactorRecoveryCodesModal from "@/components/modals/TwoFactorRecoveryCodesModal.vue";
import TwoFactorSetupModal from "@/components/modals/TwoFactorSetupModal.vue";
import { configureModal, type ModalController } from "@/services/modalService.ts";
import { sanitizeTwoFaCode, isValid2FAConfirmResponse } from "@/utils/security.ts";

const props = defineProps({
  userData: {
    type: Object as () => IUserData | null,
    required: true
  }
});

const emit = defineEmits(["refreshUserData"]);

// Local state for 2FA flow
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

const cleanup2FAFlow = () => {
  qrSvg.value = "";
  twoFACode.value = "";
  twoFASetupError.value = false;
};

const disable2FA = () => {
  isDisabling2FA.value = true;
  TwoFactorAuthService.disable2FA()
    .then(() => emit("refreshUserData"))
    .finally(() => {
      isDisabling2FA.value = false;
    });
};

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
      });
      recoveryModalCtrl.open();
    })
    .finally(() => {
      isShowing2FARecoveryCodes.value = false;
    });
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
        onClosed: () => {
          cleanup2FAFlow();
        },
      });
      setupModalCtrl.open();
    })
    .finally(() => {
      isPreparing2FA.value = false;
    });
};

const confirm2FA = (code: string) => {
  const numeric = sanitizeTwoFaCode(code);
  isConfirming2FA.value = true;
  TwoFactorAuthService.confirm2FA(Number(numeric))
    .then((resp: I2FAConfirmResponse) => {
      const ok = isValid2FAConfirmResponse(resp);
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
          onClosed: () => {
            recoveryModalCtrl = null;
            cleanup2FAFlow();
            emit("refreshUserData");
          },
        });
        recoveryModalCtrl.open();

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
          onClosed: () => {
            setupModalCtrl = null;
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
        onClosed: () => {
          setupModalCtrl = null;
          cleanup2FAFlow();
        },
      });
      setupModalCtrl.open();
    })
    .finally(() => {
      isConfirming2FA.value = false;
    });
};
</script>

<template>
  <div>
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
</template>
