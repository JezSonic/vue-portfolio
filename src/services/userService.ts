import ApiService from "@/services/apiService.ts";
import type { IUserData } from "@/types/user.d.ts";
import { useUserStore } from "@/stores/userStore.js";

export default class USerService extends ApiService {
    constructor() {
        super();
    }

    public static getUser() {
        return this.get<IUserData>("user", {'Authorization': `Bearer ${useUserStore().token}`})
    }


    public static getUserByID(id: number) {
        return this.get<IUserData>("user/" + id.toString())
    }
}