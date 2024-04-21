"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../Interface");
const chatflows_1 = __importDefault(require("../../services/chatflows"));
const chat_messages_1 = __importDefault(require("../../services/chat-messages"));
const utils_1 = require("../../utils");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const createChatMessage = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, 'Error: chatMessagesController.createChatMessage - request body not provided!');
        }
        const apiResponse = await chat_messages_1.default.createChatMessage(req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getAllChatMessages = async (req, res, next) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        let chatTypeFilter = (_a = req.query) === null || _a === void 0 ? void 0 : _a.chatType;
        if (chatTypeFilter) {
            try {
                const chatTypeFilterArray = JSON.parse(chatTypeFilter);
                if (chatTypeFilterArray.includes(Interface_1.chatType.EXTERNAL) && chatTypeFilterArray.includes(Interface_1.chatType.INTERNAL)) {
                    chatTypeFilter = undefined;
                }
                else if (chatTypeFilterArray.includes(Interface_1.chatType.EXTERNAL)) {
                    chatTypeFilter = Interface_1.chatType.EXTERNAL;
                }
                else if (chatTypeFilterArray.includes(Interface_1.chatType.INTERNAL)) {
                    chatTypeFilter = Interface_1.chatType.INTERNAL;
                }
            }
            catch (e) {
                return res.status(500).send(e);
            }
        }
        const sortOrder = (_b = req.query) === null || _b === void 0 ? void 0 : _b.order;
        const chatId = (_c = req.query) === null || _c === void 0 ? void 0 : _c.chatId;
        const memoryType = (_d = req.query) === null || _d === void 0 ? void 0 : _d.memoryType;
        const sessionId = (_e = req.query) === null || _e === void 0 ? void 0 : _e.sessionId;
        const messageId = (_f = req.query) === null || _f === void 0 ? void 0 : _f.messageId;
        const startDate = (_g = req.query) === null || _g === void 0 ? void 0 : _g.startDate;
        const endDate = (_h = req.query) === null || _h === void 0 ? void 0 : _h.endDate;
        const feedback = (_j = req.query) === null || _j === void 0 ? void 0 : _j.feedback;
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: chatMessageController.getAllChatMessages - id not provided!`);
        }
        const apiResponse = await chat_messages_1.default.getAllChatMessages(req.params.id, chatTypeFilter, sortOrder, chatId, memoryType, sessionId, startDate, endDate, messageId, feedback);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getAllInternalChatMessages = async (req, res, next) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const sortOrder = (_a = req.query) === null || _a === void 0 ? void 0 : _a.order;
        const chatId = (_b = req.query) === null || _b === void 0 ? void 0 : _b.chatId;
        const memoryType = (_c = req.query) === null || _c === void 0 ? void 0 : _c.memoryType;
        const sessionId = (_d = req.query) === null || _d === void 0 ? void 0 : _d.sessionId;
        const messageId = (_e = req.query) === null || _e === void 0 ? void 0 : _e.messageId;
        const startDate = (_f = req.query) === null || _f === void 0 ? void 0 : _f.startDate;
        const endDate = (_g = req.query) === null || _g === void 0 ? void 0 : _g.endDate;
        const feedback = (_h = req.query) === null || _h === void 0 ? void 0 : _h.feedback;
        const apiResponse = await chat_messages_1.default.getAllInternalChatMessages(req.params.id, Interface_1.chatType.INTERNAL, sortOrder, chatId, memoryType, sessionId, startDate, endDate, messageId, feedback);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
//Delete all chatmessages from chatId
const removeAllChatMessages = async (req, res, next) => {
    var _a, _b, _c, _d, _e;
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, 'Error: chatMessagesController.removeAllChatMessages - id not provided!');
        }
        const chatflowid = req.params.id;
        const chatflow = await chatflows_1.default.getChatflowById(req.params.id);
        if (!chatflow) {
            return res.status(404).send(`Chatflow ${req.params.id} not found`);
        }
        const chatId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.chatId;
        const memoryType = (_b = req.query) === null || _b === void 0 ? void 0 : _b.memoryType;
        const sessionId = (_c = req.query) === null || _c === void 0 ? void 0 : _c.sessionId;
        const chatType = (_d = req.query) === null || _d === void 0 ? void 0 : _d.chatType;
        const isClearFromViewMessageDialog = (_e = req.query) === null || _e === void 0 ? void 0 : _e.isClearFromViewMessageDialog;
        const flowData = chatflow.flowData;
        const parsedFlowData = JSON.parse(flowData);
        const nodes = parsedFlowData.nodes;
        try {
            await (0, utils_1.clearSessionMemory)(nodes, appServer.nodesPool.componentNodes, chatId, appServer.AppDataSource, sessionId, memoryType, isClearFromViewMessageDialog);
        }
        catch (e) {
            return res.status(500).send('Error clearing chat messages');
        }
        const deleteOptions = { chatflowid };
        if (chatId)
            deleteOptions.chatId = chatId;
        if (memoryType)
            deleteOptions.memoryType = memoryType;
        if (sessionId)
            deleteOptions.sessionId = sessionId;
        if (chatType)
            deleteOptions.chatType = chatType;
        const apiResponse = await chat_messages_1.default.removeAllChatMessages(chatId, chatflowid, deleteOptions);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createChatMessage,
    getAllChatMessages,
    getAllInternalChatMessages,
    removeAllChatMessages
};
//# sourceMappingURL=index.js.map