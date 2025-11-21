/**
 * Generates a unique ID, optionally prefixed.
 * Uses UUID v4 for uniqueness.
 * @param prefix Optional prefix for the ID.
 * @returns A unique ID string.
 */
export declare const generateUniqueId: (prefix?: string) => string;
/**
 * Generates a KniSoci ID (ksid) which is a timestamp-based ID with a random suffix.
 * This is useful for sortable IDs that are also unique.
 * @param prefix Optional prefix for the ksid.
 * @returns A ksid string.
 */
export declare const generateKsid: (prefix?: string) => string;
