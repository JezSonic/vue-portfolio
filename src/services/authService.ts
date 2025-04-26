import ApiService from "@/services/apiService.ts";
import { OAuthProvider } from "@/types/services/auth.d";
import { useUserStore } from "@/stores/userStore.ts";

export default class AuthService extends ApiService {
    constructor() {
        super();
    }

    public static getOAuthUrl(provider: OAuthProvider): Promise<{ content: string }> {
        return this.get<{ content: string }>(`auth/${provider}`);
    }

    public static verifyOAuthCallback(provider: string): Promise<{ content: number }> {
        const url = window.location.search; // remove the ?
        return this.get<{ content: number }>(`auth/${provider}/callback` + url);
    }

    public static logout() {
        const userStore = useUserStore();
        this.get<{ content: number }>(`auth/logout`)
            .then(() => {
                userStore.logout();
            });
        return;
    }



    public static register(email: string, name: string, password: string) {
        return this.post<{ content: number }, { email: string, password: string, name: string }>("auth/register", {
            email: email,
            name: name,
            password: password
        })
    };

    public static login(email: string, password: string) {
        return this.post<{ content: number }, { email: string, password: string }>("auth/login", {
            email: email,
            password: password
        })
    }

    public static performOAuth(provider: OAuthProvider) {
        this.getOAuthUrl(provider)
            .then((res) => {
                window.location.href = res.content;
            });
    };
}