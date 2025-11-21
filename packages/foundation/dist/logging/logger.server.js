import winston from 'winston';
import { format } from './format';
import { env } from '../config/env';
const transports = [
    new winston.transports.Console({
        level: env.LOCAL_LOG_LEVEL,
        format: winston.format.combine(winston.format.colorize(), format),
    }),
    // Add other server-side transports like file, daily rotate file, or external logging services
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
];
export const serverLogger = winston.createLogger({
    level: env.LOCAL_LOG_LEVEL,
    levels: winston.config.npm.levels,
    format: format,
    transports,
    exitOnError: false, // Do not exit on handled exceptions
});
// Example usage:
// serverLogger.info('This is an info message from the server.');
// serverLogger.error('This is an error message from the server.', new Error('Test error'));
