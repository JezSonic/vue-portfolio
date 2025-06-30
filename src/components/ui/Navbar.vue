<script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
    import router from "@/router";
    import logo from "@/assets/icons/logo.png";
    import userDefault from "@/assets/profile/userDefault.png";
    import { onMounted, ref } from "vue";
    import { useUserStore } from "@/stores/userStore.js";
    import { useThemeStore } from "@/stores/themeStore";
    import AuthService from "@/services/authService.js";
    import { env } from "@/helpers/app.js";
    import { useI18n } from 'vue-i18n';
    import { setLanguage } from '@/i18n';

    const { t, locale } = useI18n();
    const currentRoute = ref(router.currentRoute.value.path)
    const transparent = ref(true);
    const userStore = useUserStore();
    const themeStore = useThemeStore();

    // Toggle between light and dark theme
    const toggleTheme = () => {
        const newTheme = themeStore.actualTheme === 'dark' ? 'light' : 'dark';
        themeStore.setTheme(newTheme);
    };

    const navigation = [
        {name: 'navigation.home', href: "/", current: router.currentRoute.value.name === "home"},
        {name: 'navigation.commissions', href: "/commissions", current: router.currentRoute.value.name === "commissions"},
        {name: 'navigation.privacyPolicy', href: "/privacy-policy", current: currentRoute.value === "/privacy-policy"},
        {name: 'navigation.contact', href: "/contact", current: currentRoute.value === "/contact"},
    ]

    const languages = [
        { code: 'en', name: 'common.english' },
        { code: 'pl', name: 'common.polish' },
    ];

    const changeLanguage = (langCode) => {
        setLanguage(langCode);
    };

    const onDocumentScroll = () => {
        transparent.value = (window.scrollY === 0);
    };

    onMounted(() => {
        window.addEventListener("scroll", onDocumentScroll);
        currentRoute.value = router.currentRoute.value.path;
    })
</script>

<template>
    <Disclosure as="nav" v-slot="{ open }" :class="[!transparent ? 'bg-transparent shadow-sm backdrop-blur-xs transparent' : 'z-100', 'top-0', 'left-0', 'fixed', 'w-full']">
        <div :class="`mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ${open ? ' bg-gray-800' : ''}`">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton class="relative z-100 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" :aria-expanded="open">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex shrink-0 items-center">
                        <img class="h-8 w-auto" :src="logo" @click="router.push('/')" alt="Your Company" />
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <a v-for="(item, index) in navigation" :key="index" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : '!text-gray-300 hover:bg-gray-700 not-dark:hover:!text-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium cursor-pointer']" :aria-current="item.href === currentRoute? 'page' : undefined">{{ t(item.name) }}</a>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- Theme toggle -->
                    <button v-if="env('VITE_APP_ENABLE_THEMES', false)"
                        @click="toggleTheme" 
                        class="relative cursor-pointer flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                        aria-label="Toggle theme"
                    >
                        <font-awesome-icon 
                            :icon="themeStore.actualTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" 
                            class="mr-1" 
                        />
                        <span class="hidden md:inline">{{ themeStore.actualTheme === 'dark' ? t("theme.light") : t("theme.dark") }}</span>
                    </button>

                    <!-- Language dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <MenuButton class="relative cursor-pointer flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" aria-label="Select language">
                            <font-awesome-icon icon="fa-solid fa-language" class="mr-1" />
                            <span class="hidden md:inline">{{ t('common.language') }}</span>
                        </MenuButton>
                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                                <MenuItem v-for="lang in languages" :key="lang.code" v-slot="{ active }">
                                    <a href="#" @click.prevent="changeLanguage(lang.code)" :class="[active || locale === lang.code ? 'bg-gray-100 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                        {{ t(lang.name) }}
                                        <span v-if="locale === lang.code" class="ml-2">✓</span>
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>

                    <!-- Profile dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <div v-if="userStore.isLoggedIn() && env('VITE_APP_ENABLE_BACKEND', false)">
                            <MenuButton class="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">Open user menu</span>
                                <img class="size-8 rounded-full" :src="userStore.avatarSourceUrl || userDefault" alt="" />
                            </MenuButton>
                        </div>
                        <div v-else-if="env('VITE_APP_ENABLE_BACKEND', false)">
                            <button class="relative cursor-pointer flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden mr-2" @click="router.push('/auth')">
                                {{ t('auth.loginRegister') }}
                            </button>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden" v-if="userStore.isLoggedIn()">
                                <MenuItem v-slot="{ active }">
                                    <a :href="`/user/profile/${userStore.id}`" :class="[active ? 'bg-gray-100 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ t('auth.profile') }}</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <a href="/user/settings" :class="[active ? 'bg-gray-100 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ t('auth.settings') }}</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <a href="#" @click="AuthService.logout()" :class="[active ? 'bg-red-100 outline-hidden' : '', 'block px-4 py-2 text-sm text-red-700']">{{ t('auth.signOut') }}</a>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pt-2 pb-3 bg-gray-800">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ t(item.name) }}</DisclosureButton>

                <!-- Language selector for mobile -->
                <div class="mt-3 border-t border-gray-700 pt-3">
                    <div class="text-gray-400 px-3 py-1 text-sm">{{ t('common.language') }}</div>
                    <div class="mt-1">
                        <a 
                            v-for="lang in languages" 
                            :key="lang.code" 
                            href="#" 
                            @click.prevent="changeLanguage(lang.code)" 
                            :class="[locale === lang.code ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-sm font-medium']"
                        >
                            {{ t(lang.name) }}
                            <span v-if="locale === lang.code" class="ml-2">✓</span>
                        </a>
                    </div>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<style scoped lang="scss">
    .transparent {
        z-index: 100;
        position: fixed;
        border-bottom: 1px solid rgba(255, 255, 255, .2);
        background-color: #00000080;
        box-shadow: -2px 2px 5px #00000080;
        transition-duration: .5s;
    }
</style>
