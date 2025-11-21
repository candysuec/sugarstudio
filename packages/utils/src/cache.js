"use strict";
// sugarstudio/apps/orchestrator/src/utils/cache.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiCache = void 0;
class Cache {
    cache = new Map();
    /**
     * Sets a value in the cache.
     * @param key The cache key.
     * @param value The value to store.
     * @param ttlSeconds Time-to-live in seconds. Defaults to 3600 (1 hour).
     */
    set(key, value, ttlSeconds = 3600) {
        const expiry = Date.now() + ttlSeconds * 1000;
        this.cache.set(key, { value, expiry });
    }
    /**
     * Retrieves a value from the cache.
     * @param key The cache key.
     * @returns The cached value if valid and found, otherwise undefined.
     */
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return undefined;
        }
        if (Date.now() > entry.expiry) {
            this.cache.delete(key); // Remove expired entry
            return undefined;
        }
        return entry.value;
    }
    /**
     * Deletes a value from the cache.
     * @param key The cache key.
     */
    delete(key) {
        this.cache.delete(key);
    }
    /**
     * Clears all entries from the cache.
     */
    clear() {
        this.cache.clear();
    }
}
exports.geminiCache = new Cache();
