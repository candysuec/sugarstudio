import { formatDistanceToNow, parseISO, format as formatDateFn } from 'date-fns';

/**
 * Formats a date into a human-readable relative time string (e.g., "3 days ago").
 * @param date The date to format. Can be a Date object or an ISO string.
 * @returns A string representing the relative time.
 */
export const formatRelativeTime = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

/**
 * Formats a date into a specific string format.
 * @param date The date to format. Can be a Date object or an ISO string.
 * @param formatStr The format string (e.g., "yyyy-MM-dd HH:mm:ss").
 * @returns A formatted date string.
 */
export const formatDateTime = (date: Date | string, formatStr: string = 'yyyy-MM-dd HH:mm:ss'): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDateFn(parsedDate, formatStr);
};

/**
 * Checks if a given date is in the past.
 * @param date The date to check. Can be a Date object or an ISO string.
 * @returns True if the date is in the past, false otherwise.
 */
export const isPastDate = (date: Date | string): boolean => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return parsedDate < new Date();
};

/**
 * Calculates the difference in days between two dates.
 * @param date1 The first date.
 * @param date2 The second date.
 * @returns The difference in days (absolute value).
 */
export const differenceInDays = (date1: Date | string, date2: Date | string): number => {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
