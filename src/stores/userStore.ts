import { defineStore } from 'pinia'
import { ref } from "vue";
export const useUserStore = defineStore('user', () =>{
    const id = ref<number|null>(null)

    return { id }
}, {persist: true})