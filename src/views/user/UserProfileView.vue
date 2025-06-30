<script lang="ts" setup>
    import { ref, computed } from "vue";
    import UserService from "@/services/userService.ts";
    import router from "@/router";
    import type { IUserData } from "@/types/user.d.ts";
    import Loading from "@/components/ui/Loading.vue";
    import { EOAuthProvider } from "@/types/services/auth.d.ts";
    import Badge from "@/components/badges/Badge.vue";
    import userDefault from "@/assets/profile/userDefault.png";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    import { useI18n } from "vue-i18n";
    import type { IExceptionResponse } from "@/types/services/api.d.ts";

    const { t, locale } = useI18n();
    const error = ref<boolean>(false);
    const userId = parseInt(router.currentRoute.value.params.id.toString() as string, 10);
    const userData = ref<IUserData | null>(null);
    const isPrivateProfile = ref<boolean>(false);

    UserService.getUserByID(userId)
        .then((data) => {
            userData.value = data;
            if (data.google) {
                connectedSocialAccounts.value.push(EOAuthProvider.Google);
            }
            if (data.github) {
                connectedSocialAccounts.value.push(EOAuthProvider.GitHub);
            }
        }).catch((err: IExceptionResponse) => {
            if (err.message == "private_profile") {
                isPrivateProfile.value = true;
                return;
            }
            error.value = true;
        });

    const connectedSocialAccounts = ref<EOAuthProvider[]>([]);

    const avatarUrl = computed(() => {
        if (userData.value?.github?.avatar_url) {
            return userData.value.github.avatar_url;
        } else if (userData.value?.google?.avatar_url) {
            return userData.value.google.avatar_url;
        }
        return userDefault;
    });

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(locale.value, {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString(locale.value, {
            hour: "numeric",
            minute: "numeric"
        });
    };
</script>

<template>
    <div class="w-full h-full">
        <div v-if="isPrivateProfile" class="error-container">
            <div class="error-card">
                <font-awesome-icon icon="fa-solid fa-lock" class="error-icon text-yellow-500" />
                <h2 class="error-title">{{ t('userProfileView.error.privateProfile') }}</h2>
                <p class="error-description">This user has set their profile to private. Only the profile owner can view their information.</p>
                <button @click="router.push('/')" class="error-button bg-blue-600 hover:bg-blue-700">
                    <font-awesome-icon icon="fa-solid fa-home" class="mr-2" />
                    Return to Home
                </button>
            </div>
        </div>
        <div v-else-if="userData == null" class="error-container">
            <div class="error-card" v-if="error">
                <font-awesome-icon icon="fa-solid fa-user-slash" class="error-icon text-red-500" />
                <h2 class="error-title">{{ t('userProfileView.error.notFound') }}</h2>
                <p class="error-description">We couldn't find the user profile you're looking for. The user may not exist or has been removed.</p>
                <button @click="router.push('/')" class="error-button bg-blue-600 hover:bg-blue-700">
                    <font-awesome-icon icon="fa-solid fa-home" class="mr-2" />
                    Return to Home
                </button>
            </div>
            <Loading v-else :loading="true" :error="false" />
        </div>
        <div v-else class="text-gray-900 dark:text-white w-full max-w-6xl mx-auto px-4 py-8">
            <!-- Profile Header -->
            <div class="bg-gradient-to-r from-blue-900 to-purple-900 rounded-t-lg p-6 shadow-lg">
                <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div class="relative z-0">
                        <img 
                            :src="avatarUrl" 
                            :alt="t('userProfileView.alt.profilePicture')" 
                            class="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-lg"
                        >
                        <div class="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-1 shadow-lg" v-if="userData.profile_settings.is_public">
                            <span class="text-xs px-2 py-1 bg-green-600 text-white rounded-full">{{ t('userProfileView.profileStatus.public') }}</span>
                        </div>
                        <div class="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-1 shadow-lg" v-else>
                            <span class="text-xs px-2 py-1 bg-gray-600 text-white rounded-full">{{ t('userProfileView.profileStatus.private') }}</span>
                        </div>
                    </div>
                    <div class="text-center md:text-left">
                        <h1 class="text-3xl font-bold !text-white mb-2 truncate max-w-full">{{ userData?.name }}</h1>
                        <div class="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                            <Badge 
                                v-if="connectedSocialAccounts.includes(EOAuthProvider.Google)" 
                                icon="fa-google" 
                                text="Google" 
                                bg_color="rgba(219, 68, 55, 0.2)" 
                                text_color="#DB4437"
                            />
                            <Badge 
                                v-if="connectedSocialAccounts.includes(EOAuthProvider.GitHub)" 
                                icon="fa-github" 
                                text="GitHub" 
                                bg_color="rgba(36, 41, 46, 0.2)" 
                                text_color="#ffffff"
                            />
                        </div>
                        <p class="!text-gray-100 flex items-center flex-wrap">
                            <font-awesome-icon icon="fa-solid fa-envelope" class="flex-shrink-0 mr-2" />
                            <span class="truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">{{ userData?.email }}</span>
                            <span v-if="userData?.email_verified_at" class="ml-2 px-2 py-0.5 bg-green-900 text-green-300 rounded-full text-xs flex-shrink-0">{{ t('userProfileView.emailStatus.verified') }}</span>
                            <span v-else class="ml-2 px-2 py-0.5 bg-yellow-900 text-yellow-300 rounded-full text-xs flex-shrink-0">{{ t('userProfileView.emailStatus.notVerified') }}</span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Profile Content -->
            <div class="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg overflow-hidden">
               <div class="p-6 border-b border-gray-300 dark:border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{{ t('userProfileView.sections.profileInformation') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Account Details -->
                        <div class="bg-gray-750 rounded-lg p-4 shadow-inner">
                            <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                                <font-awesome-icon icon="fa-solid fa-user-circle" class="mr-2" />{{ t('userProfileView.sections.accountDetails') }}
                            </h3>
                            <div class="space-y-3">
                                <div>
                                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ t('userProfileView.fields.fullName') }}</p>
                                    <p class="text-gray-800 dark:text-gray-200 truncate max-w-full">{{ userData?.name }}</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ t('userProfileView.fields.emailAddress') }}</p>
                                    <p class="text-gray-800 dark:text-gray-200 truncate max-w-full">{{ userData?.email }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Account Timeline -->
                        <div class="bg-gray-750 rounded-lg p-4 shadow-inner">
                            <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                                <font-awesome-icon icon="fa-solid fa-clock" class="mr-2" />{{ t('userProfileView.sections.accountTimeline') }}
                            </h3>
                            <div class="space-y-3">
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
                                        <font-awesome-icon icon="fa-solid fa-plus" class="text-blue-300" />
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('userProfileView.fields.accountCreated') }}</p>
                                        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <font-awesome-icon icon="fa-solid fa-calendar" class="mr-1" />{{ formatDate(userData?.created_at) }}
                                            <font-awesome-icon icon="fa-solid fa-clock" class="ml-3 mr-1" />{{ formatTime(userData?.created_at) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-purple-900 flex items-center justify-center">
                                        <font-awesome-icon icon="fa-solid fa-edit" class="text-purple-300" />
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('userProfileView.fields.lastUpdated') }}</p>
                                        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <font-awesome-icon icon="fa-solid fa-calendar" class="mr-1" />{{ formatDate(userData?.updated_at) }}
                                            <font-awesome-icon icon="fa-solid fa-clock" class="ml-3 mr-1" />{{ formatTime(userData?.updated_at) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Connected Accounts -->
                <div class="p-6" v-if="connectedSocialAccounts.length > 0" style="contain: content;">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{{ t('userProfileView.sections.connectedAccounts') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Google Account -->
                        <div class="bg-gray-750 rounded-lg p-4 shadow-inner" v-if="userData?.google">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-white flex items-center justify-center">
                                    <font-awesome-icon class="text-2xl" style="color: #DB4437;" :icon="['fab', 'google']" />
                                </div>
                                <div class="ml-4 overflow-hidden">
                                    <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300">{{ t('userProfileView.connectedAccounts.google') }}</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[400px] sm:max-w-full">{{ userData?.google?.email }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- GitHub Account -->
                        <div class="bg-gray-750 rounded-lg p-4 shadow-inner" v-if="userData?.github">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gray-900 flex items-center justify-center">
                                    <font-awesome-icon class="text-2xl text-white" :icon="['fab', 'github']" />
                                </div>
                                <div class="ml-4 overflow-hidden">
                                    <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300">{{ t('userProfileView.connectedAccounts.github') }}</h3>
                                    <div class="flex flex-row gap-[6px]">
                                        <p class="text-sm text-gray-500 dark:text-gray-400 truncate !max-w-[200px] sm:max-w-full">{{ userData?.github?.login }}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400 truncate !max-w-[200px] sm:max-w-full" v-if="userData?.github?.location">
                                            <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="mr-1 flex-shrink-0" />{{ userData?.github?.location }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 grid grid-cols-2 gap-2" v-if="userData?.github?.public_repos || userData?.github?.followers">
                                <div class="bg-gray-200 dark:bg-gray-800 rounded p-2 text-center">
                                    <p class="text-xl font-bold text-gray-800 dark:text-gray-200">{{ userData?.github?.public_repos }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('userProfileView.connectedAccounts.repositories') }}</p>
                                </div>
                                <div class="bg-gray-200 dark:bg-gray-800 rounded p-2 text-center">
                                    <p class="text-xl font-bold text-gray-800 dark:text-gray-200">{{ userData?.github?.followers }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('userProfileView.connectedAccounts.followers') }}</p>
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
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%; right: 50%;
        transform: translate(50%,-50%);
        width: 100%;
        max-width: 500px;
    }

    .error-card {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        text-align: center;
        width: 100%;

        :root.dark & {
            background-color: #1f2937;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
    }

    .error-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    .error-title {
        color: #1f2937;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.75rem;

        :root.dark & {
            color: #f3f4f6;
        }
    }

    .error-description {
        color: #6b7280;
        font-size: 1rem;
        margin-bottom: 1.5rem;

        :root.dark & {
            color: #d1d5db;
        }
    }

    .error-button {
        border: none;
        border-radius: 0.375rem;
        color: white;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        padding: 0.625rem 1.25rem;
        transition: background-color 0.2s ease;
    }

    .bg-gray-750 {
        background-color: rgba(229, 231, 235, 0.5);
    }

    :root.dark .bg-gray-750 {
        background-color: rgba(31, 41, 55, 0.5);
    }

    /* Add subtle hover effects */
    .bg-gray-750:hover {
        background-color: rgba(229, 231, 235, 0.7);
        transition: background-color 0.3s ease;
    }

    :root.dark .bg-gray-750:hover {
        background-color: rgba(31, 41, 55, 0.7);
        transition: background-color 0.3s ease;
    }
</style>
