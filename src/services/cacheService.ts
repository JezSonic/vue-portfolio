interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number; // Time To Live in milliseconds
}

/**
 * Provides a simple in-memory caching mechanism with Time-To-Live (TTL) support.
 */
export class CacheService {
    private cache: Map<string, CacheEntry<unknown>> = new Map();

    constructor() {}

    /**
     * Retrieves an entry from the cache.
     * Returns null if the entry does not exist or has passed its TTL.
     * Expired entries are automatically removed from the cache upon access attempt.
     * @template T The expected type of the cached data.
     * @param {string} key The cache key.
     * @returns {T | null} The cached data, or null if not found or expired.
     */
    get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }

        const now = Date.now();
        if (now - entry.timestamp > entry.ttl) {
            this.cache.delete(key); // Entry expired
            return null;
        }

        return entry.data as T;
    }

    /**
     * Adds or updates an entry in the cache with a specific Time-To-Live (TTL).
     * If an entry with the same key already exists, it will be overwritten.
     * @template T The type of data to be cached.
     * @param {string} key The cache key.
     * @param {T} data The data to cache.
     * @param {number} [ttl=3600000] Time To Live in milliseconds. Defaults to 1 hour.
     */
    set<T>(key: string, data: T, ttl: number = 3600000): void { // Default TTL: 1 hour
        const timestamp = Date.now();
        this.cache.set(key, { data, timestamp, ttl });
    }

    /**
     * Deletes an entry from the cache.
     * If the key does not exist, this operation has no effect.
     * @param {string} key The cache key to delete.
     */
    delete(key: string): void {
        this.cache.delete(key);
    }

    /**
     * Checks if a valid (non-expired) entry exists in the cache.
     * Expired entries are automatically removed if found during this check.
     * @param {string} key The cache key to check.
     * @returns {boolean} True if a valid entry exists, false otherwise.
     */
    has(key: string): boolean {
        const entry = this.cache.get(key);
        if (!entry) {
            return false;
        }

        const now = Date.now();
        if (now - entry.timestamp > entry.ttl) {
            this.cache.delete(key); // Entry expired
            return false;
        }

        return true;
    }

    /**
     * Clears the entire cache, removing all entries.
     */
    clear(): void {
        this.cache.clear();
    }
}

/**
 * Singleton instance of the CacheService.
 * @exports cacheService
 */
export const cacheService = new CacheService();
