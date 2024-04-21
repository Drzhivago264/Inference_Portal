"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const http_status_codes_1 = require("http-status-codes");
const getChatMessage_1 = require("../../utils/getChatMessage");
const addChatMesage_1 = require("../../utils/addChatMesage");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const ChatMessageFeedback_1 = require("../../database/entities/ChatMessageFeedback");
const flowise_components_1 = require("flowise-components");
const utils_1 = require("../../utils");
const logger_1 = __importDefault(require("../../utils/logger"));
const ChatMessage_1 = require("../../database/entities/ChatMessage");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_2 = require("../../errors/utils");
// Add chatmessages for chatflowid
const createChatMessage = async (chatMessage) => {
    try {
        const dbResponse = await (0, addChatMesage_1.utilAddChatMessage)(chatMessage);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatMessagesService.createChatMessage - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Get all chatmessages from chatflowid
const getAllChatMessages = async (chatflowId, chatTypeFilter, sortOrder = 'ASC', chatId, memoryType, sessionId, startDate, endDate, messageId, feedback) => {
    try {
        const dbResponse = await (0, getChatMessage_1.utilGetChatMessage)(chatflowId, chatTypeFilter, sortOrder, chatId, memoryType, sessionId, startDate, endDate, messageId, feedback);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatMessagesService.getAllChatMessages - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Get internal chatmessages from chatflowid
const getAllInternalChatMessages = async (chatflowId, chatTypeFilter, sortOrder = 'ASC', chatId, memoryType, sessionId, startDate, endDate, messageId, feedback) => {
    try {
        const dbResponse = await (0, getChatMessage_1.utilGetChatMessage)(chatflowId, chatTypeFilter, sortOrder, chatId, memoryType, sessionId, startDate, endDate, messageId, feedback);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatMessagesService.getAllInternalChatMessages - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const removeAllChatMessages = async (chatId, chatflowid, deleteOptions) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        // remove all related feedback records
        const feedbackDeleteOptions = { chatId };
        await appServer.AppDataSource.getRepository(ChatMessageFeedback_1.ChatMessageFeedback).delete(feedbackDeleteOptions);
        // Delete all uploads corresponding to this chatflow/chatId
        if (chatId) {
            try {
                const directory = path_1.default.join((0, flowise_components_1.getStoragePath)(), chatflowid, chatId);
                (0, utils_1.deleteFolderRecursive)(directory);
            }
            catch (e) {
                logger_1.default.error(`[server]: Error deleting file storage for chatflow ${chatflowid}, chatId ${chatId}: ${e}`);
            }
        }
        const dbResponse = await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).delete(deleteOptions);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatMessagesService.removeAllChatMessages - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    createChatMessage,
    getAllChatMessages,
    getAllInternalChatMessages,
    removeAllChatMessages
};
//# sourceMappingURL=index.js.map