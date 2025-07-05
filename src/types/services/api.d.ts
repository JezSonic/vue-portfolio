export enum EExceptionType {
    /**
     * Thrown when body payload is incorrectly formatted.
     */
    VALIDATION_EXCEPTION = 'validation_exception',
    /**
     * Thrown when bad authentication credentials were provided.
     */
    AUTHENTICATION_EXCEPTION = 'authentication_exception',
    /**
     * Thrown when the user has not enough privileges to request the endpoint.
     */
    AUTHORIZATION_EXCEPTION = 'authorization_exception',
    /**
     * Thrown when a user account exists but is only connected to OAuth login providers and has no password set up
     */
    OAUTH_NO_PASSWORD = 'oauth_no_password',
    /**
     * Thrown when the requested endpoint was not found
     */
    NOT_FOUND_HTTP_EXCEPTION = 'not_found_http_exception',
    /**
     * Thrown when the session access token is invalid
     */
    ACCESS_TOKEN_EXCEPTION = 'invalid_token',
    /**
     * Thrown when the session access token is invalid
     */
    REFRESH_TOKEN_EXCEPTION = 'invalid_refresh_token',
    /**
     * Generic code exception
     */
    GENERIC_EXCEPTION = 'generic_exception',
}

/**
 * Interface representing the structure of an API exception response.
 */
export interface IExceptionResponse {
    type: EExceptionType;
    errors: {
        [key: string]: string[]
    };
    message: string;
    debug: {
        code: number,
        file: string,
        line: number,
        message: string;
        type: EExceptionType;
    }
    code: number
}

/**
 * Interface representing a basic API response with a content field.
 */
export interface IApiResponse<T> {
    content: T;
}

/**
 * Interface representing an API response with authentication tokens.
 */
export interface IApiAuthResponse {
    id: number;
    access_token: string;
    refresh_token: string;
}

/**
 * Interface representing an API response with a status field.
 */
export interface IApiStatusResponse<T, S> {
    status: S;
    valid_until?: number;
}

/**
 * Interface representing an empty request body.
 * Used for API endpoints that don't require any parameters.
 */
export interface IEmptyRequestBody {}

export interface IPaginatedResponse<T> {
    data: T[],
    total: number,
    current_page: number,
    per_page: number,
    total_pages: number
}