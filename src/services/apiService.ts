import { env, getApiUrl } from "@/helpers/app.ts";
import { IExceptionResponse, EExceptionType } from "@/types/services/api.d.ts";
import { useUserStore } from "@/stores/userStore.js";
/**
 * Basic API service inherited by all other API Services
 */
export default class ApiService {
    private static isDev = env("VITE_APP_APP_ENV") == "local" || env("VITE_APP_APP_ENV") == "baremetal";
    private static logoutResponseCodes = this.isDev ? [] : [400, 401, 403];
    private static doNotLogOutExceptions = [EExceptionType.NOT_FOUND_HTTP_EXCEPTION, EExceptionType.AUTHENTICATION_EXCEPTION, EExceptionType.VALIDATION_EXCEPTION];

    // Stores ongoing requests: key -> { promise, controller }
    private static ongoingRequests: Map<string, { promise: Promise<any>; controller: AbortController }> = new Map();
    // Stores queues for similar requests: key -> array of resolve functions
    private static requestQueues: Map<string, Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }>> = new Map();

    private static generateRequestKey(url: string, method: string, params: any = null): string {
        let key = `${method.toUpperCase()}:${url}`;
        if (params && (method.toUpperCase() !== "GET" && method.toUpperCase() !== "HEAD")) {
            try {
                key += `:${JSON.stringify(params)}`;
            } catch (error) {
                console.warn("Could not stringify params for request key:", error);
                // Fallback if params cannot be stringified, though this might lead to less effective deduplication/queuing.
                key += ":[non-serializable_params]";
            }
        }
        return key;
    }

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

    private static async fetching<T, D>(url: string, params: D | null = null, method: string = "GET", extraHeaders: HeadersInit = {}, prefix: boolean = true, credentialsMode: RequestCredentials | null = null, removeDefaultHeaders: boolean = false): Promise<T> {
        const requestKey = this.generateRequestKey(url, method, params);

        if (this.ongoingRequests.has(requestKey)) {
            // Request deduplication for GET or queueing for others
            if (method.toUpperCase() === "GET" || method.toUpperCase() === "HEAD") {
                // console.log(`Deduplicating request: ${requestKey}`);
                return this.ongoingRequests.get(requestKey)!.promise as Promise<T>;
            } else {
                // console.log(`Queueing request: ${requestKey}`);
                return new Promise<T>((resolve, reject) => {
                    if (!this.requestQueues.has(requestKey)) {
                        this.requestQueues.set(requestKey, []);
                    }
                    this.requestQueues.get(requestKey)!.push({ resolve: resolve as (value: any) => void, reject });
                });
            }
        }

        const controller = new AbortController();
        const signal = controller.signal;
        const currentRequestPromise = new Promise<T>(async (resolve, reject) => {
            const defaultHeaders: HeadersInit = removeDefaultHeaders ? {} : { "Content-Type": "application/json" };
            const target = prefix ? getApiUrl() + url : url;
            const options: RequestInit = {
                method: method.toUpperCase(),
                headers: { ...defaultHeaders, ...extraHeaders },
                body: params ? JSON.stringify(params) : null,
                credentials: credentialsMode || "include",
                signal: signal, // Pass the abort signal to fetch
            };

            try {
                const response = await fetch(target, options);
                const contentType = response.headers.get("Content-Type");

                if (signal.aborted) {
                    // If the request was aborted before fetch completed, reject the promise.
                    // Note: fetch itself might have already thrown an AbortError.
                    // console.log(`Request aborted (during fetch): ${requestKey}`);
                    return reject(new DOMException("Request aborted by user.", "AbortError"));
                }

                if (contentType && contentType.indexOf("application/json") !== -1) {
                    response.json()
                        .then((data: T | IExceptionResponse) => {
                            if (this.logoutResponseCodes.includes(response.status)) {
                                if (this.doNotLogOutExceptions.includes((data as IExceptionResponse).type)) {
                                    return reject(this.convertToResponseException(data));
                                }
                                return reject(this.convertToResponseException(data));
                            }

                            if (response.ok) {
                                resolve(data as T);
                            } else {
                                reject(this.convertToResponseException(data));
                            }
                        }).catch((error: unknown) => {
                            if (signal.aborted) {
                                // console.log(`Request aborted (json parsing): ${requestKey}`);
                                return reject(new DOMException("Request aborted by user.", "AbortError"));
                            }
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
                        if (signal.aborted) {
                             // console.log(`Request aborted (text parsing): ${requestKey}`);
                            return reject(new DOMException("Request aborted by user.", "AbortError"));
                        }
                        const errorResponse: IExceptionResponse = {
                            type: EExceptionType.INVALID_RESPONSE_EXCEPTION,
                            message: `Expected JSON response but received ${contentType}. Response body: ${text.substring(0, 100)}...`,
                            code: response.status,
                            errors: { general: [`Server returned non-JSON response with status ${response.status}`] }
                        };
                        reject(errorResponse);
                    }).catch(textError => {
                        if (signal.aborted) {
                            // console.log(`Request aborted (text error): ${requestKey}`);
                            return reject(new DOMException("Request aborted by user.", "AbortError"));
                        }
                         const errorResponse: IExceptionResponse = {
                            type: EExceptionType.INVALID_RESPONSE_EXCEPTION,
                            message: `Expected JSON response but received ${contentType}. Failed to read response body.`,
                            code: response.status,
                            errors: { general: [`Server returned non-JSON response with status ${response.status}. Error reading text: ${textError instanceof Error ? textError.message : String(textError)}`] }
                        };
                        reject(errorResponse);
                    });
                }
            } catch (error: any) {
                 if (error.name === 'AbortError') {
                    // console.log(`Request aborted (catch block): ${requestKey}`);
                    reject(error); // Propagate AbortError
                } else {
                    // console.error(`Network or other error for ${requestKey}:`, error);
                    const networkError: IExceptionResponse = {
                        type: EExceptionType.NETWORK_EXCEPTION,
                        message: error.message || "A network error occurred.",
                        code: 0, // No HTTP status code for network errors typically
                        errors: { general: [error.message || "Network error"] }
                    };
                    reject(networkError);
                }
            } finally {
                // console.log(`Finalizing request: ${requestKey}`);
                this.ongoingRequests.delete(requestKey);
                this.processNextInQueue(requestKey, url, params, method, extraHeaders, prefix, credentialsMode, removeDefaultHeaders);
            }
        });

        this.ongoingRequests.set(requestKey, { promise: currentRequestPromise, controller });
        return currentRequestPromise;
    }

    private static processNextInQueue<D>(requestKey: string, url: string, params: D | null, method: string, extraHeaders: HeadersInit, prefix: boolean, credentialsMode: RequestCredentials | null, removeDefaultHeaders: boolean) {
        const queue = this.requestQueues.get(requestKey);
        if (queue && queue.length > 0) {
            const nextRequest = queue.shift();
            if (nextRequest) {
                // console.log(`Processing next in queue for ${requestKey}`);
                // It's important to call fetching again so it sets up a new AbortController and promise in ongoingRequests
                this.fetching(url, params, method, extraHeaders, prefix, credentialsMode, removeDefaultHeaders)
                    .then(nextRequest.resolve)
                    .catch(nextRequest.reject);
            }
            if (queue.length === 0) {
                this.requestQueues.delete(requestKey);
            }
        }
    }


    public static cancelRequest(url: string, method: string, params: any = null): boolean {
        const requestKey = this.generateRequestKey(url, method, params);
        const requestData = this.ongoingRequests.get(requestKey);

        if (requestData) {
            // console.log(`Cancelling request: ${requestKey}`);
            requestData.controller.abort(); // Abort the fetch request
            this.ongoingRequests.delete(requestKey); // Remove from ongoing requests

            // Reject all queued promises for this key
            const queue = this.requestQueues.get(requestKey);
            if (queue) {
                // console.log(`Rejecting ${queue.length} queued requests for ${requestKey}`);
                queue.forEach(req => req.reject(new DOMException("Request cancelled by user.", "AbortError")));
                this.requestQueues.delete(requestKey);
            }
            return true;
        }
        // console.log(`No active request to cancel for: ${requestKey}`);
        return false;
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
