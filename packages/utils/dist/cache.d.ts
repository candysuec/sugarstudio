declare class Cache {
    private cache;
    /**
     * Sets a value in the cache.
     * @param key The cache key.
     * @param value The value to store.
     * @param ttlSeconds Time-to-live in seconds. Defaults to 3600 (1 hour).
     */
    set<T>(key: string, value: T, ttlSeconds?: number): void;
    /**
     * Retrieves a value from the cache.
     * @param key The cache key.
     * @returns The cached value if valid and found, otherwise undefined.
     */
    get<T>(key: string): T | undefined;
    /**
     * Deletes a value from the cache.
     * @param key The cache key.
     */
    delete(key: string): void;
    /**
     * Clears all entries from the cache.
     */
    clear(): void;
}
export declare const geminiCache: Cache;
export {};
//# sourceMappingURL=cache.d.ts.map