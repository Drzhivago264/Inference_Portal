"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedIframeOrigins = exports.getCorsOptions = exports.getAllowedCorsOrigins = exports.sanitizeMiddleware = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
function sanitizeMiddleware(req, res, next) {
    // decoding is necessary as the url is encoded by the browser
    const decodedURI = decodeURI(req.url);
    req.url = (0, sanitize_html_1.default)(decodedURI);
    for (let p in req.query) {
        if (Array.isArray(req.query[p])) {
            const sanitizedQ = [];
            for (const q of req.query[p]) {
                sanitizedQ.push((0, sanitize_html_1.default)(q));
            }
            req.query[p] = sanitizedQ;
        }
        else {
            req.query[p] = (0, sanitize_html_1.default)(req.query[p]);
        }
    }
    next();
}
exports.sanitizeMiddleware = sanitizeMiddleware;
function getAllowedCorsOrigins() {
    var _a;
    // Expects FQDN separated by commas, otherwise nothing or * for all.
    return (_a = process.env.CORS_ORIGINS) !== null && _a !== void 0 ? _a : '*';
}
exports.getAllowedCorsOrigins = getAllowedCorsOrigins;
function getCorsOptions() {
    const corsOptions = {
        origin: function (origin, callback) {
            const allowedOrigins = getAllowedCorsOrigins();
            if (!origin || allowedOrigins == '*' || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(null, false);
            }
        }
    };
    return corsOptions;
}
exports.getCorsOptions = getCorsOptions;
function getAllowedIframeOrigins() {
    var _a;
    // Expects FQDN separated by commas, otherwise nothing or * for all.
    // Also CSP allowed values: self or none
    return (_a = process.env.IFRAME_ORIGINS) !== null && _a !== void 0 ? _a : '*';
}
exports.getAllowedIframeOrigins = getAllowedIframeOrigins;
//# sourceMappingURL=XSS.js.map