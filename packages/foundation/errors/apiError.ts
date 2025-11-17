import { AppError } from './AppError';
import { ErrorType } from './errorTypes';

export class ApiError extends AppError {
  constructor(
    type: ErrorType,
    message: string,
    httpStatus: number = 500,
    details?: Record<string, any>
  ) {
    super(type, message, httpStatus, true, details);
  }

  static badRequest(message: string = 'Bad Request', details?: Record<string, any>) {
    return new ApiError(ErrorType.BAD_REQUEST, message, 400, details);
  }

  static unauthorized(message: string = 'Unauthorized', details?: Record<string, any>) {
    return new ApiError(ErrorType.UNAUTHORIZED, message, 401, details);
  }

  static forbidden(message: string = 'Forbidden', details?: Record<string, any>) {
    return new ApiError(ErrorType.FORBIDDEN, message, 403, details);
  }

  static notFound(message: string = 'Not Found', details?: Record<string, any>) {
    return new ApiError(ErrorType.NOT_FOUND, message, 404, details);
  }

  static conflict(message: string = 'Conflict', details?: Record<string, any>) {
    return new ApiError(ErrorType.CONFLICT, message, 409, details);
  }

  static internal(message: string = 'Internal Server Error', details?: Record<string, any>) {
    return new ApiError(ErrorType.INTERNAL_SERVER_ERROR, message, 500, details);
  }

  static serviceUnavailable(message: string = 'Service Unavailable', details?: Record<string, any>) {
    return new ApiError(ErrorType.SERVICE_UNAVAILABLE, message, 503, details);
  }
}
