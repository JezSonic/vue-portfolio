<script setup lang="ts">
import { ref, type PropType } from "vue";

const props = defineProps({
    qrSvg: {
        type: String,
        required: true,
    },
    error: {
        type: Boolean,
        default: false,
    },
    // Provided by modalService when opened programmatically
    close: { type: Function as PropType<() => void>, required: false }
})

const emit = defineEmits(["close", "confirm"])
import BaseModal from "@/components/modals/BaseModal.vue";
import Button from "@/components/ui/Button.vue";

const codeInvalidLength = ref<boolean>(false)
const twoFACode = ref<string>("");
const isConfirming2FA = ref<boolean>(false);
const confirm2FA = () => {
    isConfirming2FA.value = true;
    if (twoFACode.value.length != 6) {
        codeInvalidLength.value = true;
        return;
    }

    emit('confirm', twoFACode.value)
}
</script>

<template>
<BaseModal :close="props.close">
    <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold">Enable Two‑Factor Authentication</h4>
        <button class="text-gray-400 hover:text-gray-200" @click="() => props.close && props.close()">✕</button>
    </div>

    <p class="text-sm text-gray-400 mb-4">Scan this QR code with your authenticator app (e.g., Google Authenticator, Authy), then enter the 6‑digit code to confirm.</p>
    <div class="flex items-center justify-center mb-4">
        <div v-html="qrSvg" class="bg-white p-3 rounded"></div>
    </div>
    <div class="mb-3">
        <label class="block text-sm text-gray-300 mb-1">Confirmation Code. Please input code without spaces</label>
        <input
            v-model="twoFACode"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="6"
            placeholder="123456"
            class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <p v-if="error || codeInvalidLength" class="text-xs text-red-400 mt-2">{{codeInvalidLength ? "This code has invalid format. Please enter the 6-digit code from your authenticator app." : "Invalid code. Please try again."}}</p>
    </div>
    <div class="flex justify-end gap-2 mt-4">
        <Button variant="secondary" @click="() => props.close && props.close()" text="Cancel" />
        <Button variant="primary" :loading="isConfirming2FA && !(error || codeInvalidLength)" @click="confirm2FA" text="Confirm" />
    </div>
</BaseModal>
</template>

<style scoped lang="scss">

</style>