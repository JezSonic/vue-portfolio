<script lang="ts" setup>
    import { ref, watch } from "vue";
    import UserService from "@/services/userService.ts";
    import AuthService from "@/services/authService.ts";
    import type { ILoginHistory, INotificationSettings, IUserData } from "@/types/user.d.ts";
    import Loading from "@/components/ui/Loading.vue";
    import { OAuthProvider } from "@/types/services/auth.d.ts";
    import { useUserStore } from "@/stores/userStore.js";
    import { useThemeStore } from "@/stores/themeStore";
    import userDefault from "@/assets/profile/userDefault.png";
    import i18n from "@/i18n";
    import { useI18n } from "vue-i18n";

    const { t } = useI18n();

    // User data and error handling
    const userStore = useUserStore();
    const themeStore = useThemeStore();
    const error = ref<boolean>(false);
    const loading = ref<boolean>(true);
    const userId = useUserStore().id || -1;
    const userData = ref<IUserData | null>(null);
    const connectedSocialAccounts = ref<OAuthProvider[]>([]);

    // Tab management
    const tabs = [
        { id: "profile", label: "accountSettingsView.tabs.profile" },
        { id: "accounts", label: "accountSettingsView.tabs.accounts" },
        { id: "notifications", label: "accountSettingsView.tabs.notifications" },
        { id: "activity", label: "accountSettingsView.tabs.activity" },
        { id: "security", label: "accountSettingsView.tabs.security" }
    ];
    const activeTab = ref<string>("profile");
    const isMobileMenuOpen = ref<boolean>(false);

    // Profile visibility settings
    const showProfilePublicly = ref<boolean>(true);

    // Preferences settings
    const selectedTheme = ref<string>("dark");
    const selectedLanguage = ref<string>("en");

    // Notification settings
    const emailNotifications = ref<boolean>(true);
    const marketingEmails = ref<boolean>(false);
    const securityAlerts = ref<boolean>(true);

    // Login history
    const loginHistory = ref<ILoginHistory[]>([]);
    const loadingHistory = ref<boolean>(false);
    const historyError = ref<boolean>(false);

    // Form states
    const isEditingName = ref<boolean>(false);
    const editedName = ref<string>("");
    const currentPassword = ref<string>("");
    const newPassword = ref<string>("");
    const confirmPassword = ref<string>("");
    const passwordError = ref<string>("");
    const passwordSuccess = ref<string>("");
    const showDeleteConfirm = ref<boolean>(false);

    const oauth = (provider: OAuthProvider) => {
        AuthService.getOAuthUrl(provider)
            .then((res) => {
                window.location.href = res.content;
            });
    };

    // Avatar
    const avatarUrl = () => {
        let val = null;
        if (userStore.avatarSource === "google" && userData.value?.google?.avatar_url) {
            val = userData.value.google.avatar_url;
        } else if (userStore.avatarSource === "github" && userData.value?.github?.avatar_url) {
            val = userData.value.github.avatar_url;
        } else if (userStore.avatarSource === "auto") {
            val = userData.value?.google?.avatar_url ||
                userData.value?.github?.avatar_url ||
                userDefault;
        } else {
            val = userDefault;
        }

        userStore.avatarSourceUrl = val;
        return val;
    };

    // Load user data
    UserService.getUserByID(userId)
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

            userData.value = data;
            editedName.value = data.name;

            // Initialize profile settings from user data if available
            if (data.profile_settings) {
                showProfilePublicly.value = data.profile_settings.is_public ?? true;
                userStore.avatarSource = data.profile_settings.avatar_source ?? "auto";

                // Initialize preferences
                selectedTheme.value = data.profile_settings.theme ?? themeStore.theme;
                selectedLanguage.value = data.profile_settings.language ?? "en";

                // Initialize notification settings
                if (data.profile_settings.notifications) {
                    emailNotifications.value = data.profile_settings.notifications.email_notifications ?? true;
                    marketingEmails.value = data.profile_settings.notifications.email_marketing ?? false;
                    securityAlerts.value = data.profile_settings.notifications.email_security_alerts ?? true;
                }
            }

            if (data.google) {
                connectedSocialAccounts.value.push(OAuthProvider.Google);
            }
            if (data.github) {
                connectedSocialAccounts.value.push(OAuthProvider.GitHub);
            }

            loading.value = false;
        }).catch(() => {
        error.value = true;
        loading.value = false;
    });

    // Save profile settings when changed
    const saveProfileSettings = () => {
        if (!userData.value) return;
        console.log(showProfilePublicly, userData.value.profile_settings);
        console.table(userData.value.profile_settings);
        userData.value.profile_settings.is_public = showProfilePublicly.value;
        userData.value.profile_settings.avatar_source = userStore.avatarSource;
        userData.value.profile_settings.theme = selectedTheme.value;
        userData.value.profile_settings.language = selectedLanguage.value;

        // Update theme in themeStore
        themeStore.setTheme(selectedTheme.value as 'dark' | 'light' | 'system');

        if (!userData.value.profile_settings.notifications) {
            userData.value.profile_settings.notifications = {
                email_notifications: emailNotifications.value,
                email_marketing: marketingEmails.value,
                email_security_alerts: securityAlerts.value
            };
        }

        // Call API to update the profile settings
        UserService.update({
            name: userData.value.name,
            is_public: showProfilePublicly.value,
            avatar_source: userStore.avatarSource,
            theme: selectedTheme.value,
            language: selectedLanguage.value,
            notifications: {
                email_notifications: emailNotifications.value,
                email_marketing: marketingEmails.value,
                email_security_alerts: securityAlerts.value
            }
        })
            .then(() => {
                //console.log('Profile settings updated');
            })
            .catch((err) => {
                //console.error('Failed to update profile settings', err);
            });

        //console.log('Profile settings updated:', userData.value.profile_settings);
    };

    // Save notification settings
    const saveNotificationSettings = () => {
        if (!userData.value) return;

        const notificationSettings: INotificationSettings = {
            email_notifications: emailNotifications.value,
            email_marketing: marketingEmails.value,
            email_security_alerts: securityAlerts.value
        };

        UserService.updateNotificationSettings(userId, notificationSettings)
            .then(() => {
                if (userData.value) {
                    userData.value.profile_settings.notifications = notificationSettings;
                }
            })
            .catch((err) => {
                //console.error('Failed to update notification settings', err);
            });
    };

    // Load login history
    const loadLoginHistory = () => {
        if (activeTab.value !== "activity") return;

        loadingHistory.value = true;
        historyError.value = false;

        UserService.getLoginHistory()
            .then((data) => {
                loginHistory.value = data.content;
                loadingHistory.value = false;
            })
            .catch(() => {
                historyError.value = true;
                loadingHistory.value = false;
            });
    };

    // Export user data
    const exportUserData = () => {
        UserService.exportUserData(userId)
            .then((data) => {
                // Create a download link for the exported data
                const blob = new Blob([data.content], { type: "application/json" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `user_data_${userId}.json`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch((err) => {
                //console.error('Failed to export user data', err);
            });
    };

    // Watch for tab changes to load data when needed
    watch(() => activeTab.value, (newTab) => {
        if (newTab === "activity") {
            loadLoginHistory();
        }
    });

    // Watch for theme changes from outside the component
    watch(() => themeStore.theme, (newTheme) => {
        selectedTheme.value = newTheme;
    });

    // We no longer automatically save profile settings when they change
    // Users must click the Save Avatar button to save changes

    // Utility functions
    const timestampToDate = (timestamp: string) => {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp);
        // Use the current locale from i18n
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

    // User actions
    const startEditName = () => {
        isEditingName.value = true;
    };

    const saveName = () => {
        if (editedName.value.trim() && userData.value) {
            // Here you would call an API to update the name
            userData.value.name = editedName.value.trim();
            isEditingName.value = false;
            // Example API call (commented out):
            // UserService.updateUserName(userId, editedName.value.trim())
            //     .then(() => {
            //         userData.value.name = editedName.value.trim();
            //         isEditingName.value = false;
            //     })
            //     .catch((err) => {
            //         console.error('Failed to update name', err);
            //     });
        }
    };

    const cancelEditName = () => {
        if (userData.value) {
            editedName.value = userData.value.name;
        }
        isEditingName.value = false;
    };

    const updatePassword = () => {
        passwordError.value = "";
        passwordSuccess.value = "";

        if (!currentPassword.value) {
            passwordError.value = t('accountSettingsView.security.changePassword.errors.required');
            return;
        }

        if (newPassword.value.length < 8) {
            passwordError.value = t('accountSettingsView.security.changePassword.errors.length');
            return;
        }

        if (newPassword.value !== confirmPassword.value) {
            passwordError.value = t('accountSettingsView.security.changePassword.errors.match');
            return;
        }

        // Here you would call an API to update the password
        // Example:
        // UserService.updatePassword(userId, currentPassword.value, newPassword.value)
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
        passwordSuccess.value = t('accountSettingsView.security.changePassword.success');
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
    };

    const toggleSocialAccount = (provider: OAuthProvider) => {
        const isConnected = connectedSocialAccounts.value.includes(provider);
        if (isConnected) {
            AuthService.revokeOAuth(provider)
                .then(() => {
                    connectedSocialAccounts.value = connectedSocialAccounts.value.filter(p => p !== provider);
                });
        } else {
            oauth(provider);
        }
    };

    const confirmDeleteAccount = () => {
        showDeleteConfirm.value = true;
    };

    const cancelDeleteAccount = () => {
        showDeleteConfirm.value = false;
    };

    const deleteAccount = () => {
        // UserService.deleteAccount(userId)
        //     .then(() => {
        //         // Logout and redirect
        //         window.location.href = '/';
        //     });

        // For demo purposes:
        alert("Account deletion would happen here");
        showDeleteConfirm.value = false;
    };
</script>

<template>
    <div class="w-full h-full">
        <div v-if="userData == null" class="loading">
            <Loading :error="error" :loading="loading"
                     :error-text="t('accountSettingsView.error.notFound')" />
        </div>
        <div v-else class="!text-white w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div class="mb-8">
                <h1 class="text-2xl font-bold !text-gray-100">{{ t('accountSettingsView.title') }}</h1>
                <p class="mt-2 text-sm !text-gray-400">{{ t('accountSettingsView.subtitle') }}</p>
            </div>

            <!-- Mobile Tab Dropdown -->
            <div class="md:hidden mb-4">
                <div class="relative z-0">
                    <button
                        class="w-full flex items-center justify-between px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 cursor-pointer"
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                    >
                        <span>{{ t(tabs.find(tab => tab.id === activeTab)?.label) }}</span>
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
                            <nav>
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
                    <div v-if="activeTab === 'profile'" class="bg-gray-800 rounded-lg shadow">
                        <div class="px-6 py-4 border-b border-gray-700">
                            <h2 class="text-lg font-medium text-gray-200">{{ t('accountSettingsView.profile.title') }}</h2>
                        </div>
                        <div class="p-6">
                            <div class="flex flex-col md:flex-row items-start">
                                <div class="w-full md:w-1/4 mb-4 md:mb-0">
                                    <div class="flex flex-col items-center">
                                        <img
                                            :src="avatarUrl() || userDefault"
                                            :alt="t('userProfileView.alt.profilePicture')"
                                            class="w-28 h-28 rounded-full object-cover border-4 border-gray-700"
                                        >
                                        <p class="mt-4 text-xs text-gray-400 text-center max-w-[200px]">
                                            {{ t('accountSettingsView.profile.avatarHelp') }}
                                        </p>
                                        <button
                                            class="px-12 py-2 rounded text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 !text-white mt-5 cursor-pointer"
                                            @click="saveProfileSettings">
                                            {{ t('accountSettingsView.profile.saveButton') }}
                                        </button>
                                    </div>
                                </div>
                                <div class="w-full md:w-3/4">
                                    <dl class="divide-y divide-gray-700">
                                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt class="text-sm font-medium text-gray-400">{{ t('accountSettingsView.profile.fields.fullName') }}</dt>
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
                                            <dt class="text-sm font-medium text-gray-400">{{ t('accountSettingsView.profile.fields.emailAddress') }}</dt>
                                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                                <div class="flex items-center">
                                                    <span class="truncate max-w-[200px] sm:max-w-[300px] md:max-w-full">{{ userData?.email }}</span>
                                                    <span v-if="userData?.email_verified_at"
                                                          class="ml-2 px-2 py-0.5 bg-green-900 text-green-300 rounded-full text-xs flex-shrink-0">{{ t('userProfileView.emailStatus.verified') }}</span>
                                                    <span v-else
                                                          class="ml-2 px-2 py-0.5 bg-yellow-900 text-yellow-300 rounded-full text-xs flex-shrink-0">{{ t('userProfileView.emailStatus.notVerified') }}</span>
                                                </div>
                                            </dd>
                                        </div>
                                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt class="text-sm font-medium text-gray-400">{{ t('accountSettingsView.profile.fields.profileCreated') }}</dt>
                                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                                {{ timestampToDate(userData?.created_at) }}
                                            </dd>
                                        </div>
                                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt class="text-sm font-medium text-gray-400">{{ t('accountSettingsView.profile.fields.lastUpdate') }}</dt>
                                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                                {{ timestampToDate(userData?.updated_at) }}
                                            </dd>
                                        </div>
                                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt class="text-sm font-medium text-gray-400">{{ t('accountSettingsView.profile.fields.profileVisibility') }}</dt>
                                            <dd class="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                                <div class="flex items-center">
                                                    <label class="inline-flex items-center cursor-pointer">
                                                        <input v-model="showProfilePublicly" class="sr-only peer"
                                                               type="checkbox">
                                                        <div
                                                            :class="`relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:!ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${themeStore.theme == 'light' ? ' peer-checked:!bg-blue-500' : ' peer-checked:!bg-blue-600'}`"></div>
                                                        <span
                                                            class="ml-3 text-sm font-medium text-gray-300">{{ showProfilePublicly ? t('accountSettingsView.profile.visibility.public') : t('accountSettingsView.profile.visibility.private')
                                                            }}</span>
                                                    </label>
                                                    <span
                                                        class="ml-2 text-xs text-gray-400">{{ showProfilePublicly ? t('accountSettingsView.profile.visibility.publicDescription') : t('accountSettingsView.profile.visibility.privateDescription')
                                                        }}</span>
                                                </div>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Connected Accounts Tab -->
                    <div v-if="activeTab === 'accounts'" class="bg-gray-800 rounded-lg shadow">
                        <div class="px-6 py-4 border-b border-gray-700">
                            <h2 class="text-lg font-medium text-gray-200">{{ t('accountSettingsView.connectedAccounts.title') }}</h2>
                            <p class="mt-1 text-sm text-gray-400">{{ t('accountSettingsView.connectedAccounts.subtitle') }}</p>
                        </div>
                        <div class="p-6">
                            <div class="pb-6 border-b border-gray-700">
                                <h3 class="text-sm font-medium text-gray-400 mb-3">{{ t('accountSettingsView.connectedAccounts.avatarSource.title') }}</h3>
                                <p class="text-xs text-gray-400 mb-4">{{ t('accountSettingsView.connectedAccounts.avatarSource.description') }}</p>

                                <div class="space-y-2">
                                    <label class="flex items-center space-x-3">
                                        <input v-model="userStore.avatarSource"
                                               class="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                                               type="radio"
                                               value="auto">
                                        <span class="text-sm text-gray-300">{{ t('accountSettingsView.connectedAccounts.avatarSource.auto') }}</span>
                                    </label>

                                    <label :class="{'opacity-50': !userData?.google?.avatar_url}"
                                           class="flex items-center space-x-3">
                                        <input v-model="userStore.avatarSource"
                                               :disabled="!userData?.google?.avatar_url"
                                               class="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                                               type="radio"
                                               value="google">
                                        <span class="text-sm text-gray-300">{{ t('accountSettingsView.connectedAccounts.avatarSource.google') }}</span>
                                        <span v-if="!userData?.google?.avatar_url" class="text-xs text-gray-400">{{ t('accountSettingsView.connectedAccounts.avatarSource.notAvailable') }}</span>
                                    </label>

                                    <label :class="{'opacity-50': !userData?.github?.avatar_url}"
                                           class="flex items-center space-x-3">
                                        <input v-model="userStore.avatarSource"
                                               :disabled="!userData?.github?.avatar_url"
                                               class="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                                               type="radio"
                                               value="github">
                                        <span class="text-sm text-gray-300">{{ t('accountSettingsView.connectedAccounts.avatarSource.github') }}</span>
                                        <span v-if="!userData?.github?.avatar_url" class="text-xs text-gray-400">{{ t('accountSettingsView.connectedAccounts.avatarSource.notAvailable') }}</span>
                                    </label>

                                    <label class="flex items-center space-x-3">
                                        <input v-model="userStore.avatarSource"
                                               class="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                                               type="radio"
                                               value="default">
                                        <span class="text-sm text-gray-300">{{ t('accountSettingsView.connectedAccounts.avatarSource.default') }}</span>
                                    </label>
                                </div>
                            </div>

                            <ul class="divide-y divide-gray-700">
                                <li class="py-4 flex justify-between items-center">
                                    <div class="flex items-center">
                                        <svg class="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                        </svg>
                                        <div class="ml-3">
                                            <p class="text-sm font-medium text-gray-200">{{ t('accountSettingsView.connectedAccounts.avatarSource.google') }}</p>
                                            <p class="text-xs text-gray-400">
                                                {{ connectedSocialAccounts.includes(OAuthProvider.Google) ? t('accountSettingsView.connectedAccounts.status.connected') : t('accountSettingsView.connectedAccounts.status.notConnected')
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        :class="connectedSocialAccounts.includes(OAuthProvider.Google) ?
                                            'bg-red-900 hover:bg-red-800 text-red-300' :
                                            'bg-blue-600 hover:bg-blue-700 text-white'"
                                        class="px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer"
                                        @click="toggleSocialAccount(OAuthProvider.Google)"
                                    >
                                        {{ connectedSocialAccounts.includes(OAuthProvider.Google) ? t('accountSettingsView.connectedAccounts.buttons.disconnect') : t('accountSettingsView.connectedAccounts.buttons.connect')
                                        }}
                                    </button>
                                </li>
                                <li class="py-4 flex justify-between items-center">
                                    <div class="flex items-center">
                                        <svg class="h-6 w-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path clip-rule="evenodd"
                                                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                                                  fill-rule="evenodd" />
                                        </svg>
                                        <div class="ml-3">
                                            <p class="text-sm font-medium text-gray-200">{{ t('accountSettingsView.connectedAccounts.avatarSource.github') }}</p>
                                            <p class="text-xs text-gray-400">
                                                {{ connectedSocialAccounts.includes(OAuthProvider.GitHub) ? t('accountSettingsView.connectedAccounts.status.connected') : t('accountSettingsView.connectedAccounts.status.notConnected')
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        :class="connectedSocialAccounts.includes(OAuthProvider.GitHub) ?
                                            'bg-red-900 hover:bg-red-800 text-red-300' :
                                            'bg-blue-600 hover:bg-blue-700 text-white'"
                                        class="px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer"
                                        @click="toggleSocialAccount(OAuthProvider.GitHub)"
                                    >
                                        {{ connectedSocialAccounts.includes(OAuthProvider.GitHub) ? t('accountSettingsView.connectedAccounts.buttons.disconnect') : t('accountSettingsView.connectedAccounts.buttons.connect')
                                        }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Notifications Tab -->
                    <div v-if="activeTab === 'notifications'" class="bg-gray-800 rounded-lg shadow">
                        <div class="px-6 py-4 border-b border-gray-700">
                            <h2 class="text-lg font-medium text-gray-200">{{ t('accountSettingsView.notifications.title') }}</h2>
                            <p class="mt-1 text-sm text-gray-400">{{ t('accountSettingsView.notifications.subtitle') }}</p>
                        </div>
                        <div class="p-6">
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-300">{{ t('accountSettingsView.notifications.emailNotifications.title') }}</h3>
                                        <p class="text-xs text-gray-400">{{ t('accountSettingsView.notifications.emailNotifications.description') }}</p>
                                    </div>
                                    <label class="inline-flex items-center cursor-pointer">
                                        <input v-model="emailNotifications" class="sr-only peer" type="checkbox">
                                        <div
                                            class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-300">{{ t('accountSettingsView.notifications.marketingEmails.title') }}</h3>
                                        <p class="text-xs text-gray-400">{{ t('accountSettingsView.notifications.marketingEmails.description') }}</p>
                                    </div>
                                    <label class="inline-flex items-center cursor-pointer">
                                        <input v-model="marketingEmails" class="sr-only peer" type="checkbox">
                                        <div
                                            class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-300">{{ t('accountSettingsView.notifications.securityAlerts.title') }}</h3>
                                        <p class="text-xs text-gray-400">{{ t('accountSettingsView.notifications.securityAlerts.description') }}</p>
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
                                        {{ t('accountSettingsView.notifications.saveButton') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Activity Tab -->
                    <div v-if="activeTab === 'activity'" class="bg-gray-800 rounded-lg shadow">
                        <div class="px-6 py-4 border-b border-gray-700">
                            <h2 class="text-lg font-medium text-gray-200">{{ t('accountSettingsView.activity.title') }}</h2>
                            <p class="mt-1 text-sm text-gray-400">{{ t('accountSettingsView.activity.subtitle') }}</p>
                        </div>
                        <div class="p-6">
                            <div v-if="loadingHistory" class="flex justify-center py-8">
                                <Loading :loading="true" />
                            </div>
                            <div v-else-if="historyError" class="text-center py-8 text-red-400">
                                {{ t('accountSettingsView.activity.loadError') }}
                            </div>
                            <div v-else-if="loginHistory.length === 0" class="text-center py-8 text-gray-400">
                                {{ t('accountSettingsView.activity.noHistory') }}
                            </div>
                            <div v-else>
                                <h3 class="text-sm font-medium text-gray-400 mb-3">{{ t('accountSettingsView.activity.recentLogins') }}</h3>
                                <div class="overflow-x-auto -mx-6 sm:mx-0">
                                    <table class="min-w-full divide-y divide-gray-700">
                                        <thead>
                                        <tr>
                                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                {{ t('accountSettingsView.activity.table.dateTime') }}
                                            </th>
                                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                {{ t('accountSettingsView.activity.table.ipAddress') }}
                                            </th>
                                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                {{ t('accountSettingsView.activity.table.loginMethod') }}
                                            </th>
                                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                {{ t('accountSettingsView.activity.table.location') }}
                                            </th>
                                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                {{ t('accountSettingsView.activity.table.device') }}
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-700">
                                        <tr v-for="(login, index) in loginHistory" :key="index"
                                            class="hover:bg-gray-700">
                                            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {{ timestampToDate(login.created_at) }}
                                            </td>
                                            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300 max-w-[80px] sm:max-w-[150px] truncate">
                                                {{ login.ip_address }}
                                            </td>
                                            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300 max-w-[80px] sm:max-w-[150px] truncate">
                                                {{ login.login_method }}
                                            </td>
                                            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300 max-w-[80px] sm:max-w-[150px] truncate">
                                                {{ login.location }}
                                            </td>
                                            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300 max-w-[100px] sm:max-w-[200px] md:max-w-[300px] truncate">
                                                {{ login.user_agent }}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Security Tab -->
                    <div v-if="activeTab === 'security'" class="bg-gray-800 rounded-lg shadow">
                        <div class="px-6 py-4 border-b border-gray-700">
                            <h2 class="text-lg font-medium text-gray-200">{{ t('accountSettingsView.security.title') }}</h2>
                            <p class="mt-1 text-sm text-gray-400">{{ t('accountSettingsView.security.subtitle') }}</p>
                        </div>
                        <div class="p-6">
                            <div class="mb-6">
                                <h3 class="text-sm font-medium text-gray-400 mb-2">{{ t('accountSettingsView.security.changePassword.title') }}</h3>
                                <div v-if="passwordSuccess" class="mb-4 p-3 bg-green-900 text-green-300 rounded">
                                    {{ t('accountSettingsView.security.changePassword.success') }}
                                </div>
                                <div v-if="passwordError" class="mb-4 p-3 bg-red-900 text-red-300 rounded">
                                    {{ passwordError }}
                                </div>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-400 mb-1"
                                               for="current-password">{{ t('accountSettingsView.security.changePassword.currentPassword') }}</label>
                                        <input
                                            id="current-password"
                                            v-model="currentPassword"
                                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            type="password"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-400 mb-1" for="new-password">{{ t('accountSettingsView.security.changePassword.newPassword') }}</label>
                                        <input
                                            id="new-password"
                                            v-model="newPassword"
                                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            type="password"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-400 mb-1"
                                               for="confirm-password">{{ t('accountSettingsView.security.changePassword.confirmPassword') }}</label>
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
                                            {{ t('accountSettingsView.security.changePassword.updateButton') }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-6 pb-6 border-t border-b border-gray-700">
                                <h3 class="text-sm font-medium text-gray-400 mb-2">{{ t('accountSettingsView.security.dataExport.title') }}</h3>
                                <p class="text-xs text-gray-400 mb-4">{{ t('accountSettingsView.security.dataExport.description') }}</p>
                                <button
                                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors cursor-pointer"
                                    @click="exportUserData"
                                >
                                    {{ t('accountSettingsView.security.dataExport.exportButton') }}
                                </button>
                            </div>

                            <div class="pt-6 border-t border-gray-700">
                                <h3 class="text-sm font-medium text-gray-400 mb-2">{{ t('accountSettingsView.security.dangerZone.title') }}</h3>
                                <div v-if="!showDeleteConfirm">
                                    <button
                                        class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors cursor-pointer"
                                        @click="confirmDeleteAccount"
                                    >
                                        {{ t('accountSettingsView.security.dangerZone.deleteButton') }}
                                    </button>
                                </div>
                                <div v-else class="bg-red-900/50 p-4 rounded border border-red-700">
                                    <p class="text-sm text-red-300 mb-4">
                                        {{ t('accountSettingsView.security.dangerZone.confirmMessage') }}
                                    </p>
                                    <div class="flex space-x-3">
                                        <button
                                            class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors cursor-pointer"
                                            @click="deleteAccount"
                                        >
                                            {{ t('accountSettingsView.security.dangerZone.confirmButton') }}
                                        </button>
                                        <button
                                            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors cursor-pointer"
                                            @click="cancelDeleteAccount"
                                        >
                                            {{ t('accountSettingsView.security.dangerZone.cancelButton') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    div.loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
    }

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
