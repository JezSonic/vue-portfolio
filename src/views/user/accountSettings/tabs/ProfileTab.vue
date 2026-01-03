<script lang="ts" setup>
// Import user default avatar
import userDefault from "@/assets/profile/userDefault.png";
import { env } from "@/helpers/app.js";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import Button from "@/components/ui/Button.vue";
import { useUserStore } from "@/stores/userStore.js";
import { useThemeStore } from "@/stores/themeStore.js";
import UserService from "@/services/userService.ts";
import type { IUserData } from "@/types/user.d.ts";

const props = defineProps<{
    userData: IUserData | null;
    timestampToDate: (timestamp: string) => string;
}>();

const emit = defineEmits<{
    (e: 'update:userData', value: IUserData | null): void;
}>();

const { t } = useI18n();

// Stores
const userStore = useUserStore();
const themeStore = useThemeStore();

// Profile visibility settings
const showProfilePublicly = ref<boolean>(true);

// Form states
const isEditingName = ref<boolean>(false);
const editedName = ref<string>("");
const isSaveLoading = ref<boolean>(false);
const isVerifyEmailLoading = ref<boolean>(false);

// Initialize data from props
watch(() => props.userData, (newUserData) => {
    if (newUserData) {
        editedName.value = newUserData.name;
        showProfilePublicly.value = newUserData.profile_settings?.is_public ?? true;
    }
}, { immediate: true });

// User actions
const startEditName = () => {
    isEditingName.value = true;
};

const saveName = () => {
    if (editedName.value.trim() && props.userData) {
        const updatedUserData = { ...props.userData };
        updatedUserData.name = editedName.value.trim();
        isEditingName.value = false;
        emit('update:userData', updatedUserData)
    }
};

const cancelEditName = () => {
    if (props.userData) {
        editedName.value = props.userData.name;
    }
    isEditingName.value = false;
};

// Email verification states
const verificationEmailSent = ref<boolean>(false);
const verificationEmailError = ref<boolean>(false);

const sendVerificationEmail = () => {
    isVerifyEmailLoading.value = true;
    verificationEmailSent.value = false;
    verificationEmailError.value = false;

    UserService.sendVerificationEmail()
        .then((response) => {
            if (response.content) {
                verificationEmailSent.value = true;
            } else {
                verificationEmailError.value = true;
            }
        })
        .catch(() => {
            verificationEmailError.value = true;
        })
        .finally(() => {
            isVerifyEmailLoading.value = false;
        });
};

const update = () => {
    if (props.userData != null) {
        isSaveLoading.value = true;

        const updatedUserData: IUserData = props.userData;
        if (editedName.value.trim()) {
            updatedUserData.name = editedName.value.trim();
        }

        updatedUserData.profile_settings.is_public = showProfilePublicly.value;

        // Emit the update event
        emit('update:userData', updatedUserData);

        // Since this is just emitting an event and not an actual API call,
        // we'll simulate a short delay before turning off the loading state
        setTimeout(() => {
            isSaveLoading.value = false;
        }, 500);
    }
}

// Avatar
const avatarUrl = () => {
    let val;
    if (userStore.avatarSource === "google" && props.userData?.google?.avatar_url) {
        val = props.userData.google.avatar_url;
    } else if (userStore.avatarSource === "github" && props.userData?.github?.avatar_url) {
        val = props.userData.github.avatar_url;
    } else {
        val = userDefault;
    }

    userStore.avatarSourceUrl = val;
    return val;
};

</script>

