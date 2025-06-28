import ApiService from "@/services/apiService.ts";
import type {
    ILoginHistory,
    INotificationSettings,
    IProfileUpdateData,
    IUserData,
    EUserExportDataStatus
} from "@/types/user.d.ts";

import type { IApiResponse, IApiStatusResponse, IEmptyRequestBody } from "@/types/services/api.d.ts";

export default class UserService extends ApiService {
    constructor() {
        super();
    }

    public static getUser() {
        return this.get<IUserData>("user", this.getAuthBearerHeader())
    }

    public static getUserByID(id: number) {
        return this.get<IUserData>(`user/${id}`)
    }

    public static update(data: IProfileUpdateData) {
        return this.patch<IApiResponse<boolean>, IProfileUpdateData>(`user`, data, this.getAuthBearerHeader())
    }

    public static getLoginHistory() {
        return this.get<IApiResponse<ILoginHistory[]>>(`user/activity/login`, this.getAuthBearerHeader())
    }

    public static updateNotificationSettings(userId: number, notificationSettings: INotificationSettings) {
        return this.put<IApiResponse<boolean>, INotificationSettings>(
            `user/${userId}/notifications`, 
            notificationSettings,
            this.getAuthBearerHeader()
        )
    }

    public static exportUserData() {
        return this.get<IApiResponse<string>>(`user/export-data`, this.getAuthBearerHeader())
    }

    public static checkUserDataExportStatus(userId: number) {
        return this.get<IApiStatusResponse<void, EUserExportDataStatus>>(`user/${userId}/export-data/status`)
    }

    public static sendVerificationEmail() {
        return this.post<IApiResponse<boolean>, IEmptyRequestBody>(`user/verify-email`, {}, this.getAuthBearerHeader())
    }

    public static verifyEmail(token: string) {
        return this.post<IApiResponse<boolean>, IEmptyRequestBody>(`user/verify-email/${token}`, {}, this.getAuthBearerHeader());
    }

    public static deleteAccount() {
        return this.delete<IApiResponse<boolean>, IEmptyRequestBody>(`user`, this.getAuthBearerHeader());
    }
}
