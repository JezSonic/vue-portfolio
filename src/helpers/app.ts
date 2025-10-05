import type { EOAuthProvider } from "@/types/services/auth.d.ts";
import { EEnvironment, type IEnv } from "@/types/utils.d.ts";
import { config } from "../../config.ts";

export const env = <K extends keyof IEnv>(key: K): IEnv[K] => {
    return config[key]
}

const ensureTrailingSlash = (url: string): string => {
    if (!url.endsWith('/')) {
        return url + '/';
    }
    return url;
}

export const getApiUrl = (): string => {
    const appEnv = env("APP_ENV");
    if (appEnv === EEnvironment.Local) {
        return ensureTrailingSlash(env("API_URL"));
    } else if (appEnv === EEnvironment.Production) {
        return ensureTrailingSlash(env("API_URL_PROD"));
    }
    return ensureTrailingSlash(env("API_URL")); // Default fallback
}

export const getSupportedOAuthProviders = (): EOAuthProvider[] => {
    return env("ENABLED_OAUTH_PROVIDERS");
}
