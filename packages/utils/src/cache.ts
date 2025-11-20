// sugarstudio/apps/orchestrator/src/utils/cache.ts

interface CacheEntry<T> {
  value: T;
  expiry: number; // Unix timestamp in milliseconds
}

class Cache {
  private cache = new Map<string, CacheEntry<any>>();

  /**
   * Sets a value in the cache.
   * @param key The cache key.
   * @param value The value to store.
   * @param ttlSeconds Time-to-live in seconds. Defaults to 3600 (1 hour).
   */
  set<T>(key: string, value: T, ttlSeconds: number = 3600): void {
    const expiry = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiry });
  }

  /**
   * Retrieves a value from the cache.
   * @param key The cache key.
   * @returns The cached value if valid and found, otherwise undefined.
   */
  get<T>(key: string): T | undefined {
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
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears all entries from the cache.
   */
  clear(): void {
    this.cache.clear();
  }
}

export const geminiCache = new Cache();
