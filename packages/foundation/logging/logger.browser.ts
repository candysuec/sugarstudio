// Simple browser-side logger
// In a real application, you might integrate with a client-side logging service
export const browserLogger = {
  info: (...args: any[]) => console.info('[INFO]', ...args),
  warn: (...args: any[]) => console.warn('[WARN]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args),
  debug: (...args: any[]) => console.debug('[DEBUG]', ...args),
};

// Example usage:
// browserLogger.info('This is an info message from the browser.');
// browserLogger.error('This is an error message from the browser.', new Error('Test error'));
