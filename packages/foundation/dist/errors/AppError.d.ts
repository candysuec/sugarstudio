import { ErrorType } from './errorTypes';
export declare class AppError extends Error {
    readonly type: ErrorType;
    readonly isOperational: boolean;
    readonly httpStatus: number;
    readonly details?: Record<string, any>;
    constructor(type: ErrorType, message: string, httpStatus?: number, isOperational?: boolean, details?: Record<string, any>);
}
