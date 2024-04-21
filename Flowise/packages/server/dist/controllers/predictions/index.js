"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rateLimit_1 = require("../../utils/rateLimit");
const chatflows_1 = __importDefault(require("../../services/chatflows"));
const logger_1 = __importDefault(require("../../utils/logger"));
const predictions_1 = __importDefault(require("../../services/predictions"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
// Send input message and get prediction result (External)
const createPrediction = async (req, res, next) => {
    var _a;
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: predictionsController.createPrediction - id not provided!`);
        }
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: predictionsController.createPrediction - body not provided!`);
        }
        const chatflow = await chatflows_1.default.getChatflowById(req.params.id);
        if (!chatflow) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${req.params.id} not found`);
        }
        let isDomainAllowed = true;
        logger_1.default.info(`[server]: Request originated from ${req.headers.origin}`);
        if (chatflow.chatbotConfig) {
            const parsedConfig = JSON.parse(chatflow.chatbotConfig);
            // check whether the first one is not empty. if it is empty that means the user set a value and then removed it.
            const isValidAllowedOrigins = ((_a = parsedConfig.allowedOrigins) === null || _a === void 0 ? void 0 : _a.length) && parsedConfig.allowedOrigins[0] !== '';
            if (isValidAllowedOrigins) {
                const originHeader = req.headers.origin;
                const origin = new URL(originHeader).host;
                isDomainAllowed =
                    parsedConfig.allowedOrigins.filter((domain) => {
                        try {
                            const allowedOrigin = new URL(domain).host;
                            return origin === allowedOrigin;
                        }
                        catch (e) {
                            return false;
                        }
                    }).length > 0;
            }
        }
        if (isDomainAllowed) {
            //@ts-ignore
            const apiResponse = await predictions_1.default.buildChatflow(req, req === null || req === void 0 ? void 0 : req.io);
            return res.json(apiResponse);
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `This site is not allowed to access this chatbot`);
        }
    }
    catch (error) {
        next(error);
    }
};
const getRateLimiterMiddleware = async (req, res, next) => {
    try {
        return (0, rateLimit_1.getRateLimiter)(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createPrediction,
    getRateLimiterMiddleware
};
//# sourceMappingURL=index.js.map