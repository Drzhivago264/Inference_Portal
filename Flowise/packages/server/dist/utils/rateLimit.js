"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRateLimiter = exports.createRateLimiter = exports.getRateLimiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const async_mutex_1 = require("async-mutex");
let rateLimiters = {};
const rateLimiterMutex = new async_mutex_1.Mutex();
async function addRateLimiter(id, duration, limit, message) {
    const release = await rateLimiterMutex.acquire();
    try {
        rateLimiters[id] = (0, express_rate_limit_1.rateLimit)({
            windowMs: duration * 1000,
            max: limit,
            handler: (_, res) => {
                res.status(429).send(message);
            }
        });
    }
    finally {
        release();
    }
}
function getRateLimiter(req, res, next) {
    const id = req.params.id;
    if (!rateLimiters[id])
        return next();
    const idRateLimiter = rateLimiters[id];
    return idRateLimiter(req, res, next);
}
exports.getRateLimiter = getRateLimiter;
async function createRateLimiter(chatFlow) {
    if (!chatFlow.apiConfig)
        return;
    const apiConfig = JSON.parse(chatFlow.apiConfig);
    const rateLimit = apiConfig.rateLimit;
    if (!rateLimit)
        return;
    const { limitDuration, limitMax, limitMsg } = rateLimit;
    if (limitMax && limitDuration && limitMsg)
        await addRateLimiter(chatFlow.id, limitDuration, limitMax, limitMsg);
}
exports.createRateLimiter = createRateLimiter;
async function initializeRateLimiter(chatFlowPool) {
    await Promise.all(chatFlowPool.map(async (chatFlow) => {
        await createRateLimiter(chatFlow);
    }));
}
exports.initializeRateLimiter = initializeRateLimiter;
//# sourceMappingURL=rateLimit.js.map