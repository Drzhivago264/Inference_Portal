"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vectors_1 = __importDefault(require("../../services/vectors"));
const rateLimit_1 = require("../../utils/rateLimit");
const getRateLimiterMiddleware = async (req, res, next) => {
    try {
        return (0, rateLimit_1.getRateLimiter)(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
const upsertVectorMiddleware = async (req, res, next) => {
    try {
        const apiResponse = await vectors_1.default.upsertVectorMiddleware(req);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const createInternalUpsert = async (req, res, next) => {
    try {
        const isInternal = true;
        const apiResponse = await vectors_1.default.upsertVectorMiddleware(req, isInternal);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    upsertVectorMiddleware,
    createInternalUpsert,
    getRateLimiterMiddleware
};
//# sourceMappingURL=index.js.map