import { AppError } from './AppError';
import { ErrorType } from './errorTypes';
export class ApiError extends AppError {
    constructor(type, message, httpStatus = 500, details) {
        super(type, message, httpStatus, true, details);
    }
    static badRequest(message = 'Bad Request', details) {
        return new ApiError(ErrorType.BAD_REQUEST, message, 400, details);
    }
    static unauthorized(message = 'Unauthorized', details) {
        return new ApiError(ErrorType.UNAUTHORIZED, message, 401, details);
    }
    static forbidden(message = 'Forbidden', details) {
        return new ApiError(ErrorType.FORBIDDEN, message, 403, details);
    }
    static notFound(message = 'Not Found', details) {
        return new ApiError(ErrorType.NOT_FOUND, message, 404, details);
    }
    static conflict(message = 'Conflict', details) {
        return new ApiError(ErrorType.CONFLICT, message, 409, details);
    }
    static internal(message = 'Internal Server Error', details) {
        return new ApiError(ErrorType.INTERNAL_SERVER_ERROR, message, 500, details);
    }
    static serviceUnavailable(message = 'Service Unavailable', details) {
        return new ApiError(ErrorType.SERVICE_UNAVAILABLE, message, 503, details);
    }
}
