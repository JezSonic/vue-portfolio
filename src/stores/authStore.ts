import { defineStore } from 'pinia'
import { ref } from "vue";
export const useAuthStore = defineStore('auth', () =>{
    const oneTapToken = ref<string|null>(null)
    return { oneTapToken }
})
