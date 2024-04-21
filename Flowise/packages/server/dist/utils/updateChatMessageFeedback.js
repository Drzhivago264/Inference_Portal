"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilUpdateChatMessageFeedback = void 0;
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
const ChatMessageFeedback_1 = require("../database/entities/ChatMessageFeedback");
/**
 * Method that updates chat message feedback.
 * @param {string} id
 * @param {Partial<IChatMessageFeedback>} chatMessageFeedback
 */
const utilUpdateChatMessageFeedback = async (id, chatMessageFeedback) => {
    const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
    const newChatMessageFeedback = new ChatMessageFeedback_1.ChatMessageFeedback();
    Object.assign(newChatMessageFeedback, chatMessageFeedback);
    await appServer.AppDataSource.getRepository(ChatMessageFeedback_1.ChatMessageFeedback).update({ id }, chatMessageFeedback);
    return { status: 'OK' };
};
exports.utilUpdateChatMessageFeedback = utilUpdateChatMessageFeedback;
//# sourceMappingURL=updateChatMessageFeedback.js.map