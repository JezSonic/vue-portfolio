import { EEnvironment, IEnv } from "./src/types/utils";
import { EOAuthProvider } from "./src/types/services/auth";

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
        EOAuthProvider.Google,
        EOAuthProvider.GitHub,
    ],
    ENABLE_BACKEND: false,
    ENABLE_DATA_EXPORT: false,
    ENABLE_EMAILING: false,
    ENABLE_LOCALIZATION: false,
    ENABLE_THEMES: false,
    GOOGLE_CLIENT_ID: ""
}