import { EOAuthProvider } from "@/types/services/auth.d.ts";

export const env = <T extends string | boolean | number | null>(key: string, default_val: T = null as T): string | boolean | T => {
    const val = import.meta.env[key] as string | undefined;

    if (val === undefined) {
        return default_val;
    }
    if (val === 'true') {
        return true;
    }
    if (val === 'false') {
        return false;
    }
    // Attempt to parse as number if default_val is a number
    if (typeof default_val === 'number' && !isNaN(Number(val))) {
        return Number(val) as T;
    }
    return val || default_val;
};

export const getApiUrl = (): string => {
    //Can add custom logic there :)
    const appEnv = env("VITE_APP_APP_ENV", "local");
    if (appEnv === "local") {
        return env("VITE_APP_API_URL", "");
    } else if (appEnv === "production") {
        return env("VITE_APP_API_URL_PROD", env("VITE_APP_API_URL", ""));
    }
    return env("VITE_APP_API_URL", ""); // Default fallback
}

export const getSupportedOAuthProviders = (): EOAuthProvider[] => {
    const providersString = env("VITE_APP_ENABLED_OAUTH_PROVIDERS", "");
    const arr = providersString ? providersString.split(",") : [];
    const _map_arr: EOAuthProvider[] = [];

    if (arr.includes('google')) {
        _map_arr.push(EOAuthProvider.Google)
    }

    if (arr.includes('github')) {
        _map_arr.push(EOAuthProvider.GitHub)
    }
    return _map_arr;
}
