<script lang="ts" setup>
import { ref, watch } from "vue";
import type { IUserData } from "@/types/user.d.ts";
import UserService from "@/services/userService.ts";
import { useUserStore } from "@/stores/userStore.ts";
import { useI18n } from "vue-i18n";

const props = defineProps<{
    userData: IUserData | null;
}>();

// User store
const userStore = useUserStore();
const userId = userStore.id || -1;

// Notification settings
const emailNotifications = ref<boolean>(true);
const marketingEmails = ref<boolean>(false);
const securityAlerts = ref<boolean>(true);

const {t} = useI18n();

// Initialize data from props
watch(() => props.userData, (newUserData) => {
    if (newUserData && newUserData.profile_settings && newUserData.profile_settings.notifications) {
        emailNotifications.value = newUserData.profile_settings.notifications.email_notifications ?? true;
        marketingEmails.value = newUserData.profile_settings.notifications.email_marketing ?? false;
        securityAlerts.value = newUserData.profile_settings.notifications.email_security_alerts ?? true;
    }
}, { immediate: true });

// Save notification settings
const saveNotificationSettings = () => {
    if (!props.userData) return;

    const notificationSettings = {
        email_notifications: emailNotifications.value,
        email_marketing: marketingEmails.value,
        email_security_alerts: securityAlerts.value
    };

    UserService.updateNotificationSettings(userId, notificationSettings)
        .then(() => {
            if (props.userData && props.userData.profile_settings) {
                props.userData.profile_settings.notifications = notificationSettings;
            }
        })
        .catch((err) => {
            //console.error('Failed to update notification settings', err);
        });
};
</script>

<template>
    <div class="bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-700">
            <h2 class="text-lg font-medium text-gray-200">
                {{ t("accountSettingsView.notifications.title") }}</h2>
            <p class="mt-1 text-sm text-gray-400">{{ t("accountSettingsView.notifications.subtitle")
                }}</p>
        </div>
        <div class="p-6">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-sm font-medium text-gray-300">
                            {{ t("accountSettingsView.notifications.emailNotifications.title") }}</h3>
                        <p class="text-xs text-gray-400">
                            {{ t("accountSettingsView.notifications.emailNotifications.description")
                            }}</p>
                    </div>
                    <label class="inline-flex items-center cursor-pointer">
                        <input v-model="emailNotifications" class="sr-only peer" type="checkbox">
                        <div
                            class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-sm font-medium text-gray-300">
                            {{ t("accountSettingsView.notifications.marketingEmails.title") }}</h3>
                        <p class="text-xs text-gray-400">
                            {{ t("accountSettingsView.notifications.marketingEmails.description") }}</p>
                    </div>
                    <label class="inline-flex items-center cursor-pointer">
                        <input v-model="marketingEmails" class="sr-only peer" type="checkbox">
                        <div
                            class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-sm font-medium text-gray-300">
                            {{ t("accountSettingsView.notifications.securityAlerts.title") }}</h3>
                        <p class="text-xs text-gray-400">
                            {{ t("accountSettingsView.notifications.securityAlerts.description") }}</p>
                    </div>
                    <label class="inline-flex items-center cursor-pointer">
                        <input v-model="securityAlerts" class="sr-only peer" type="checkbox">
                        <div
                            class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div class="mt-6">
                    <button
                        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors cursor-pointer"
                        @click="saveNotificationSettings"
                    >
                        {{ t("accountSettingsView.notifications.saveButton") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>