import { defineStore } from 'pinia'
import { ref } from "vue";
export const useUserStore = defineStore('user', () =>{
    const id = ref<number|null>(null)
    const isLoggedIn = (): boolean => {
        return id.value !== null;
    }

    const logout = () => {
        id.value = null;
    }
    return { id, isLoggedIn, logout }
}, {persist: true})