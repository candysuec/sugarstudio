export var ErrorType;
(function (ErrorType) {
    // General errors
    ErrorType["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    ErrorType["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorType["BAD_REQUEST"] = "BAD_REQUEST";
    ErrorType["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorType["FORBIDDEN"] = "FORBIDDEN";
    ErrorType["NOT_FOUND"] = "NOT_FOUND";
    ErrorType["CONFLICT"] = "CONFLICT";
    ErrorType["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorType["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
    // Specific application errors
    ErrorType["BRAND_NOT_FOUND"] = "BRAND_NOT_FOUND";
    ErrorType["TASK_PROCESSING_FAILED"] = "TASK_PROCESSING_FAILED";
    ErrorType["SOP_GENERATION_FAILED"] = "SOP_GENERATION_FAILED";
    ErrorType["DATABASE_ERROR"] = "DATABASE_ERROR";
    ErrorType["EXTERNAL_SERVICE_ERROR"] = "EXTERNAL_SERVICE_ERROR";
    // Add more specific error types as needed
})(ErrorType || (ErrorType = {}));
