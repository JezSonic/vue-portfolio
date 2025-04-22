import ApiService from "@/services/apiService.ts";
import { IUserData } from "@/types/user.d";

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