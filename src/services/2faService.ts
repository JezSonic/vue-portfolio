import ApiService from "@/services/apiService.ts";
import { I2FACode, I2FAConfirmResponse, I2FAPrepareResponse, I2FARecoveryCode } from "@/types/services/2fa";
import { IApiResponse, IEmptyRequestBody } from "@/types/services/api";

export default class TwoFactorAuthService extends ApiService {
    constructor() {
        super();
    }

    public static prepare2FA() {
        return this.get<I2FAPrepareResponse>('auth/2fa/prepare')
    }

    public static confirm2FA(code: number) {
        return this.post<I2FAConfirmResponse, I2FACode>('auth/2fa/confirm', {code: code})
    }

    public static disable2FA() {
        return this.post<IApiResponse<boolean>, IEmptyRequestBody>('auth/2fa/disable', {})
    }

    public static showRecoveryCodes() {
        return this.get<{recovery_codes: I2FARecoveryCode[]}>('auth/2fa/recovery-codes')
    }
}