<script lang="ts" setup>
    import { ref } from "vue";
    import UserService from "@/services/userService.ts";
    import router from "@/router";
    import { IUserData } from "@/types/user.d";
    import Loading from "@/components/ui/Loading.vue";
    import { OAuthProvider } from "@/types/services/auth.d";
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
        })

    const timestampToDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
    };

    const connectedSocialAccounts = ref<OAuthProvider[]>([]);
</script>

<template>
    <div class="w-full h-full">
        <div v-if="userData == null" class="loading">
            <Loading :loading="true" :error="error" error-text="Account you are trying to view does not exist anymore" />
        </div>
        <div v-else class="text-white w-full">
            <div class="px-4 sm:px-0">
                <h3 class="text-base/7 font-semibold text-gray-200">{{userData?.name}}'s profile</h3>
            </div>
            <div class="mt-6 bg-gray-800 rounded-md">
                <dl class="divide-y divide-gray-500">
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm/6 font-medium text-gray-500">Full name</dt>
                        <dd class="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{{userData?.name}}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm/6 font-medium text-gray-500">Email address</dt>
                        <dd class="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{{userData?.email}}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm/6 font-medium text-gray-500">Profile created on</dt>
                        <dd class="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{{timestampToDate(userData?.created_at)}}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm/6 font-medium text-gray-500">Last profile update on</dt>
                        <dd class="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{{timestampToDate(userData?.updated_at)}}</dd>
                    </div>
                </dl>
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
</style>