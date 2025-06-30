import ApiService from "@/services/apiService.ts";
import type {
    EOAuthProvider,
    IOAuthCallbackRequestBody,
    IRegisterRequestBody,
    ILoginRequestBody,
    IPasswordResetRequestBody,
    IPasswordResetConfirmRequestBody,
    IPasswordResetTokenVerifyRequestBody, IVerifyTokenResponse
} from "@/types/services/auth.d.ts";
import type { IApiResponse, IApiAuthResponse, IEmptyRequestBody } from "@/types/services/api.d.ts";
import { useUserStore } from "@/stores/userStore.ts";
import router from "@/router/index.ts";

export default class AuthService extends ApiService {
    constructor() {
        super();
    }


    public static getOAuthUrl(provider: EOAuthProvider): Promise<IApiResponse<string>> {
        return this.get<IApiResponse<string>>(`auth/${provider}`);
    }

    public static verifyOAuthCallback(provider: string, ip_address: string): Promise<IApiAuthResponse<number>> {
        const url = window.location.search; // remove the ?
        return this.post<IApiAuthResponse<number>, IOAuthCallbackRequestBody>(`auth/${provider}/callback` + url, {
            ip_address: ip_address
        });
    }

    public static logout() {
        const userStore = useUserStore();
        this.get<IApiResponse<number>>(`auth/logout`, this.getAuthBearerHeader())
            .then(() => {
                userStore.logout();
                router.push('/')
            })
        return;
    }

    public static register(email: string, name: string, password: string) {
        return this.post<IApiAuthResponse<number>, IRegisterRequestBody>("auth/register", {
            email: email,
            name: name,
            password: password
        })
    };

    public static login(email: string, password: string, ip_address: string): Promise<IApiAuthResponse<number>> {
        return this.post<IApiAuthResponse<number>, ILoginRequestBody>("auth/login", {
                email: email,
                password: password,
                ip_address: ip_address
            })
    }

    public static performOAuth(provider: EOAuthProvider) {
        this.getOAuthUrl(provider)
            .then((res) => {
                window.location.href = res.content;
            });
    };

    public static revokeOAuth(provider: EOAuthProvider) {
        return this.post<IApiResponse<boolean>, IEmptyRequestBody>(`auth/${provider}/revoke`, {}, this.getAuthBearerHeader());
    }

    public static requestPasswordReset(email: string) {
        return this.post<IApiResponse<boolean>, IPasswordResetRequestBody>(`auth/reset-password/request`, { email: email });
    }

    public static resetPassword(token: string, password: string) {
        return this.post<IApiResponse<boolean>, IPasswordResetConfirmRequestBody>(`auth/reset-password`, { token: token, password: password });
    }

    public static verifyPasswordResetToken(token: string) {
        return this.post<IVerifyTokenResponse, IPasswordResetTokenVerifyRequestBody>(`auth/reset-password/verify-token`, { token: token });
    }
}
