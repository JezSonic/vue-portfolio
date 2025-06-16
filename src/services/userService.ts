import ApiService from "@/services/apiService.ts";
import {
    ILoginHistory,
    INotificationSettings,
    IProfileUpdateData,
    IUserData,
    UserExportDataStatus
} from "@/types/user.d.ts";
import { useUserStore } from "@/stores/userStore.ts";

export default class UserService extends ApiService {
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

    public static exportUserData() {
        return this.get<{content: string}>(`user/export-data`, {'Authorization': `Bearer ${useUserStore().token}`})
    }

    public static checkUserDataExportStatus(userId: number) {
        return this.get<{status: UserExportDataStatus, valid_until: number }>(`user/${userId}/export-data/status`)
    }

    public static sendVerificationEmail() {
        return this.post<{content: boolean}, {}>(`user/verify-email`, {}, {'Authorization': `Bearer ${useUserStore().token}`})
    }

    public static verifyEmail(token: string) {
        return this.post<{ content: boolean }, {}>(`user/verify-email/${token}`, {}, {'Authorization': `Bearer ${useUserStore().token}`});
    }

    public static deleteAccount() {
        return this.delete<{content: boolean}, {}>(`user`, {'Authorization': `Bearer ${useUserStore().token}`});
    }
}
