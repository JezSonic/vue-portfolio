<script lang="ts" setup>
import { ref, watch } from "vue";
import Loading from "@/components/ui/Loading.vue";
import UserService from "@/services/userService.ts";
import type { ILoginHistory, IUserData } from "@/types/user.d.ts";
import { useI18n } from "vue-i18n";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

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
const itemsPerPage = ref<number>(10);
const totalPages = ref<number>(0);
const totalItems = ref<number>(0);

// Items per page options
const itemsPerPageOptions = [2, 5, 10, 25, 50];

// Set items per page
const setItemsPerPage = (items: number) => {
    itemsPerPage.value = items;
    currentPage.value = 1; // Reset to first page when changing items per page
    loadLoginHistory();
};

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
                <!-- Card view for small screens (mobile) -->
                <div class="md:hidden space-y-4 px-3">
                    <div v-for="(login, index) in loginHistory" :key="index" 
                         class="bg-gray-700/50 rounded-lg p-4 shadow-sm hover:bg-gray-700 transition-colors border border-gray-700">
                        <div class="grid grid-cols-2 gap-3">
                            <div class="mb-2">
                                <div class="text-xs font-medium text-gray-400 uppercase">
                                    {{ t("accountSettingsView.activity.table.dateTime") }}
                                </div>
                                <div class="text-sm text-gray-300 mt-1">
                                    {{ timestampToDate(login.performed_at) }}
                                </div>
                            </div>
                            <div class="mb-2">
                                <div class="text-xs font-medium text-gray-400 uppercase">
                                    {{ t("accountSettingsView.activity.table.ipAddress") }}
                                </div>
                                <div class="text-sm text-gray-300 mt-1 truncate">
                                    {{ login.ip_address }}
                                </div>
                            </div>
                            <div class="mb-2">
                                <div class="text-xs font-medium text-gray-400 uppercase">
                                    {{ t("accountSettingsView.activity.table.loginMethod") }}
                                </div>
                                <div class="text-sm text-gray-300 mt-1 truncate">
                                    {{ login.login_method }}
                                </div>
                            </div>
                            <div class="mb-2">
                                <div class="text-xs font-medium text-gray-400 uppercase">
                                    {{ t("accountSettingsView.activity.table.location") }}
                                </div>
                                <div class="text-sm text-gray-300 mt-1 truncate">
                                    {{ login.location || "Unknown location"}}
                                </div>
                            </div>
                            <div class="col-span-2">
                                <div class="text-xs font-medium text-gray-400 uppercase">
                                    {{ t("accountSettingsView.activity.table.device") }}
                                </div>
                                <div class="text-sm text-gray-300 mt-1 break-words">
                                    {{ login.user_agent }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Pagination Controls -->
                    <div class="flex flex-col mt-4 space-y-3">
                        <div class="text-sm text-gray-400 text-center">
                            {{ t("accountSettingsView.activity.pagination.showing") }} {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(((currentPage - 1) * itemsPerPage + 1) + (itemsPerPage - 1), totalItems) }} {{ t("accountSettingsView.activity.pagination.of") }} {{ totalItems }}
                        </div>
                        <div class="flex flex-col space-y-2 items-center">
                            <!-- Items per page dropdown -->
<!--                            <div class="dropdown-container w-full">-->
<!--                                <Menu as="div" class="relative w-full">-->
<!--                                    <MenuButton class="relative cursor-pointer flex items-center justify-center rounded-md bg-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden transition-colors w-full">-->
<!--                                        {{ itemsPerPage }} items per page-->
<!--                                    </MenuButton>-->
<!--                                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">-->
<!--                                        <MenuItems class="absolute z-50 w-full origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden">-->
<!--                                            <MenuItem v-for="option in itemsPerPageOptions" :key="option" v-slot="{ active }">-->
<!--                                                <a href="#" @click.prevent="setItemsPerPage(option)" :class="[active || itemsPerPage === option ? 'bg-gray-600 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-300']">-->
<!--                                                    {{ option }} items per page-->
<!--                                                    <span v-if="itemsPerPage === option" class="ml-2">✓</span>-->
<!--                                                </a>-->
<!--                                            </MenuItem>-->
<!--                                        </MenuItems>-->
<!--                                    </transition>-->
<!--                                </Menu>-->
<!--                            </div>-->

                            <div class="flex space-x-2 w-full justify-center">
                                <button 
                                    @click="setPage(Math.max(1, currentPage - 1))"
                                    :disabled="currentPage === 1"
                                    :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
                                    class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 transition-colors flex-1">
                                    {{ t("accountSettingsView.activity.pagination.previous") }}
                                </button>
                                <button 
                                    @click="setPage(Math.min(totalPages, currentPage + 1))"
                                    :disabled="currentPage === totalPages"
                                    :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
                                    class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 transition-colors flex-1">
                                    {{ t("accountSettingsView.activity.pagination.next") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table view for larger screens -->
                <div class="hidden md:block overflow-x-auto -mx-6 sm:mx-0">
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
                                {{ login.location || "Unknown location" }}
                            </td>
                            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300 max-w-[100px] sm:max-w-[200px] md:max-w-[300px] truncate">
                                {{ login.user_agent }}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <!-- Pagination Controls -->
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 px-3 sm:px-6 space-y-3 sm:space-y-0">
                        <div class="text-sm text-gray-400 text-center sm:text-left">
                            {{ t("accountSettingsView.activity.pagination.showing") }} {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(((currentPage - 1) * itemsPerPage + 1) + (itemsPerPage - 1), totalItems) }} {{ t("accountSettingsView.activity.pagination.of") }} {{ totalItems }}
                        </div>
                        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center">
                            <!-- Items per page dropdown -->
                            <div class="dropdown-container w-full sm:w-auto">
                                <Menu as="div" class="relative w-full sm:w-auto">
                                    <MenuButton class="relative cursor-pointer flex items-center justify-center sm:justify-start rounded-md bg-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden transition-colors w-full sm:w-auto">
                                        {{ itemsPerPage }} items per page
                                    </MenuButton>
                                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                        <MenuItems class="absolute z-50 w-44 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                                            <MenuItem v-for="option in itemsPerPageOptions" :key="option" v-slot="{ active }">
                                                <a href="#" @click.prevent="setItemsPerPage(option)" :class="[active || itemsPerPage === option ? 'bg-gray-600 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-300']">
                                                    {{ option }} items per page
                                                    <span v-if="itemsPerPage === option" class="ml-2">✓</span>
                                                </a>
                                            </MenuItem>
                                        </MenuItems>
                                    </transition>
                                </Menu>
                            </div>

                            <div class="flex space-x-2 w-full sm:w-auto justify-center">
                                <button 
                                    @click="setPage(Math.max(1, currentPage - 1))"
                                    :disabled="currentPage === 1"
                                    :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
                                    class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 transition-colors flex-1 sm:flex-none">
                                    {{ t("accountSettingsView.activity.pagination.previous") }}
                                </button>
                                <button 
                                    @click="setPage(Math.min(totalPages, currentPage + 1))"
                                    :disabled="currentPage === totalPages"
                                    :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
                                    class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 transition-colors flex-1 sm:flex-none">
                                    {{ t("accountSettingsView.activity.pagination.next") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdown-container {
    position: relative;
}

.dropdown-container .fixed {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.5rem;
    width: 100%;
    z-index: 50;
}
</style>
