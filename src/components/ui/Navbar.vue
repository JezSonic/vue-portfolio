<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import settings from "../../../data/settings";
    import { env } from "@/helpers/app.ts";
    import Button from "@/components/ui/Button.vue";
    import { useUserStore } from "@/stores/userStore.ts";
    import AuthService from "@/services/authService.ts";
    import router from "@/router";
    const transparent = ref(true);
    const hamburgerOn = ref(false);
    const userStore = useUserStore();
    const onDocumentScroll = () => {
        transparent.value = window.scrollY === 0;
    };
    const onResize = () => {
        if (window.innerWidth >= 870) {
            hamburgerOn.value = false;
        }
    }
    onMounted(() => {
        window.addEventListener("scroll", onDocumentScroll);
        window.addEventListener("resize", onResize);
        onDocumentScroll();
    });
</script>

<template>
    <div :class="{ 'nav-container': true, 'transparent': transparent }">
        <nav>
            <div class="left">
                <h1>
                    <router-link to="/">{{ settings.title }}</router-link>
                </h1>
            </div>

            <div class="right">
                <div :class="'right__links' + (hamburgerOn ? '__hamburger' : '')">
                    <svg xmlns="http://www.w3.org/2000/svg" v-if="hamburgerOn" viewBox="0 0 352 512" class="right__close" @click="hamburgerOn = false">
                        <path
                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                            fill="#FFFFFF">
                        </path>
                    </svg>
                    <h4 @click="hamburgerOn = false"><router-link to="/games">Games</router-link></h4>
                    <h4 @click="hamburgerOn = false"><router-link to="/commissions">Commissions</router-link></h4>
                    <h4 @click="hamburgerOn = false"><router-link to="/contact">Contact</router-link></h4>
                    <Button text="Login / Register" @click="hamburgerOn = false; router.push('/auth')" v-if="env('VITE_APP_ENABLE_BACKEND') && !userStore.isLoggedIn()" />
                    <Button text="Logout" @click="AuthService.logout(); hamburgerOn = false" v-if="env('VITE_APP_ENABLE_BACKEND') && userStore.isLoggedIn()" />
                </div>
                <div class="right__open">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" @click="hamburgerOn = !hamburgerOn">
                        <path
                            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                            fill="#FFFFFF">
                        </path>
                    </svg>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped lang="scss">
    .nav-container {
        width: 100%;
        display: flex;
        justify-content: center;
        position: fixed;
        padding: 10px 25px;
        top: 0;
        left: 0;
        z-index: 10;
        backdrop-filter: blur(10px);
        transition-duration: 500ms;

        &:not(.transparent) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(0, 0, 0, 0.5);
            box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.5);
        }
    }

    .title {
        cursor: pointer;
        user-select: none;
        display: inline;
        text-decoration: none;
        color: var(--accent-color);
        font-size: 25px;
        font-weight: bold;
    }

    nav {
        max-width: 1500px;
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    nav > div {
        flex: 1;
    }

    .right {
        display: flex;
        justify-content: end;
        align-items: center;
        &__links {
            display: flex;
            justify-content: end;
            align-items: center;
            a {
                margin-right: 12px;
            }
        }
        &__open, &__close {
            width: 30px;
            height: 30px;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            display: none;
        }
    }

    @media (max-width: 869px) {
        .right {
            &__open {
                display: block;
            }

            &__links {
                display: none;
                &__hamburger {
                    a {
                        color: white !important;
                    }
                    h4 {
                        padding-bottom:12px;
                    }
                    position: fixed;
                    height: 100vh;
                    width: 100%;
                    max-width: 400px;
                    top: 0;
                    left: 0;
                    display: inline-flex;
                    margin-top: 0;
                    padding: 40px 0;
                    text-align: center;
                    background: #222;
                    overflow-y: auto;
                    transition: all 0.3s ease;
                    flex-direction: column;
                    align-items: center;

                    > .right__close {
                        display: block;
                        position: fixed;
                        top: 16px;
                        left: 358px;
                    }
                }
            }
        }
    }
</style>
