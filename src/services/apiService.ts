import { env, getApiUrl } from "@/helpers/app.ts";
import { IExceptionResponse, EExceptionType } from "@/types/services/api.d.ts";
import { useUserStore } from "@/stores/userStore.js";
import Bugsnag from "@bugsnag/js";
/**
 * Basic API service inherited by all other API Services
 */
export default class ApiService {
    private static isDev = env("VITE_APP_APP_ENV") == "local" || env("VITE_APP_APP_ENV") == "baremetal";
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

    private static async fetching<T, D>(url: string, params: D|null = null, method: string = "GET", extraHeaders: HeadersInit = {}, prefix: boolean = true, credentialsMode: RequestCredentials|null = null, removeDefaultHeaders: boolean = false): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const defaultHeaders: HeadersInit = removeDefaultHeaders ? {} : { "Content-Type": "application/json" };
            const target = prefix ? getApiUrl() + url : url;
            const options: RequestInit = {
                method: method.toUpperCase(),
                headers: { ...defaultHeaders, ...extraHeaders },
                body: params ? JSON.stringify(params) : null,
                credentials: credentialsMode || "include"
            };

            const response = await fetch(target, options);
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                response.json()
                    .then((data: T) => {
                        const responseException = this.convertToResponseException(data);
                        if (this.logoutResponseCodes.includes(response.status)) {
                            if (this.doNotLogOutExceptions.includes(responseException.type)) {
                                Bugsnag.notify(responseException);
                                return reject(responseException);
                            }
                            // Potentially notify about ignored logout for debugging?
                            // Bugsnag.notify(new Error(`Logout condition met but ignored for type: ${responseException.type}`));
                            return; // User will be logged out by other mechanisms or this is an intended non-error path
                        }

                        if (response.ok) {
                            return resolve(data);
                        } else {
                            Bugsnag.notify(responseException);
                            return reject(responseException);
                        }

                    }).catch((error: any) => { // Catching 'any' as network errors or non-JSON responses might not be IExceptionResponse
                        // Ensure we're dealing with a structured error if possible, otherwise create a new one
                        const processedError = error instanceof Error ? error : this.convertToResponseException(error);
                        Bugsnag.notify(processedError);
                        reject(processedError);
                });
            } else {
                // Handle cases where response is not JSON (e.g. plain text error from server, or network error)
                const errorText = await response.text();
                const error = new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
                (error as any).status = response.status;
                (error as any).statusText = response.statusText;
                (error as any).responseText = errorText;
                Bugsnag.notify(error);
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

    protected static getAuthBearerHeader(): {Authorization: string} {
       return {'Authorization': `Bearer ${useUserStore().token}`}
    }
}
