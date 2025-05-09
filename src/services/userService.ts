import ApiService from "@/services/apiService.ts";
import type { IUserData } from "@/types/user.d.ts";

export default class USerService extends ApiService {
    constructor() {
        super();
    }

    public static getUser() {
        return this.get<IUserData>("user")
    }


    public static getUserByID(id: number) {
        return this.get<IUserData>("user/" + id.toString())
    }
}