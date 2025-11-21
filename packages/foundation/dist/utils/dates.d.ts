/**
 * Formats a date into a human-readable relative time string (e.g., "3 days ago").
 * @param date The date to format. Can be a Date object or an ISO string.
 * @returns A string representing the relative time.
 */
export declare const formatRelativeTime: (date: Date | string) => string;
/**
 * Formats a date into a specific string format.
 * @param date The date to format. Can be a Date object or an ISO string.
 * @param formatStr The format string (e.g., "yyyy-MM-dd HH:mm:ss").
 * @returns A formatted date string.
 */
export declare const formatDateTime: (date: Date | string, formatStr?: string) => string;
/**
 * Checks if a given date is in the past.
 * @param date The date to check. Can be a Date object or an ISO string.
 * @returns True if the date is in the past, false otherwise.
 */
export declare const isPastDate: (date: Date | string) => boolean;
/**
 * Calculates the difference in days between two dates.
 * @param date1 The first date.
 * @param date2 The second date.
 * @returns The difference in days (absolute value).
 */
export declare const differenceInDays: (date1: Date | string, date2: Date | string) => number;
