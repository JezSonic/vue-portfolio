export enum ExceptionType {
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
    AUTHORIZATION_EXCEPTION = 'authentication_exception',
    /**
     * Thrown when requested endpoint was not found
     */
    NOT_FOUND_HTTP_EXCEPTION = 'not_found_http_exception',
    /**
     * Thrown when session token is expired
     */
    EXPIRED_EXCEPTION = 'expired_exception',
    /**
     * Generic code exception
     */
    GENERIC_EXCEPTION = 'generic_exception',
}

export interface ExceptionResponse {
    type: string;
    errors: {
        [key: string]: string[]
    }
}