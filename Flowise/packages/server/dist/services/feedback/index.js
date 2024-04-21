"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const getChatMessageFeedback_1 = require("../../utils/getChatMessageFeedback");
const addChatMessageFeedback_1 = require("../../utils/addChatMessageFeedback");
const updateChatMessageFeedback_1 = require("../../utils/updateChatMessageFeedback");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
// Get all chatmessage feedback from chatflowid
const getAllChatMessageFeedback = async (chatflowid, chatId, sortOrder, startDate, endDate) => {
    try {
        const dbResponse = await (0, getChatMessageFeedback_1.utilGetChatMessageFeedback)(chatflowid, chatId, sortOrder, startDate, endDate);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: feedbackService.getAllChatMessageFeedback - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
// Add chatmessage feedback for chatflowid
const createChatMessageFeedbackForChatflow = async (requestBody) => {
    try {
        const dbResponse = await (0, addChatMessageFeedback_1.utilAddChatMessageFeedback)(requestBody);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: feedbackService.createChatMessageFeedbackForChatflow - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
// Add chatmessage feedback for chatflowid
const updateChatMessageFeedbackForChatflow = async (chatflowId, requestBody) => {
    try {
        const dbResponse = await (0, updateChatMessageFeedback_1.utilUpdateChatMessageFeedback)(chatflowId, requestBody);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: feedbackService.updateChatMessageFeedbackForChatflow - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getAllChatMessageFeedback,
    createChatMessageFeedbackForChatflow,
    updateChatMessageFeedbackForChatflow
};
//# sourceMappingURL=index.js.map