"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_1 = __importDefault(require("../../services/feedback"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const getAllChatMessageFeedback = async (req, res, next) => {
    var _a, _b, _c, _d;
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: feedbackController.getAllChatMessageFeedback - id not provided!`);
        }
        const chatflowid = req.params.id;
        const chatId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.chatId;
        const sortOrder = (_b = req.query) === null || _b === void 0 ? void 0 : _b.order;
        const startDate = (_c = req.query) === null || _c === void 0 ? void 0 : _c.startDate;
        const endDate = (_d = req.query) === null || _d === void 0 ? void 0 : _d.endDate;
        const apiResponse = await feedback_1.default.getAllChatMessageFeedback(chatflowid, chatId, sortOrder, startDate, endDate);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const createChatMessageFeedbackForChatflow = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: feedbackController.createChatMessageFeedbackForChatflow - body not provided!`);
        }
        const apiResponse = await feedback_1.default.createChatMessageFeedbackForChatflow(req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const updateChatMessageFeedbackForChatflow = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: feedbackController.updateChatMessageFeedbackForChatflow - body not provided!`);
        }
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: feedbackController.updateChatMessageFeedbackForChatflow - id not provided!`);
        }
        const apiResponse = await feedback_1.default.updateChatMessageFeedbackForChatflow(req.params.id, req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAllChatMessageFeedback,
    createChatMessageFeedbackForChatflow,
    updateChatMessageFeedbackForChatflow
};
//# sourceMappingURL=index.js.map