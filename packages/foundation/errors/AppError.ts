import { ErrorType } from './errorTypes';

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly isOperational: boolean;
  public readonly httpStatus: number;
  public readonly details?: Record<string, any>;

  constructor(
    type: ErrorType,
    message: string,
    httpStatus: number = 500,
    isOperational: boolean = true,
    details?: Record<string, any>
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain

    this.type = type;
    this.httpStatus = httpStatus;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
