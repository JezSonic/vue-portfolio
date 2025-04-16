import ApiService from "@/services/apiService.ts";
import { OAuthProvider } from "@/types/services/auth.d";

export default class AuthService extends ApiService {
    constructor() {
        super();
    }

    public static getOAuthUrl(provider: OAuthProvider): Promise<{ content: string }> {
        return this.get<{ content: string }>(`auth/${provider}`);
    }

    public static verifyOAuthCallback(provider: string): Promise<{ content: number }> {
        const url = window.location.search; // remove the ?
        console.log(url);
        return this.get<{ content: number }>(`auth/${provider}/callback` + url);
    }
}