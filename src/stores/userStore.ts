import { defineStore } from 'pinia'
import { ref } from "vue";
export const useUserStore = defineStore('user', () =>{
    const id = ref<number|null>(null)
    const token = ref<string|null>(null)
    const avatarSource = ref<string>("auto")
    const avatarSourceUrl = ref<string|null>()
    const isLoggedIn = (): boolean => {
        return id.value !== null;
    }

    const logout = () => {
        id.value = null;
        token.value = null;
        avatarSource.value = "auto";
        avatarSourceUrl.value = null;
    }
    return { id, isLoggedIn, logout, token, avatarSource, avatarSourceUrl }
}, {persist: true})