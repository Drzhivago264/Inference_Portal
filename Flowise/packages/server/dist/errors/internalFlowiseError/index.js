"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalFlowiseError = void 0;
class InternalFlowiseError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        // capture the stack trace of the error from anywhere in the application
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.InternalFlowiseError = InternalFlowiseError;
//# sourceMappingURL=index.js.map