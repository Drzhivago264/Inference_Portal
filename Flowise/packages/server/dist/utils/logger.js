"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressRequestLogger = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const config_1 = __importDefault(require("./config")); // should be replaced by node-config or similar
const winston_1 = require("winston");
const { combine, timestamp, printf, errors } = winston_1.format;
// expect the log dir be relative to the projects root
const logDir = config_1.default.logging.dir;
// Create the log directory if it doesn't exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const logger = (0, winston_1.createLogger)({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.json(), printf(({ level, message, timestamp, stack }) => {
        const text = `${timestamp} [${level.toUpperCase()}]: ${message}`;
        return stack ? text + '\n' + stack : text;
    }), errors({ stack: true })),
    defaultMeta: {
        package: 'server'
    },
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            filename: path.join(logDir, (_a = config_1.default.logging.server.filename) !== null && _a !== void 0 ? _a : 'server.log'),
            level: (_b = config_1.default.logging.server.level) !== null && _b !== void 0 ? _b : 'info'
        }),
        new winston_1.transports.File({
            filename: path.join(logDir, (_c = config_1.default.logging.server.errorFilename) !== null && _c !== void 0 ? _c : 'server-error.log'),
            level: 'error' // Log only errors to this file
        })
    ],
    exceptionHandlers: [
        new winston_1.transports.File({
            filename: path.join(logDir, (_d = config_1.default.logging.server.errorFilename) !== null && _d !== void 0 ? _d : 'server-error.log')
        })
    ],
    rejectionHandlers: [
        new winston_1.transports.File({
            filename: path.join(logDir, (_e = config_1.default.logging.server.errorFilename) !== null && _e !== void 0 ? _e : 'server-error.log')
        })
    ]
});
/**
 * This function is used by express as a middleware.
 * @example
 *   this.app = express()
 *   this.app.use(expressRequestLogger)
 */
function expressRequestLogger(req, res, next) {
    var _a, _b;
    const unwantedLogURLs = ['/api/v1/node-icon/'];
    if (req.url.includes('/api/v1/') && !unwantedLogURLs.some((url) => req.url.includes(url))) {
        const fileLogger = (0, winston_1.createLogger)({
            format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.json(), errors({ stack: true })),
            defaultMeta: {
                package: 'server',
                request: {
                    method: req.method,
                    url: req.url,
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    headers: req.headers
                }
            },
            transports: [
                new winston_1.transports.File({
                    filename: path.join(logDir, (_a = config_1.default.logging.express.filename) !== null && _a !== void 0 ? _a : 'server-requests.log.jsonl'),
                    level: (_b = config_1.default.logging.express.level) !== null && _b !== void 0 ? _b : 'debug'
                })
            ]
        });
        const getRequestEmoji = (method) => {
            const requetsEmojis = {
                GET: '⬇️',
                POST: '⬆️',
                PUT: '🖊',
                DELETE: '❌',
                OPTION: '🔗'
            };
            return requetsEmojis[method] || '?';
        };
        if (req.method !== 'GET') {
            fileLogger.info(`${getRequestEmoji(req.method)} ${req.method} ${req.url}`);
            logger.info(`${getRequestEmoji(req.method)} ${req.method} ${req.url}`);
        }
        else {
            fileLogger.http(`${getRequestEmoji(req.method)} ${req.method} ${req.url}`);
        }
    }
    next();
}
exports.expressRequestLogger = expressRequestLogger;
exports.default = logger;
//# sourceMappingURL=logger.js.map