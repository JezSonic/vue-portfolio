import { CacheService } from '@/services/cacheService'; // Adjust path as necessary

describe('CacheService', () => {
    let cacheService: CacheService;

    beforeEach(() => {
        cacheService = new CacheService();
    });

    afterEach(() => {
        vi.useRealTimers(); // Restore real timers after each test
    });

    it('should instantiate', () => {
        expect(cacheService).toBeInstanceOf(CacheService);
    });

    it('should set and get a cache entry', () => {
        const key = 'testKey';
        const data = { message: 'Hello, World!' };
        cacheService.set(key, data);
        expect(cacheService.get(key)).toEqual(data);
    });

    it('should return null for a non-existent key', () => {
        expect(cacheService.get('nonExistentKey')).toBeNull();
    });

    it('should return null for an expired entry', () => {
        vi.useFakeTimers();
        const key = 'expiredKey';
        const data = { value: 123 };
        const ttl = 1000; // 1 second
        cacheService.set(key, data, ttl);

        // Advance time by TTL + 1 millisecond
        vi.advanceTimersByTime(ttl + 1);

        expect(cacheService.get(key)).toBeNull();
        vi.useRealTimers();
    });

    it('should correctly report presence of a key with has()', () => {
        const key = 'hasKey';
        const data = 'test data';
        cacheService.set(key, data);
        expect(cacheService.has(key)).toBe(true);
    });

    it('should correctly report absence of a non-existent key with has()', () => {
        expect(cacheService.has('nonExistentKeyForHas')).toBe(false);
    });

    it('should correctly report absence of an expired key with has()', () => {
        vi.useFakeTimers();
        const key = 'expiredKeyForHas';
        const data = { value: 456 };
        const ttl = 500; // 0.5 seconds
        cacheService.set(key, data, ttl);

        vi.advanceTimersByTime(ttl + 100); // Advance time beyond TTL

        expect(cacheService.has(key)).toBe(false);
        vi.useRealTimers(); // Restore real timers
    });

    it('should not return an expired entry even if checked with has() first', () => {
        vi.useFakeTimers();
        const key = 'expiredHasThenGetKey';
        const data = { detail: "check expiration logic" };
        const ttl = 2000; // 2 seconds
        cacheService.set(key, data, ttl);

        // Entry should be valid initially
        expect(cacheService.has(key)).toBe(true);
        expect(cacheService.get(key)).toEqual(data);

        // Advance time by TTL + 1 millisecond
        vi.advanceTimersByTime(ttl + 1);

        // Now 'has' should return false and delete it
        expect(cacheService.has(key)).toBe(false);
        // Consequently, 'get' should also return null
        expect(cacheService.get(key)).toBeNull();
        vi.useRealTimers();
      });

    it('should delete a cache entry', () => {
        const key = 'deleteKey';
        const data = { item: 'to be deleted' };
        cacheService.set(key, data);
        expect(cacheService.has(key)).toBe(true);
        cacheService.delete(key);
        expect(cacheService.has(key)).toBe(false);
        expect(cacheService.get(key)).toBeNull();
    });

    it('should clear all cache entries', () => {
        cacheService.set('key1', 'data1');
        cacheService.set('key2', { value: 'data2' });
        expect(cacheService.has('key1')).toBe(true);
        expect(cacheService.has('key2')).toBe(true);
        cacheService.clear();
        expect(cacheService.has('key1')).toBe(false);
        expect(cacheService.has('key2')).toBe(false);
        expect(cacheService.get('key1')).toBeNull();
        expect(cacheService.get('key2')).toBeNull();
    });

    it('should respect different TTLs for different entries', () => {
        vi.useFakeTimers();
        const keyShort = 'shortLived';
        const dataShort = 'goes away soon';
        const ttlShort = 100; // 0.1 second

        const keyLong = 'longLived';
        const dataLong = 'stays longer';
        const ttlLong = 2000; // 2 seconds

        cacheService.set(keyShort, dataShort, ttlShort);
        cacheService.set(keyLong, dataLong, ttlLong);

        // Advance time by 150ms
        vi.advanceTimersByTime(150);

        expect(cacheService.get(keyShort)).toBeNull(); // Expired
        expect(cacheService.has(keyShort)).toBe(false);
        expect(cacheService.get(keyLong)).toEqual(dataLong); // Still valid
        expect(cacheService.has(keyLong)).toBe(true);

        // Advance time by another 1900ms (total 2050ms from start)
        vi.advanceTimersByTime(1900);
        expect(cacheService.get(keyLong)).toBeNull(); // Now expired
        expect(cacheService.has(keyLong)).toBe(false);

        vi.useRealTimers();
    });

    it('set should overwrite an existing key and update its TTL', () => {
        vi.useFakeTimers();
        const key = 'overwriteKey';
        const initialData = { version: 1 };
        const initialTtl = 1000; // 1 second
        cacheService.set(key, initialData, initialTtl);

        expect(cacheService.get(key)).toEqual(initialData);

        const newData = { version: 2 };
        const newTtl = 5000; // 5 seconds
        cacheService.set(key, newData, newTtl); // Overwrite with new data and TTL

        expect(cacheService.get(key)).toEqual(newData);

        // Advance time by initial TTL + buffer (e.g., 1200ms)
        // If TTL wasn't updated, it would be null.
        vi.advanceTimersByTime(1200);
        expect(cacheService.get(key)).toEqual(newData); // Should still be there due to new TTL

        // Advance time past new TTL (e.g., 4000ms more, total 5200ms)
        vi.advanceTimersByTime(4000);
        expect(cacheService.get(key)).toBeNull(); // Now it should be gone

        vi.useRealTimers();
    });
});
