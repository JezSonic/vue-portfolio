import { defineStore } from 'pinia'
import { ref } from "vue";
import { IUserData } from "@/types/user.ts";
export const useUserStore = defineStore('user', () =>{
    const id = ref<number|null>(null)
    const token = ref<string|null>(null)
    const tokenExpiration = ref<number|null>(null)
    const refreshToken = ref<string|null>(null)
    const avatarSource = ref<string>("auto")
    const avatarSourceUrl = ref<string|null>()
    const userData = ref<IUserData|null>(null)
    const isLoggedIn = (): boolean => {
        const date = new Date();
        if ((tokenExpiration.value == null) || (date.getTime() > tokenExpiration.value)) {
            logout();
            return false;
        }

        if (id.value == null || token.value == null || refreshToken.value == null) {
            logout();
            return false;
        }

        return true;
    }

    const logout = () => {
        id.value = null;
        userData.value = null;
        token.value = null;
        tokenExpiration.value = null;
        refreshToken.value = null;
        avatarSource.value = "auto";
        avatarSourceUrl.value = null;
    }
    return { id, isLoggedIn, logout, userData, tokenExpiration, token, refreshToken, avatarSource, avatarSourceUrl }
}, {persist: true})
