import ApiService from "@/services/apiService.ts";
import type { ILoginHistory, INotificationSettings, IProfileUpdateData, IUserData } from "@/types/user.d.ts";
import { useUserStore } from "@/stores/userStore.ts";

export default class USerService extends ApiService {
    constructor() {
        super();
    }

    public static getUser() {
        return this.get<IUserData>("user", {'Authorization': `Bearer ${useUserStore().token}`})
    }


    public static getUserByID(id: number) {
        return this.get<IUserData>(`user/${id}`)
    }

    public static update(data: IProfileUpdateData) {
        return this.patch<{content: boolean}, IProfileUpdateData>(`user`, data, {'Authorization': `Bearer ${useUserStore().token}`})
    }

    public static getLoginHistory() {
        return this.get<{content: ILoginHistory[]}>(`user/activity/login`, {'Authorization': `Bearer ${useUserStore().token}`})
    }

    public static updateNotificationSettings(userId: number, notificationSettings: INotificationSettings) {
        return this.put<{content: boolean}, INotificationSettings>(
            `user/${userId}/notifications`, 
            notificationSettings, 
            {'Authorization': `Bearer ${useUserStore().token}`}
        )
    }

    public static exportUserData(userId: number) {
        return this.get<{content: string}>(`user/${userId}/export`, {'Authorization': `Bearer ${useUserStore().token}`})
    }
}
