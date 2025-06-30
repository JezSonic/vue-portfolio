import { env, getApiUrl } from "@/helpers/app.ts";
import { IExceptionResponse, EExceptionType } from "@/types/services/api.d.ts";
import { useUserStore } from "@/stores/userStore.js";
import { cacheService } from "./cacheService"; // Import CacheService
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

    /**
     * Performs a GET request.
     * Supports caching with configurable TTL and cache skipping.
     * @template T The expected response type.
     * @param {string} url The endpoint URL.
     * @param {HeadersInit} [extraHeaders={}] Additional headers for the request.
     * @param {boolean} [prefix=true] Whether to prefix the URL with the API base URL.
     * @param {boolean} [skipCache=false] If true, bypasses the cache for reading and writing.
     * @param {number} [cacheTTL=3600000] Time-To-Live for the cache entry in milliseconds (default: 1 hour).
     * @returns {Promise<T>} A promise that resolves with the fetched data.
     */
    static async get<T>(url: string, extraHeaders: HeadersInit = {}, prefix: boolean = true, skipCache: boolean = false, cacheTTL: number = 3600000): Promise<T> {
        const cacheKey = `GET:${prefix ? getApiUrl() : ''}${url}`;
        if (!skipCache) {
            const cachedData = cacheService.get<T>(cacheKey);
            if (cachedData !== null) {
                if (this.isDev) {
                    console.log(`[ApiService] Cache HIT for ${cacheKey}`);
                }
                return Promise.resolve(cachedData);
            }
            if (this.isDev) {
                console.log(`[ApiService] Cache MISS for ${cacheKey}`);
            }
        } else if (this.isDev) {
            console.log(`[ApiService] Skipping cache for ${cacheKey}`);
        }

        return this.fetching<T, null>(url, null, "GET", extraHeaders, prefix)
            .then(data => {
                if (!skipCache) {
                    cacheService.set(cacheKey, data, cacheTTL);
                }
                return data;
            });
    }

    /**
     * Invalidates a specific cache entry for a GET request.
     * This removes the specified URL's response from the cache.
     * @param {string} url The URL (path) of the GET request to invalidate (without the API base URL if prefix was used).
     * @param {boolean} [prefix=true] Whether the API prefix was used for the original cached request.
     * @returns {void}
     */
    public static invalidateCache(url: string, prefix: boolean = true): void {
        const cacheKey = `GET:${prefix ? getApiUrl() : ''}${url}`;
        cacheService.delete(cacheKey);
        if (this.isDev) {
            console.log(`[ApiService] Invalidated cache for ${cacheKey}`);
        }
    }

    /**
     * Clears the entire API cache for GET requests.
     * This method iterates through the cache and removes all entries that were stored by ApiService GET requests.
     * @returns {void}
     */
    public static clearApiCache(): void {
        // We only cache GET requests, so we iterate through cache and remove entries starting with GET:
        // This is a bit of a workaround as cacheService itself doesn't know about API prefixes.
        // A more robust solution might involve a dedicated CacheManager that understands API structures.
        const prefix = `GET:${getApiUrl()}`;
        const cache = (cacheService as any).cache as Map<string, unknown>; // Access private cache for iteration
        for (const key of cache.keys()) {
            if (key.startsWith(prefix) || key.startsWith("GET:")) { // also clear non-prefixed GETs if any
                 cacheService.delete(key);
            }
        }
        if (this.isDev) {
            console.log("[ApiService] Cleared the entire API cache for GET requests.");
        }
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
                    .then((data: T | IExceptionResponse) => { // Can be T on success or IExceptionResponse on error
                        if (this.logoutResponseCodes.includes(response.status)) {
                            // Assuming data is IExceptionResponse here due to error status codes
                            if (this.doNotLogOutExceptions.includes((data as IExceptionResponse).type)) {
                                return reject(this.convertToResponseException(data));
                            }
                            // Potentially logout user or handle differently
                            // For now, if it's not an exception we explicitly don't log out for,
                            // and it's an error status, we still reject with the converted exception.
                            // This part might need review based on intended logout logic.
                            return reject(this.convertToResponseException(data));
                        }

                        if (response.ok) {
                            return resolve(data as T); // data should be T here
                        } else {
                             // data should be IExceptionResponse here
                            return reject(this.convertToResponseException(data));
                        }

                    }).catch((error: unknown) => { // Catch network errors or non-JSON responses
                        // Create a generic error response or handle differently
                        const genericError: IExceptionResponse = {
                            type: EExceptionType.UNHANDLED_REJECTION,
                            message: "An unexpected error occurred. Failed to parse JSON response or network error.",
                            code: response.status,
                            errors: error instanceof Error ? { general: [error.message] } : { general: ["Unknown error"] }
                        };
                        reject(genericError);
                });
            } else {
                // Handle non-JSON responses
                response.text().then(text => {
                    const errorResponse: IExceptionResponse = {
                        type: EExceptionType.INVALID_RESPONSE_EXCEPTION,
                        message: `Expected JSON response but received ${contentType}. Response body: ${text.substring(0, 100)}...`,
                        code: response.status,
                        errors: { general: [`Server returned non-JSON response with status ${response.status}`] }
                    };
                    reject(errorResponse);
                }).catch(textError => {
                     const errorResponse: IExceptionResponse = {
                        type: EExceptionType.INVALID_RESPONSE_EXCEPTION,
                        message: `Expected JSON response but received ${contentType}. Failed to read response body.`,
                        code: response.status,
                        errors: { general: [`Server returned non-JSON response with status ${response.status}. Error reading text: ${textError.message}`] }
                    };
                    reject(errorResponse);
                })
            }
        });
    }

    private static convertToResponseException(data: unknown): IExceptionResponse {
        if (typeof data === 'object' && data !== null) {
            const potentialError = data as Partial<IExceptionResponse>;
            return {
                type: potentialError.type || EExceptionType.UNKNOWN_EXCEPTION,
                errors: potentialError.errors || { general: ["Unknown error details"] },
                code: potentialError.code || 0,
                message: potentialError.message || "An unknown error occurred.",
                debug: potentialError.debug
            };
        }
        // If data is not an object or is null, return a default error structure
        return {
            type: EExceptionType.INVALID_RESPONSE_EXCEPTION,
            message: "Received non-object error data from API.",
            code: 0, // Or some other default/error code
            errors: { general: ["Invalid error structure received from API."] }
        };
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
