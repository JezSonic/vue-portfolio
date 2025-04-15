import { env, getApiUrl } from "@/helpers/app.ts";
import { ExceptionResponse, ExceptionType } from "@/types/services/api.d";
/**
 * Basic API service inherited by all other API Services
 */
export default class ApiService {
    private static isDev = env("VITE_APP_APP_ENV") == "local" || env("VITE_APP_APP_ENV") == "baremetal";
    private static logoutResponseCodes = this.isDev ? [] : [400, 401, 403];
    private static doNotLogOutExceptions = [ExceptionType.NOT_FOUND_HTTP_EXCEPTION, ExceptionType.AUTHENTICATION_EXCEPTION, ExceptionType.VALIDATION_EXCEPTION];
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
                credentials: credentialsMode || "omit"
            };

            const response = await fetch(target, options);
            const contentType = response.headers.get("Content-Type");
            if (contentType === "application/json") {
                response.json()
                    .then((data: T) => {
                        if (this.logoutResponseCodes.includes(response.status)) {
                            if (this.doNotLogOutExceptions.includes(data.type)) {
                                return reject(this.convertToResponseException(data));
                            }
                            return;
                        }

                        if (response.ok) {
                            return resolve(data);
                        } else {
                            return reject(this.convertToResponseException(data));
                        }

                    }).catch((data: ExceptionResponse) => {
                        reject(data)
                });
            }
        });
    }

    private static convertToResponseException(data: any): ExceptionResponse {
        return {
            type: data.type,
            errors: data.errors,
        }
    }
}