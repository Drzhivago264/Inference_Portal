"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const getChatMessage_1 = require("../../utils/getChatMessage");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
// get stats for showing in chatflow
const getChatflowStats = async (chatflowid, chatTypeFilter, startDate, endDate, messageId, feedback) => {
    try {
        const chatmessages = (await (0, getChatMessage_1.utilGetChatMessage)(chatflowid, chatTypeFilter, undefined, undefined, undefined, undefined, startDate, endDate, messageId, feedback));
        const totalMessages = chatmessages.length;
        const totalFeedback = chatmessages.filter((message) => message === null || message === void 0 ? void 0 : message.feedback).length;
        const positiveFeedback = chatmessages.filter((message) => { var _a; return ((_a = message === null || message === void 0 ? void 0 : message.feedback) === null || _a === void 0 ? void 0 : _a.rating) === 'THUMBS_UP'; }).length;
        const dbResponse = {
            totalMessages,
            totalFeedback,
            positiveFeedback
        };
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: statsService.getChatflowStats - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getChatflowStats
};
//# sourceMappingURL=index.js.map