<template>
    <div class="bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-700">
            <h2 class="text-lg font-medium text-gray-200">{{ t("accountSettingsView.profile.title") }}</h2>
        </div>
        <div class="p-6">
            <div class="flex flex-col gap-0 lg:flex-row lg:gap-4 items-start">
                <div class="w-full lg:w-1/4 mb-4 lg:mb-0">
                    <div class="flex flex-col items-center">
                        <img
                            :src="avatarUrl() || userDefault"
                            :alt="t('userProfileView.alt.profilePicture')"
                            class="w-28 h-28 rounded-full object-cover border-4 border-gray-700"
                        >
                        <p class="mt-4 text-xs text-gray-400 text-center max-w-50">
                            {{ t("accountSettingsView.profile.avatarHelp") }}
                        </p>
                        <Button
                            variant="primary"
                            @click="update"
                            class="mt-5"
                            :text="t('accountSettingsView.profile.saveButton')"
                            :loading="isSaveLoading"
                        />
                    </div>
                </div>
                <div class="w-full lg:w-3/4">
                    <dl class="divide-y divide-gray-700">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ t("accountSettingsView.profile.fields.fullName") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                <div v-if="!isEditingName" class="flex items-center">
                                    <span class="truncate max-w-50 sm:max-w-75 md:max-w-full">{{ userData?.name }}</span>
                                    <Button 
                                        variant="link" 
                                        size="sm" 
                                        class="ml-2 shrink-0"
                                        @click="startEditName"
                                    >
                                        <svg class="h-4 w-4" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2" />
                                        </svg>
                                    </Button>
                                </div>
                                <div v-else class="flex items-center">
                                    <input
                                        v-model="editedName"
                                        class="px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                    >
                                    <Button 
                                        variant="success" 
                                        size="sm" 
                                        class="ml-2" 
                                        @click="saveName"
                                    >
                                        <svg class="h-5 w-5" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 13l4 4L19 7" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2" />
                                        </svg>
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        class="ml-2" 
                                        @click="cancelEditName"
                                    >
                                        <svg class="h-5 w-5" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2" />
                                        </svg>
                                    </Button>
                                </div>
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ t("accountSettingsView.profile.fields.emailAddress") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                <div class="flex flex-col">
                                    <div class="flex items-center gap-2">
                                        <span class="truncate max-w-50 sm:max-w-75 md:max-w-full">{{ userData?.email }}</span>
                                        <div class="flex gap-2">
                                            <Button
                                                    v-if="!userData?.email_verified_at && env('ENABLE_EMAILING')"
                                                    :text="t('accountSettingsView.profile.verifyButton')"
                                                    size="sm"
                                                    @click="sendVerificationEmail"
                                                    :loading="isVerifyEmailLoading"
                                                    :loading-text="t('accountSettingsView.profile.verifying')" />
                                            <span v-if="userData?.email_verified_at"
                                                  class="px-2.5 py-1.5 text-xs min-w-20 bg-blue-600 text-center text-white! rounded-lg shrink-0">{{ t("userProfileView.emailStatus.verified") }}</span>
                                            <span v-else
                                                  class="px-2.5 py-1.5 text-xs min-w-20 bg-yellow-600 text-center text-white! rounded-lg shrink-0">{{ t("userProfileView.emailStatus.notVerified") }}</span>
                                        </div>
                                    </div>
                                    <div v-if="verificationEmailSent" class="mt-2 text-sm text-green-400">
                                        {{ t('accountSettingsView.profile.verificationSuccess') }}
                                    </div>
                                    <div v-if="verificationEmailError" class="mt-2 text-sm text-red-400">
                                        {{ t('accountSettingsView.profile.verificationError') }}
                                    </div>
                                </div>
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ t("accountSettingsView.profile.fields.profileCreated") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                {{ timestampToDate(userData?.created_at || "") }}
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ t("accountSettingsView.profile.fields.lastUpdate") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                {{ timestampToDate(userData?.updated_at || "") }}
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ t("accountSettingsView.profile.fields.profileVisibility") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                <div class="flex items-center">
                                    <label class="inline-flex items-center cursor-pointer">
                                        <input v-model="showProfilePublicly" class="sr-only peer"
                                               type="checkbox">
                                        <div
                                            :class="`relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500! rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${themeStore.theme == 'light' ? ' peer-checked:bg-blue-500!' : ' peer-checked:bg-blue-600!'}`"></div>
                                        <span
                                            class="ml-3 text-sm font-medium text-gray-300">{{ showProfilePublicly ? t("accountSettingsView.profile.visibility.public") : t("accountSettingsView.profile.visibility.private") }}</span>
                                    </label>
                                    <span
                                        class="ml-2 text-xs text-gray-400">{{ showProfilePublicly ? t("accountSettingsView.profile.visibility.publicDescription") : t("accountSettingsView.profile.visibility.privateDescription") }}</span>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
