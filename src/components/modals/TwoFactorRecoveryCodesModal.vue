<script setup lang="ts">
import { I2FARecoveryCode } from "@/types/services/2fa";
import Button from "@/components/ui/Button.vue";
import BaseModal from "@/components/modals/BaseModal.vue";
import { ref } from "vue";

const props = defineProps({
    recoveryCodes: {
        type: Array as () => I2FARecoveryCode[],
        required: true,
    },
    close: { type: Function as import('vue').PropType<() => void>, required: false }
})


const copied = ref<boolean>(false)
const copyRecoveryCodes = async () => {
    copied.value = false;
    const text = props.recoveryCodes.map(rc => rc.code).join("\n");
    await navigator.clipboard.writeText(text);
    copied.value = true;
}
</script>

<template>
    <BaseModal :close="props.close">
        <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-semibold">Save your recovery codes</h4>
            <button class="text-gray-400 hover:text-gray-200" @click="() => props.close && props.close()">✕</button>
        </div>
        <div>
            <p class="text-xs text-yellow-300 bg-yellow-900/30 border border-yellow-700 rounded p-2 mb-3">
                These recovery codes will be shown only once. Store them in a safe place (e.g., password manager). If you lose them, you may lose access to your account.
            </p>
            <div class="bg-gray-800 border border-gray-700 rounded p-3">
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm">
                    <li v-for="rc in recoveryCodes" :key="rc.code" class="px-2 py-1 bg-gray-900 rounded border border-gray-700">
                        {{ rc.code }}
                    </li>
                </ul>
            </div>
            <div class="flex items-center justify-between mt-6 gap-2">
                <Button variant="secondary" @click="copyRecoveryCodes" :text="copied ? 'Copy codes' : 'Copy'" />
                <Button variant="primary" @click="() => props.close && props.close()" text="I saved them" />
            </div>
        </div>
    </BaseModal>
</template>

<style scoped lang="scss">

</style>