<script lang="ts" setup>
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
    (e: 'saveProfileSettings'): void;
}>();

// Stores
const userStore = useUserStore();
const themeStore = useThemeStore();

// Profile visibility settings
const showProfilePublicly = ref<boolean>(true);

// Form states
const isEditingName = ref<boolean>(false);
const editedName = ref<string>("");

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
        emit('update:userData', updatedUserData);
        isEditingName.value = false;
    }
};

const cancelEditName = () => {
    if (props.userData) {
        editedName.value = props.userData.name;
    }
    isEditingName.value = false;
};

const sendVerificationEmail = () => {
    UserService.sendVerificationEmail();
};

// Avatar
const avatarUrl = () => {
    let val = null;
    if (userStore.avatarSource === "google" && props.userData?.google?.avatar_url) {
        val = props.userData.google.avatar_url;
    } else if (userStore.avatarSource === "github" && props.userData?.github?.avatar_url) {
        val = props.userData.github.avatar_url;
    } else if (userStore.avatarSource === "auto") {
        val = props.userData?.google?.avatar_url ||
            props.userData?.github?.avatar_url ||
            userDefault;
    } else {
        val = userDefault;
    }

    userStore.avatarSourceUrl = val;
    return val;
};

// Import user default avatar
import userDefault from "@/assets/profile/userDefault.png";
import { env } from "@/helpers/app.js";
</script>

<template>
    <div class="bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-700">
            <h2 class="text-lg font-medium text-gray-200">{{ $t("accountSettingsView.profile.title") }}</h2>
        </div>
        <div class="p-6">
            <div class="flex flex-col md:flex-row items-start">
                <div class="w-full md:w-1/4 mb-4 md:mb-0">
                    <div class="flex flex-col items-center">
                        <img
                            :src="avatarUrl() || userDefault"
                            :alt="$t('userProfileView.alt.profilePicture')"
                            class="w-28 h-28 rounded-full object-cover border-4 border-gray-700"
                        >
                        <p class="mt-4 text-xs text-gray-400 text-center max-w-[200px]">
                            {{ $t("accountSettingsView.profile.avatarHelp") }}
                        </p>
                        <button
                            class="px-12 py-2 rounded text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 !text-white mt-5 cursor-pointer"
                            @click="$emit('saveProfileSettings')">
                            {{ $t("accountSettingsView.profile.saveButton") }}
                        </button>
                    </div>
                </div>
                <div class="w-full md:w-3/4">
                    <dl class="divide-y divide-gray-700">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ $t("accountSettingsView.profile.fields.fullName") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                <div v-if="!isEditingName" class="flex items-center">
                                    <span class="truncate max-w-[200px] sm:max-w-[300px] md:max-w-full">{{ userData?.name }}</span>
                                    <button class="ml-2 text-blue-500 hover:text-blue-400 flex-shrink-0"
                                            @click="startEditName">
                                        <svg class="h-4 w-4" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2" />
                                        </svg>
                                    </button>
                                </div>
                                <div v-else class="flex items-center">
                                    <input
                                        v-model="editedName"
                                        class="px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                    >
                                    <button class="ml-2 text-green-500 hover:text-green-400"
                                            @click="saveName">
                                        <svg class="h-5 w-5" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 13l4 4L19 7" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2" />
                                        </svg>
                                    </button>
                                    <button class="ml-2 text-red-500 hover:text-red-400"
                                            @click="cancelEditName">
                                        <svg class="h-5 w-5" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2" />
                                        </svg>
                                    </button>
                                </div>
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ $t("accountSettingsView.profile.fields.emailAddress") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                <div class="flex items-center">
                                    <span class="truncate max-w-[200px] sm:max-w-[300px] md:max-w-full">{{ userData?.email }}</span>
                                    <Button class="ml-2"
                                            v-if="!userData?.email_verified_at && env('VITE_APP_ENABLE_EMAILING', false)"
                                            text="Verify" @click="sendVerificationEmail" />
                                    <span v-if="userData?.email_verified_at"
                                          class="ml-2 px-2 py-0.5 bg-green-900 text-green-300 rounded-full text-xs flex-shrink-0">{{ $t("userProfileView.emailStatus.verified") }}</span>
                                    <span v-else
                                          class="ml-2 px-2 py-0.5 bg-yellow-900 text-yellow-300 rounded-full text-xs flex-shrink-0">{{ $t("userProfileView.emailStatus.notVerified") }}</span>
                                </div>
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ $t("accountSettingsView.profile.fields.profileCreated") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                {{ timestampToDate(userData?.created_at) }}
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ $t("accountSettingsView.profile.fields.lastUpdate") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                {{ timestampToDate(userData?.updated_at) }}
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-400 flex items-center">
                                {{ $t("accountSettingsView.profile.fields.profileVisibility") }}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                <div class="flex items-center">
                                    <label class="inline-flex items-center cursor-pointer">
                                        <input v-model="showProfilePublicly" class="sr-only peer"
                                               type="checkbox">
                                        <div
                                            :class="`relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:!ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${themeStore.theme == 'light' ? ' peer-checked:!bg-blue-500' : ' peer-checked:!bg-blue-600'}`"></div>
                                        <span
                                            class="ml-3 text-sm font-medium text-gray-300">{{ showProfilePublicly ? $t("accountSettingsView.profile.visibility.public") : $t("accountSettingsView.profile.visibility.private") }}</span>
                                    </label>
                                    <span
                                        class="ml-2 text-xs text-gray-400">{{ showProfilePublicly ? $t("accountSettingsView.profile.visibility.publicDescription") : $t("accountSettingsView.profile.visibility.privateDescription") }}</span>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>