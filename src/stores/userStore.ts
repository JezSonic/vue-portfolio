import { defineStore } from 'pinia'
import { ref } from "vue";
export const useUserStore = defineStore('user', () =>{
    const id = ref<number|null>(null)
    const token = ref<string|null>(null)
    const refreshToken = ref<string|null>(null)
    const avatarSource = ref<string>("auto")
    const avatarSourceUrl = ref<string|null>()
    const isLoggedIn = (): boolean => {
        return id.value !== null && token.value !== null && refreshToken.value !== null;
    }

    const logout = () => {
        id.value = null;
        token.value = null;
        refreshToken.value = null;
        avatarSource.value = "auto";
        avatarSourceUrl.value = null;
    }
    return { id, isLoggedIn, logout, token, refreshToken, avatarSource, avatarSourceUrl }
}, {persist: true})
