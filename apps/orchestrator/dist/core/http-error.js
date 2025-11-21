"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
// src/core/http-error.ts
class HttpError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.HttpError = HttpError;
