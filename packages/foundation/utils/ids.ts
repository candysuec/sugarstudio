import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique ID, optionally prefixed.
 * Uses UUID v4 for uniqueness.
 * @param prefix Optional prefix for the ID.
 * @returns A unique ID string.
 */
export const generateUniqueId = (prefix: string = ''): string => {
  return `${prefix}${uuidv4()}`;
};

/**
 * Generates a KniSoci ID (ksid) which is a timestamp-based ID with a random suffix.
 * This is useful for sortable IDs that are also unique.
 * @param prefix Optional prefix for the ksid.
 * @returns A ksid string.
 */
export const generateKsid = (prefix: string = ''): string => {
  const timestamp = Date.now().toString(36); // Base36 timestamp
  const randomSuffix = Math.random().toString(36).substring(2, 9); // Random alphanumeric string
  return `${prefix}${timestamp}-${randomSuffix}`;
};
