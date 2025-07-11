import ApiService from "@/services/apiService.ts";
import type {
    ILoginHistory,
    INotificationSettings,
    IProfileUpdateData,
    IUserData,
    EUserExportDataStatus
} from "@/types/user.d.ts";

import type {
    IApiResponse,
    IApiStatusResponse,
    IEmptyRequestBody,
    IPaginatedResponse
} from "@/types/services/api.d.ts";

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

    public static getLoginHistory(page: number = 1, per_page: number = 10) {
        return this.post<IPaginatedResponse<ILoginHistory>, {page: number, per_page: number}>(`user/activity/login`, {page: page, per_page: per_page},this.getAuthBearerHeader())
    }

    public static updateNotificationSettings(notificationSettings: INotificationSettings) {
        return this.put<IApiResponse<boolean>, INotificationSettings>(
            `user/notifications`,
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
