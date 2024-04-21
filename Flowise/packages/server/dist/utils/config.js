"use strict";
// BEWARE: This file is an intereem solution until we have a proper config strategy
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '..', '.env'), override: true });
// default config
const loggingConfig = {
    dir: (_a = process.env.LOG_PATH) !== null && _a !== void 0 ? _a : path_1.default.join(__dirname, '..', '..', 'logs'),
    server: {
        level: (_b = process.env.LOG_LEVEL) !== null && _b !== void 0 ? _b : 'info',
        filename: 'server.log',
        errorFilename: 'server-error.log'
    },
    express: {
        level: (_c = process.env.LOG_LEVEL) !== null && _c !== void 0 ? _c : 'info',
        format: 'jsonl',
        filename: 'server-requests.log.jsonl' // should end with .jsonl
    }
};
exports.default = {
    logging: loggingConfig
};
//# sourceMappingURL=config.js.map