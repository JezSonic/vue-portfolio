<script lang="ts" setup>
import { ref, watch } from "vue";
import Loading from "@/components/ui/Loading.vue";
import UserService from "@/services/userService.ts";
import type { ILoginHistory, IUserData } from "@/types/user.d.ts";
import { useI18n } from "vue-i18n";

const props = defineProps<{
    userData: IUserData | null;
    timestampToDate: (timestamp: string) => string;
    activeTab: string;
}>();

const {t} = useI18n();

// Login history
const loginHistory = ref<ILoginHistory[]>([]);
const loadingHistory = ref<boolean>(false);
const historyError = ref<boolean>(false);

// Pagination for login history
const currentPage = ref<number>(1);
const itemsPerPage = ref<number>(2);
const totalPages = ref<number>(0);
const totalItems = ref<number>(0);

// Load login history
const loadLoginHistory = () => {
    if (props.activeTab !== "activity") return;

    loadingHistory.value = true;
    historyError.value = false;

    UserService.getLoginHistory(currentPage.value, itemsPerPage.value)
        .then((data) => {
            loginHistory.value = data.data;
            totalPages.value = data.total_pages;
            totalItems.value = data.total;
            loadingHistory.value = false;
        })
        .catch(() => {
            historyError.value = true;
            loadingHistory.value = false;
        });
};
// Load login history when tab becomes active
watch(() => props.activeTab, (newTab) => {
    if (newTab === "activity") {
        currentPage.value = 1; // Reset to first page when loading new data
        loadLoginHistory();
    }
}, { immediate: true });

const setPage = (page: number) => {
    currentPage.value = page;
    loadLoginHistory();
}
</script>

<template>
    <div class="bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-700">
            <h2 class="text-lg font-medium text-gray-200">{{ t("accountSettingsView.activity.title") }}</h2>
            <p class="mt-1 text-sm text-gray-400">{{ t("accountSettingsView.activity.subtitle") }}</p>
        </div>
        <div class="p-6">
            <div v-if="loadingHistory" class="flex justify-center py-8">
                <Loading :loading="true" :centered="false" />
            </div>
            <div v-else-if="historyError" class="text-center py-8 text-red-400">
                {{ t("accountSettingsView.activity.loadError") }}
            </div>
            <div v-else-if="loginHistory.length === 0" class="text-center py-8 text-gray-400">
                {{ t("accountSettingsView.activity.noHistory") }}
            </div>
            <div v-else>
                <h3 class="text-sm font-medium text-gray-400 mb-3">
                    {{ t("accountSettingsView.activity.recentLogins") }}</h3>
                <div class="overflow-x-auto -mx-6 sm:mx-0">
                    <table class="min-w-full divide-y divide-gray-700">
                        <thead>
                        <tr>
                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                {{ t("accountSettingsView.activity.table.dateTime") }}
                            </th>
                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                {{ t("accountSettingsView.activity.table.ipAddress") }}
                            </th>
                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                {{ t("accountSettingsView.activity.table.loginMethod") }}
                            </th>
                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                {{ t("accountSettingsView.activity.table.location") }}
                            </th>
                            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                {{ t("accountSettingsView.activity.table.device") }}
                            </th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-700">
                        <tr v-for="(login, index) in loginHistory" :key="index"
                            class="hover:bg-gray-700">
                            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {{ timestampToDate(login.performed_at) }}
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

                    <!-- Pagination Controls -->
                    <div class="flex items-center justify-between mt-4 px-3 sm:px-6">
                        <div class="text-sm text-gray-400">
                            {{ t("accountSettingsView.activity.pagination.showing") }} {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ ((currentPage - 1) * itemsPerPage + 1) + (itemsPerPage - 1)}} {{ t("accountSettingsView.activity.pagination.of") }} {{ totalItems }}
                        </div>
                        <div class="flex space-x-2">
                            <button 
                                @click="setPage(Math.max(1, currentPage - 1))"
                                :disabled="currentPage === 1"
                                :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
                                class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 transition-colors">
                                {{ t("accountSettingsView.activity.pagination.previous") }}
                            </button>
                            <button 
                                @click="setPage(Math.min(totalPages, currentPage + 1))"
                                :disabled="currentPage === totalPages"
                                :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
                                class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 transition-colors">
                                {{ t("accountSettingsView.activity.pagination.next") }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>