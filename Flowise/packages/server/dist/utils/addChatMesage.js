"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilAddChatMessage = void 0;
const ChatMessage_1 = require("../database/entities/ChatMessage");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
/**
 * Method that add chat messages.
 * @param {Partial<IChatMessage>} chatMessage
 */
const utilAddChatMessage = async (chatMessage) => {
    const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
    const newChatMessage = new ChatMessage_1.ChatMessage();
    Object.assign(newChatMessage, chatMessage);
    if (!newChatMessage.createdDate) {
        newChatMessage.createdDate = new Date();
    }
    const chatmessage = await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).create(newChatMessage);
    const dbResponse = await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).save(chatmessage);
    return dbResponse;
};
exports.utilAddChatMessage = utilAddChatMessage;
//# sourceMappingURL=addChatMesage.js.map