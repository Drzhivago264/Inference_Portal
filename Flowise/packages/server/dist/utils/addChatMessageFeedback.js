"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilAddChatMessageFeedback = void 0;
const ChatMessageFeedback_1 = require("../database/entities/ChatMessageFeedback");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
/**
 * Method that add chat message feedback.
 * @param {Partial<IChatMessageFeedback>} chatMessageFeedback
 */
const utilAddChatMessageFeedback = async (chatMessageFeedback) => {
    const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
    const newChatMessageFeedback = new ChatMessageFeedback_1.ChatMessageFeedback();
    Object.assign(newChatMessageFeedback, chatMessageFeedback);
    const feedback = await appServer.AppDataSource.getRepository(ChatMessageFeedback_1.ChatMessageFeedback).create(newChatMessageFeedback);
    return await appServer.AppDataSource.getRepository(ChatMessageFeedback_1.ChatMessageFeedback).save(feedback);
};
exports.utilAddChatMessageFeedback = utilAddChatMessageFeedback;
//# sourceMappingURL=addChatMessageFeedback.js.map