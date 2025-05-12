<script lang="ts" setup>
    import { ref, computed } from "vue";
    import UserService from "@/services/userService.ts";
    import router from "@/router";
    import type { IUserData } from "@/types/user.d.ts";
    import Loading from "@/components/ui/Loading.vue";
    import { OAuthProvider } from "@/types/services/auth.d.ts";
    import Badge from "@/components/badges/Badge.vue";
    import userDefault from "@/assets/img/core-img/userDefault.png";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

    const error = ref<boolean>(false);
    const userId = parseInt(router.currentRoute.value.params.id.toString() as string, 10);
    const userData = ref<IUserData | null>(null);

    UserService.getUserByID(userId)
        .then((data) => {
            userData.value = data;
            if (data.google) {
                connectedSocialAccounts.value.push(OAuthProvider.Google);
            }
            if (data.github) {
                connectedSocialAccounts.value.push(OAuthProvider.GitHub);
            }
        }).catch(() => {
            error.value = true;
        });

    const connectedSocialAccounts = ref<OAuthProvider[]>([]);

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
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric"
        });
    };
</script>

<template>
    <div class="w-full h-full">
        <div v-if="userData == null" class="loading">
            <Loading :loading="true" :error="error" error-text="Account you are trying to view does not exist anymore" />
        </div>
        <div v-else class="text-white w-full max-w-6xl mx-auto px-4 py-8">
            <!-- Profile Header -->
            <div class="bg-gradient-to-r from-blue-900 to-purple-900 rounded-t-lg p-6 shadow-lg">
                <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div class="relative">
                        <img 
                            :src="avatarUrl" 
                            alt="Profile picture" 
                            class="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-lg"
                        >
                        <div class="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-1 shadow-lg" v-if="userData.profile_settings.is_public">
                            <span class="text-xs px-2 py-1 bg-green-600 text-white rounded-full">Public</span>
                        </div>
                        <div class="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-1 shadow-lg" v-else>
                            <span class="text-xs px-2 py-1 bg-gray-600 text-white rounded-full">Private</span>
                        </div>
                    </div>
                    <div class="text-center md:text-left">
                        <h1 class="text-3xl font-bold text-white mb-2">{{ userData?.name }}</h1>
                        <div class="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                            <Badge 
                                v-if="connectedSocialAccounts.includes(OAuthProvider.Google)" 
                                icon="fa-google" 
                                text="Google" 
                                bg_color="rgba(219, 68, 55, 0.2)" 
                                text_color="#DB4437"
                            />
                            <Badge 
                                v-if="connectedSocialAccounts.includes(OAuthProvider.GitHub)" 
                                icon="fa-github" 
                                text="GitHub" 
                                bg_color="rgba(36, 41, 46, 0.2)" 
                                text_color="#ffffff"
                            />
                        </div>
                        <p class="text-gray-300">
                            <i class="fa fa-envelope mr-2"></i>{{ userData?.email }}
                            <span v-if="userData?.email_verified_at" class="ml-2 px-2 py-0.5 bg-green-900 text-green-300 rounded-full text-xs">Verified</span>
                            <span v-else class="ml-2 px-2 py-0.5 bg-yellow-900 text-yellow-300 rounded-full text-xs">Not verified</span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Profile Content -->
            <div class="bg-gray-800 rounded-b-lg shadow-lg overflow-hidden">
                <!-- Profile Information -->
                <div class="p-6 border-b border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-200 mb-4">Profile Information</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Account Details -->
                        <div class="bg-gray-750 rounded-lg p-4 shadow-inner">
                            <h3 class="text-lg font-medium text-gray-300 mb-3 flex items-center">
                                <i class="fa fa-user-circle mr-2"></i>Account Details
                            </h3>
                            <div class="space-y-3">
                                <div>
                                    <p class="text-sm font-medium text-gray-400">Full Name</p>
                                    <p class="text-gray-200">{{ userData?.name }}</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-400">Email Address</p>
                                    <p class="text-gray-200">{{ userData?.email }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Account Timeline -->
                        <div class="bg-gray-750 rounded-lg p-4 shadow-inner">
                            <h3 class="text-lg font-medium text-gray-300 mb-3 flex items-center">
                                <i class="fa fa-clock mr-2"></i>Account Timeline
                            </h3>
                            <div class="space-y-3">
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
                                        <i class="fa fa-plus text-blue-300"></i>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-gray-300">Account Created</p>
                                        <div class="flex items-center text-sm text-gray-400">
                                            <i class="fa fa-calendar mr-1"></i>{{ formatDate(userData?.created_at) }}
                                            <i class="fa fa-clock ml-3 mr-1"></i>{{ formatTime(userData?.created_at) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-purple-900 flex items-center justify-center">
                                        <i class="fa fa-edit text-purple-300"></i>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-gray-300">Last Updated</p>
                                        <div class="flex items-center text-sm text-gray-400">
                                            <i class="fa fa-calendar mr-1"></i>{{ formatDate(userData?.updated_at) }}
                                            <i class="fa fa-clock ml-3 mr-1"></i>{{ formatTime(userData?.updated_at) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Connected Accounts -->
                <div class="p-6" v-if="connectedSocialAccounts.length > 0">
                    <h2 class="text-xl font-semibold text-gray-200 mb-4">Connected Accounts</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Google Account -->
                        <div class="bg-gray-750 rounded-lg p-4 shadow-inner" v-if="userData?.google">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-white flex items-center justify-center">
                                    <font-awesome-icon class="text-2xl" style="color: #DB4437;" :icon="['fab', 'google']" />
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-300">Google</h3>
                                    <p class="text-sm text-gray-400">{{ userData?.google?.email }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- GitHub Account -->
                        <div class="bg-gray-750 rounded-lg p-4 shadow-inner" v-if="userData?.github">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gray-900 flex items-center justify-center">
                                    <font-awesome-icon class="text-2xl text-white" :icon="['fab', 'github']" />
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-300">GitHub</h3>
                                    <p class="text-sm text-gray-400">{{ userData?.github?.login }}</p>
                                    <p class="text-sm text-gray-400" v-if="userData?.github?.location">
                                        <i class="fa fa-map-marker-alt mr-1"></i>{{ userData?.github?.location }}
                                    </p>
                                </div>
                            </div>
                            <div class="mt-4 grid grid-cols-2 gap-2" v-if="userData?.github?.public_repos || userData?.github?.followers">
                                <div class="bg-gray-800 rounded p-2 text-center">
                                    <p class="text-xl font-bold text-gray-200">{{ userData?.github?.public_repos }}</p>
                                    <p class="text-xs text-gray-400">Repositories</p>
                                </div>
                                <div class="bg-gray-800 rounded p-2 text-center">
                                    <p class="text-xl font-bold text-gray-200">{{ userData?.github?.followers }}</p>
                                    <p class="text-xs text-gray-400">Followers</p>
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
        top: 50%; right: 50%;
        transform: translate(50%,-50%);
    }

    .bg-gray-750 {
        background-color: rgba(31, 41, 55, 0.5);
    }

    /* Add subtle hover effects */
    .bg-gray-750:hover {
        background-color: rgba(31, 41, 55, 0.7);
        transition: background-color 0.3s ease;
    }
</style>
