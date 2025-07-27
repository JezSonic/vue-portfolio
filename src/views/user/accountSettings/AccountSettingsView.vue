<script lang="ts" setup>
    import { onMounted, ref } from "vue";
    import UserService from "@/services/userService.ts";
    import type { IUserData } from "@/types/user.d.ts";
    import Loading from "@/components/ui/Loading.vue";
    import { useUserStore } from "@/stores/userStore.js";
    import i18n from "@/i18n/index.js";
    import { useI18n } from "vue-i18n";
    import { env } from "@/helpers/app.js";

    // Import tab components
    import ProfileTab from "@/views/user/accountSettings/tabs/ProfileTab.vue";
    import AccountsTab from "@/views/user/accountSettings/tabs/AccountsTab.vue";
    import ActivityTab from "@/views/user/accountSettings/tabs/ActivityTab.vue";
    import NotificationsTab from "@/views/user/accountSettings/tabs/NotificationsTab.vue";
    import SecurityTab from "@/views/user/accountSettings/tabs/SecurityTab.vue";
    import router from "@/router/index.js";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    import AuthService from "@/services/authService.js";

    const { t } = useI18n();

    // User data and error handling
    const userStore = useUserStore();
    const error = ref<boolean>(false);
    const loading = ref<boolean>(true);
    const userData = ref<IUserData | null>(null);

    // Tab management
    const tabs = ref([
        { id: "profile", label: "accountSettingsView.tabs.profile" },
        { id: "accounts", label: "accountSettingsView.tabs.accounts" },
        { id: "activity", label: "accountSettingsView.tabs.activity" },
        { id: "security", label: "accountSettingsView.tabs.security" }
    ]);

    const activeTab = ref<string>("profile");
    const isMobileMenuOpen = ref<boolean>(false);


    onMounted(() => {
        if (userStore.isLoggedIn()) {
            // Load user data
            UserService.getUser()
                .then((data) => {
                    if (data.profile_settings == undefined) {
                        data.profile_settings = {
                            is_public: true,
                            avatar_source: "auto",
                            theme: "dark",
                            language: "en",
                            notifications: {
                                email_notifications: false,
                                email_marketing: false,
                                email_security_alerts: false
                            }
                        };
                    }

                    userStore.userData = data;
                    userData.value = data;
                    loading.value = false;
                }).catch(() => {
                AuthService.logout();
                error.value = true;
                loading.value = false;
            });
        } else {
            AuthService.logout(); //assure to clear all leftover data
            router.push('/');
        }
    })

    // Save profile settings when changed
    const saveProfileSettings = () => {
        if (!userData.value) return;

        // Call API to update the profile settings
        UserService.update({
            name: userData.value.name,
            is_public: userData.value.profile_settings.is_public,
            avatar_source: userStore.avatarSource,
            theme: userData.value.profile_settings.theme,
            language: userData.value.profile_settings.language,
            notifications: userData.value.profile_settings.notifications
        })
            .then(() => {
                // Success handling if needed
            })
            .catch((err) => {
                // Error handling if needed
            });
    };

    const timestampToDate = (timestamp: string) => {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp);
        const locale = i18n.global.locale.value;
        return date.toLocaleDateString(locale, {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
    };

    onMounted(() => {
        if (env("ENABLE_EMAILING")) {
            tabs.value = tabs.value.toSpliced(2, 0, { id: "notifications", label: "accountSettingsView.tabs.notifications" });
        }
    });
</script>

<template>
    <div class="w-full h-full">
        <div v-if="userData == null" class="loading">
            <Loading :loading="loading"
                     :error-text="t('accountSettingsView.error.notFound')" />
            <div class="error-container" v-if="error">
                <div class="error-card">
                    <font-awesome-icon :icon="['fas', 'user-slash']" class="error-icon text-red-500" />
                    <h2 class="error-title">{{ t('userProfileView.error.notFound') }}</h2>
                    <p class="error-description">We couldn't find the user profile you're looking for. The user may not exist or has been removed.</p>
                    <button @click="router.push('/')" class="error-button bg-blue-600 hover:bg-blue-700">
                        <font-awesome-icon :icon="['fas', 'house']" class="mr-2" />
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="!text-white w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div class="mb-8">
                <h1 class="text-2xl font-bold !text-gray-100">{{ t("accountSettingsView.title") }}</h1>
                <p class="mt-2 text-sm !text-gray-400">{{ t("accountSettingsView.subtitle") }}</p>
            </div>

            <!-- Mobile Tab Dropdown -->
            <div class="md:hidden mb-4">
                <div class="relative z-0">
                    <button
                        class="w-full flex items-center justify-between px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 cursor-pointer"
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                    >
                        <span>{{ t(tabs.find(tab => tab.id === activeTab).label) }}</span>
                        <svg
                            :class="{ 'transform rotate-180': isMobileMenuOpen }"
                            class="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                        </svg>
                    </button>
                    <div
                        v-if="isMobileMenuOpen"
                        class="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg cursor-pointer"
                    >
                        <div class="py-1">
                            <button
                                v-for="tab in tabs"
                                :key="tab.id"
                                :class="{ 'bg-gray-700': activeTab === tab.id }"
                                class="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                @click="activeTab = tab.id; isMobileMenuOpen = false"
                            >
                                {{ t(tab.label) }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Desktop and Mobile Layout -->
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Desktop Tab Navigation (Left Side) -->
                <div class="hidden md:block w-64 flex-shrink-0">
                    <div class="bg-gray-800 rounded-lg shadow">
                        <div class="p-4">
                            <h3 class="text-sm font-medium text-gray-400 mb-3">Settings</h3>
                            <nav class="flex flex-col gap-1">
                                <button
                                    v-for="tab in tabs"
                                    :key="tab.id"
                                    :class="activeTab === tab.id ?
                                        'bg-gray-700 text-white' :
                                        'text-gray-300 hover:bg-gray-700 hover:text-white'"
                                    class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer"
                                    @click="activeTab = tab.id"
                                >
                                    {{ t(tab.label) }}
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="flex-1">
                    <!-- Profile Information Tab -->
                    <ProfileTab 
                        v-if="activeTab === 'profile'" 
                        :userData="userData" 
                        :timestampToDate="timestampToDate"
                        @update:userData="(data: IUserData | null) => {
                            console.log('saving...')
                            userData = data
                            saveProfileSettings()
                        }"
                    />

                    <!-- Connected Accounts Tab -->
                    <AccountsTab 
                        v-if="activeTab === 'accounts'" 
                        :userData="userData"
                        @saveProfileSettings="saveProfileSettings"
                    />

                    <!-- Notifications Tab -->
                    <NotificationsTab 
                        v-if="activeTab === 'notifications'" 
                        :userData="userData"
                    />

                    <!-- Activity Tab -->
                    <ActivityTab 
                        v-if="activeTab === 'activity'" 
                        :userData="userData"
                        :timestampToDate="timestampToDate"
                        :activeTab="activeTab"
                    />

                    <!-- Security Tab -->
                    <SecurityTab 
                        v-if="activeTab === 'security'" 
                        :userData="userData"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    /* Additional light mode styling */
    :deep(.light) {
        .bg-green-900 {
            background-color: rgba(16, 185, 129, 0.2);
        }

        .bg-yellow-900 {
            background-color: rgba(245, 158, 11, 0.2);
        }

        .bg-red-900 {
            background-color: rgba(239, 68, 68, 0.2);
        }

        .text-green-300 {
            color: var(--success-color);
        }

        .text-yellow-300 {
            color: var(--warning-color);
        }

        .text-red-300 {
            color: var(--error-color);
        }

        .bg-red-900\/50 {
            background-color: rgba(239, 68, 68, 0.1);
        }

        .border-red-700 {
            border-color: var(--error-color);
        }
    }
</style>
