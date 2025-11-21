import { AppError } from './AppError';
import { ErrorType } from './errorTypes';
export declare class ApiError extends AppError {
    constructor(type: ErrorType, message: string, httpStatus?: number, details?: Record<string, any>);
    static badRequest(message?: string, details?: Record<string, any>): ApiError;
    static unauthorized(message?: string, details?: Record<string, any>): ApiError;
    static forbidden(message?: string, details?: Record<string, any>): ApiError;
    static notFound(message?: string, details?: Record<string, any>): ApiError;
    static conflict(message?: string, details?: Record<string, any>): ApiError;
    static internal(message?: string, details?: Record<string, any>): ApiError;
    static serviceUnavailable(message?: string, details?: Record<string, any>): ApiError;
}
