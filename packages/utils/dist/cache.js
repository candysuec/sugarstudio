"use strict";
// sugarstudio/apps/orchestrator/src/utils/cache.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiCache = void 0;
var Cache = /** @class */ (function () {
    function Cache() {
        this.cache = new Map();
    }
    /**
     * Sets a value in the cache.
     * @param key The cache key.
     * @param value The value to store.
     * @param ttlSeconds Time-to-live in seconds. Defaults to 3600 (1 hour).
     */
    Cache.prototype.set = function (key, value, ttlSeconds) {
        if (ttlSeconds === void 0) { ttlSeconds = 3600; }
        var expiry = Date.now() + ttlSeconds * 1000;
        this.cache.set(key, { value: value, expiry: expiry });
    };
    /**
     * Retrieves a value from the cache.
     * @param key The cache key.
     * @returns The cached value if valid and found, otherwise undefined.
     */
    Cache.prototype.get = function (key) {
        var entry = this.cache.get(key);
        if (!entry) {
            return undefined;
        }
        if (Date.now() > entry.expiry) {
            this.cache.delete(key); // Remove expired entry
            return undefined;
        }
        return entry.value;
    };
    /**
     * Deletes a value from the cache.
     * @param key The cache key.
     */
    Cache.prototype.delete = function (key) {
        this.cache.delete(key);
    };
    /**
     * Clears all entries from the cache.
     */
    Cache.prototype.clear = function () {
        this.cache.clear();
    };
    return Cache;
}());
exports.geminiCache = new Cache();
