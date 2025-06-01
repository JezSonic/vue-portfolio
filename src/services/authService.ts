import ApiService from "@/services/apiService.ts";
import type { OAuthProvider } from "@/types/services/auth.d.ts";
import { useUserStore } from "@/stores/userStore.ts";
import router from "@/router/index.ts";

export default class AuthService extends ApiService {
    constructor() {
        super();
    }


    public static getOAuthUrl(provider: OAuthProvider): Promise<{ content: string }> {
        return this.get<{ content: string }>(`auth/${provider}`);
    }

    public static verifyOAuthCallback(provider: string, ip_address: string): Promise<{ content: number, token: string }> {
        const url = window.location.search; // remove the ?
        return this.post<{ content: number, token: string }, {ip_address: string}>(`auth/${provider}/callback` + url, {
            ip_address: ip_address
        });
    }

    public static logout() {
        const userStore = useUserStore();
        this.get<{ content: number }>(`auth/logout`, {'Authorization': `Bearer ${userStore.token}`})
            .then(() => {
                userStore.logout();
                router.push('/')
            })
        return;
    }

    public static register(email: string, name: string, password: string) {
        return this.post<{ content: number, token: string }, { email: string, password: string, name: string }>("auth/register", {
            email: email,
            name: name,
            password: password
        })
    };

    public static login(email: string, password: string, ip_address: string): Promise<{ content: number, token: string }> {
        return this.post<{ content: number, token: string }, { email: string, password: string, ip_address: string }>("auth/login", {
                email: email,
                password: password,
                ip_address: ip_address
            })
    }

    public static performOAuth(provider: OAuthProvider) {
        this.getOAuthUrl(provider)
            .then((res) => {
                window.location.href = res.content;
            });
    };

    public static revokeOAuth(provider: OAuthProvider) {
        return this.post<{ content: boolean }, {}>(`auth/${provider}/revoke`, {}, {'Authorization': `Bearer ${useUserStore().token}`});
    }

    public static requestPasswordReset(email: string) {
        return this.post<{ content: boolean }, { email: string }>(`auth/reset-password/request`, { email: email });
    }

    public static resetPassword(token: string, password: string) {
        return this.post<{ content: boolean }, { token: string, password: string }>(`auth/reset-password`, { token: token, password: password });
    }

    public static verifyPasswordResetToken(token: string) {
        return this.post<{ content: boolean }, { token: string }>(`auth/reset-password/verify-token`, { token: token });
    }
}