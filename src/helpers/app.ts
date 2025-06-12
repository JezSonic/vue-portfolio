import { OAuthProvider } from "@/types/services/auth.d.ts";

export const env = (key: string, default_val: any | null = null) => {
    const val = import.meta.env[key];
    if (val == 'true') {
        return true;
    } else if (val == 'false') {
        return false;
    }
    return val || default_val;
};

export const getApiUrl = () => {
    //Can add custom logic there :)
    if (env("VITE_APP_APP_ENV") == "local") {
        return env("VITE_APP_API_URL");
    } else if (env("VITE_APP_APP_ENV") == "production") {
        return env("VITE_APP_API_URL_PROD",env("VITE_APP_API_URL", ""));
    }
}

export const getSupportedOAuthProviders = (): OAuthProvider[] => {
    const arr = env("VITE_APP_ENABLED_OAUTH_PROVIDERS", "").split(",");
    let _map_arr: OAuthProvider[] = []
    if (arr.includes('google')) {
        _map_arr.push(OAuthProvider.Google)
    }

    if (arr.includes('github')) {
        _map_arr.push(OAuthProvider.GitHub)
    }
    return _map_arr;
}