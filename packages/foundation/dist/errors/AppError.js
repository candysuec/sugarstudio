export class AppError extends Error {
    constructor(type, message, httpStatus = 500, isOperational = true, details) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
        this.type = type;
        this.httpStatus = httpStatus;
        this.isOperational = isOperational;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}
