import ApiService from '@/services/apiService';
import { cacheService, CacheService } from '@/services/cacheService';
import { getApiUrl } from '@/helpers/app';

// Mock a global fetch
global.fetch = vi.fn();

// Mock getApiUrl
vi.mock('@/helpers/app', () => ({
    getApiUrl: vi.fn(() => 'https://api.example.com/'),
    env: vi.fn((key) => {
        if (key === 'VITE_APP_APP_ENV') return 'test'; // Or 'local' to enable dev logs
        return '';
    }),
}));

// Spy on cacheService methods
vi.spyOn(cacheService, 'get');
vi.spyOn(cacheService, 'set');
vi.spyOn(cacheService, 'delete');
vi.spyOn(cacheService, 'clear');


describe('ApiService Caching', () => {
    const mockSuccessResponse = (data: unknown) => ({
        ok: true,
        json: () => Promise.resolve(data),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const mockErrorResponse = (data: unknown, status: number) => ({
        ok: false,
        status,
        json: () => Promise.resolve(data),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    beforeEach(() => {
        vi.clearAllMocks(); // Clears mock calls, but not their implementations
        cacheService.clear(); // Ensure cache is clean before each test
        (fetch as vi.Mock).mockReset(); // Reset fetch mocks
    });

    it('should fetch data from API if not in cache and store it', async () => {
        const url = 'test/data';
        const mockData = { message: 'success' };
        (fetch as vi.Mock).mockResolvedValue(mockSuccessResponse(mockData));

        const result = await ApiService.get(url);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/test/data', expect.anything());
        expect(result).toEqual(mockData);
        const cacheKey = `GET:${getApiUrl()}${url}`;
        expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
        expect(cacheService.set).toHaveBeenCalledWith(cacheKey, mockData, 3600000); // Default TTL
    });

    it('should return data from cache if available and not expired', async () => {
        const url = 'cached/data';
        const cachedData = { message: 'from cache' };
        const cacheKey = `GET:${getApiUrl()}${url}`;
        cacheService.set(cacheKey, cachedData, 3600000); // Pre-populate cache

        // Reset call count for `set` from pre-population
        (cacheService.set as vi.Mock).mockClear();

        const result = await ApiService.get(url);

        expect(fetch).not.toHaveBeenCalled();
        expect(result).toEqual(cachedData);
        expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
        expect(cacheService.set).not.toHaveBeenCalled(); // Should not set again if fetched from cache
    });

    it('should fetch from API if cache is skipped and store it if not skipped', async () => {
        const url = 'skip/cache';
        const mockData = { message: 'fetched bypassing read cache' };
        (fetch as vi.Mock).mockResolvedValue(mockSuccessResponse(mockData));
        const cacheKey = `GET:${getApiUrl()}${url}`;

        // First, ensure it's not in cache
        expect(cacheService.get(cacheKey)).toBeNull();

        const result = await ApiService.get(url, {}, true, true); // skipCache = true

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockData);
        expect(cacheService.get).toHaveBeenCalledWith(cacheKey); // get is still called to check
        expect(cacheService.set).not.toHaveBeenCalled(); // Should not store if skipCache is true

        // Try again, skipCache = false (default)
        (fetch as vi.Mock).mockClear(); // Clear fetch mock for the next call
         await ApiService.get(url, {}, true, false); // skipCache = false
         expect(fetch).toHaveBeenCalledTimes(1); // Fetched again because it wasn't stored
         expect(cacheService.set).toHaveBeenCalledWith(cacheKey, mockData, 3600000);
    });

    it('should fetch from API if cache is skipped (even if data exists) and not store it', async () => {
        const url = 'skip/existing/cache';
        const initialData = {message: "I'm in cache"};
        const fetchedData = { message: 'fetched bypassing read cache' };
        const cacheKey = `GET:${getApiUrl()}${url}`;

        cacheService.set(cacheKey, initialData, 3600000); // Pre-populate cache
        (fetch as vi.Mock).mockResolvedValue(mockSuccessResponse(fetchedData));
        (cacheService.set as vi.Mock).mockClear(); // clear previous set call

        const result = await ApiService.get(url, {}, true, true); // skipCache = true

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual(fetchedData); // Should be the newly fetched data
        expect(cacheService.get).not.toHaveBeenCalled(); // Should NOT have been called if skipCache is true
        expect(cacheService.set).not.toHaveBeenCalled(); // Should not store if skipCache is true

        // Verify cache still holds the original data
        expect(cacheService.get(cacheKey)).toEqual(initialData);
    });


    it('should use custom TTL when provided', async () => {
        const url = 'custom/ttl';
        const mockData = { message: 'custom ttl data' };
        const customTTL = 5000; // 5 seconds
        (fetch as vi.Mock).mockResolvedValue(mockSuccessResponse(mockData));
        const cacheKey = `GET:${getApiUrl()}${url}`;

        await ApiService.get(url, {}, true, false, customTTL);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(cacheService.set).toHaveBeenCalledWith(cacheKey, mockData, customTTL);
    });

    it('should fetch from API if cached data is expired', async () => {
        vi.useFakeTimers();
        const url = 'expired/data';
        const cachedData = { message: 'expired cache data' };
        const freshData = { message: 'fresh data from API' };
        const ttl = 1000; // 1 second
        const cacheKey = `GET:${getApiUrl()}${url}`;

        cacheService.set(cacheKey, cachedData, ttl);
        (cacheService.set as vi.Mock).mockClear(); // Clear set from initial caching

        (fetch as vi.Mock).mockResolvedValue(mockSuccessResponse(freshData));

        // Advance time beyond TTL
        vi.advanceTimersByTime(ttl + 100);

        const result = await ApiService.get(url);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual(freshData);
        expect(cacheService.get).toHaveBeenCalledWith(cacheKey); // Called, but returned null
        expect(cacheService.set).toHaveBeenCalledWith(cacheKey, freshData, 3600000); // Stored fresh data
        vi.useRealTimers();
    });

    it('should invalidate a specific cache entry', async () => {
        const url = 'invalidate/me';
        const mockData = { id: 1, content: 'some data' };
        const cacheKey = `GET:${getApiUrl()}${url}`;

        // Populate cache
        cacheService.set(cacheKey, mockData, 3600000);
        expect(cacheService.get(cacheKey)).toEqual(mockData);

        ApiService.invalidateCache(url);

        expect(cacheService.delete).toHaveBeenCalledWith(cacheKey);
        expect(cacheService.get(cacheKey)).toBeNull(); // Should be gone from actual cache
    });

    it('invalidateCache should handle non-prefixed URLs if specified', () => {
        const url = 'https://some.external.api/data';
        const mockData = { value: "external data" };
        const cacheKey = `GET:${url}`; // No api.example.com prefix

        cacheService.set(cacheKey, mockData, 3600000);
        expect(cacheService.get(cacheKey)).toEqual(mockData);

        ApiService.invalidateCache(url, false); // prefix = false

        expect(cacheService.delete).toHaveBeenCalledWith(cacheKey);
        expect(cacheService.get(cacheKey)).toBeNull();
    });

    it('clearApiCache should remove all GET request entries from cache', () => {
        // Add some GET entries
        cacheService.set(`GET:${getApiUrl()}data1`, { item: 1 });
        cacheService.set(`GET:${getApiUrl()}data2`, { item: 2 });
        cacheService.set(`GET:https://other.com/data3`, { item: 3 }); // Non-prefixed GET
        // Add a non-GET entry (though ApiService wouldn't create this, CacheService allows it)
        cacheService.set('POST:/some/other/key', { item: 'not a get' });

        expect(cacheService.has(`GET:${getApiUrl()}data1`)).toBe(true);
        expect(cacheService.has(`POST:/some/other/key`)).toBe(true);

        ApiService.clearApiCache();

        // Check that all relevant keys were attempted to be deleted
        // The exact calls depend on the internal implementation of clearApiCache (iteration order)
        // So we check if delete was called for each key that should be deleted.
        expect(cacheService.delete).toHaveBeenCalledWith(`GET:${getApiUrl()}data1`);
        expect(cacheService.delete).toHaveBeenCalledWith(`GET:${getApiUrl()}data2`);
        expect(cacheService.delete).toHaveBeenCalledWith(`GET:https://other.com/data3`);

        // Verify they are actually gone
        expect(cacheService.get(`GET:${getApiUrl()}data1`)).toBeNull();
        expect(cacheService.get(`GET:${getApiUrl()}data2`)).toBeNull();
        expect(cacheService.get(`GET:https://other.com/data3`)).toBeNull();

        // Verify the non-GET entry is still there
        expect(cacheService.get('POST:/some/other/key')).toEqual({ item: 'not a get' });
    });

    it('should not cache failed API responses', async () => {
        const url = 'failing/request';
        const errorResponse = { type: "ERROR", message: 'Failed to fetch' };
        (fetch as vi.Mock).mockResolvedValue(mockErrorResponse(errorResponse, 500));
        const cacheKey = `GET:${getApiUrl()}${url}`;

        await expect(ApiService.get(url)).rejects.toBeDefined();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
        expect(cacheService.set).not.toHaveBeenCalled(); // Should not cache on error
    });
});
