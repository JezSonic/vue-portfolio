import ApiService from "@/services/apiService.ts";
import { I2FACode, I2FAPrepareResponse } from "@/types/services/2fa";
import { IApiResponse } from "@/types/services/api";

export default class TwoFactorAuthService extends ApiService {
    constructor() {
        super();
    }

    public static prepare2FA() {
        return this.get<I2FAPrepareResponse>('auth/2fa/prepare')
    }

    public static confirm2FA(code: number) {
        return this.post<IApiResponse<boolean>, I2FACode>('auth/2fa/confirm', {code: code})
    }
}