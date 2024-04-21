"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
// we need eslint because we have to pass next arg for the error middleware
// eslint-disable-next-line
async function errorHandlerMiddleware(err, req, res, next) {
    let displayedError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: err.message,
        // Provide error stack trace only in development
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(displayedError.statusCode).json(displayedError);
}
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=index.js.map