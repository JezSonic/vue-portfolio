import { EEnvironment, type IEnv } from "@/types/utils.d.ts";
import { EOAuthProvider } from "@/types/services/auth.d.ts";

/**
 * Configuration settings for the application environment.
 * It's a more preferred way than .env since it provides full type safety :)
 * @type {Object} IEnv
 */
export const config: IEnv = {
    API_URL: "http://localhost:81",
    API_URL_PROD: "",
    APP_ENV: EEnvironment.Local,
    ENABLED_OAUTH_PROVIDERS: [
        EOAuthProvider.Google, //Only Google or GoogleOneTap may be enabled at the same time
        EOAuthProvider.GitHub,
    ],
    ENABLE_BACKEND: false,
    ENABLE_DATA_EXPORT: false,
    ENABLE_EMAILING: false,
    ENABLE_LOCALIZATION: false,
    ENABLE_THEMES: false,
    ENABLE_2FA: true,
    GOOGLE_CLIENT_ID: ""
}