import { env, getApiUrl } from "@/helpers/app.ts";
import { EExceptionType, IExceptionResponse } from "@/types/services/api.d.ts";
import { useUserStore } from "@/stores/userStore.ts";
import AuthService from "@/services/authService.ts";
import { EEnvironment } from "@/types/utils.d.ts";

/**
 * Basic API service inherited by all other API Services
 */
export default class ApiService {
    private static isDev = env("APP_ENV") == EEnvironment.Local;
    private static logoutResponseCodes = this.isDev ? [] : [400, 401, 403];
    private static doNotLogOutExceptions = [EExceptionType.NOT_FOUND_HTTP_EXCEPTION, EExceptionType.AUTHENTICATION_EXCEPTION, EExceptionType.VALIDATION_EXCEPTION];
    /**
     * Post
     * @param url
     * @param params
     * @param extraHeaders
     * @param prefix
     * @param credentials
     * @param removeDefaultHeaders
     */
    static async post<T, D>(url: string, params: D, extraHeaders: HeadersInit = {}, prefix: boolean = true, credentials: RequestCredentials|null = null, removeDefaultHeaders: boolean = false): Promise<T> {
        return this.fetching<T, D>(url, params, "POST", extraHeaders, prefix, credentials, removeDefaultHeaders);
    }

    static async patch<T, D>(url: string, params: D, extraHeaders: HeadersInit = {}, prefix: boolean = true, credentials: RequestCredentials|null = null, removeDefaultHeaders: boolean = false): Promise<T> {
        return this.fetching<T, D>(url, params, "PATCH", extraHeaders, prefix, credentials, removeDefaultHeaders);
    }

    static async put<T, D>(url: string, params: D, extraHeaders: HeadersInit = {}, prefix: boolean = true, credentials: RequestCredentials|null = null, removeDefaultHeaders: boolean = false): Promise<T> {
        return this.fetching<T, D>(url, params, "PUT", extraHeaders, prefix, credentials, removeDefaultHeaders);
    }

    static async get<T>(url: string, extraHeaders: HeadersInit = {}, prefix: boolean = true): Promise<T> {
        return this.fetching<T, null>(url, null, "GET", extraHeaders, prefix);
    }

    static async delete<T, D>(url: string, params: D) {
        return this.fetching<T, D>(url, params, "DELETE");
    }

    private static async fetching<T, D>(url: string, params: D|null = null, method: string = "GET", extraHeaders: HeadersInit = {}, prefix: boolean = true, credentialsMode: RequestCredentials|null = null, removeDefaultHeaders: boolean = false, isRetry: boolean = false): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const defaultHeaders: HeadersInit = removeDefaultHeaders ? {} : { "Content-Type": "application/json" };
            const target = prefix ? getApiUrl() + url : url;
            const options: RequestInit = {
                method: method.toUpperCase(),
                headers: { ...defaultHeaders, ...extraHeaders },
                body: params ? JSON.stringify(params) : null,
                credentials: credentialsMode || "include"
            };

            try {
                const response = await fetch(target, options);
                const contentType = response.headers.get("Content-Type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();

                    // Handle token expiration
                    if (!response.ok && data.type === EExceptionType.REFRESH_TOKEN_EXCEPTION) {
                        AuthService.logout();
                        return reject(this.convertToResponseException(data));
                    }

                    if (this.logoutResponseCodes.includes(response.status)) {
                        if (this.doNotLogOutExceptions.includes(data.type)) {
                            return reject(this.convertToResponseException(data));
                        }
                        AuthService.logout();
                    }

                    if (response.ok) {
                        const newAccessToken = response.headers.get("X-New-Access-Token");
                        if (newAccessToken !== null) {
                            useUserStore().token = newAccessToken;
                        }
                        return resolve(data);
                    } else {
                        return reject(this.convertToResponseException(data));
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    private static convertToResponseException(data: any): IExceptionResponse {
        return {
            type: data.type,
            errors: data.errors,
            code: data.code,
            message: data.message,
            debug: data.debug
        }
    }

    public static async getIP(): Promise<{ip: string}> {
		return new Promise((resolve, reject): void => {
			fetch("https://api.ipify.org?format=json")
				.then((res) => {
					resolve(res.json());
				})
				.catch(reject);
		});
	}

    protected static getAuthBearerHeader(): {[key: string]: string } {
        const userStore = useUserStore()
        return {'Authorization': `Bearer ${userStore.token}`, 'X-Refresh-Token': userStore.refreshToken || ""}
    }
}
