"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilGetChatMessageFeedback = void 0;
const typeorm_1 = require("typeorm");
const ChatMessageFeedback_1 = require("../database/entities/ChatMessageFeedback");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
/**
 * Method that get chat messages.
 * @param {string} chatflowid
 * @param {string} sortOrder
 * @param {string} chatId
 * @param {string} startDate
 * @param {string} endDate
 */
const utilGetChatMessageFeedback = async (chatflowid, chatId, sortOrder = 'ASC', startDate, endDate) => {
    const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
    let fromDate;
    if (startDate)
        fromDate = new Date(startDate);
    let toDate;
    if (endDate)
        toDate = new Date(endDate);
    return await appServer.AppDataSource.getRepository(ChatMessageFeedback_1.ChatMessageFeedback).find({
        where: {
            chatflowid,
            chatId,
            createdDate: toDate && fromDate ? (0, typeorm_1.Between)(fromDate, toDate) : undefined
        },
        order: {
            createdDate: sortOrder === 'DESC' ? 'DESC' : 'ASC'
        }
    });
};
exports.utilGetChatMessageFeedback = utilGetChatMessageFeedback;
//# sourceMappingURL=getChatMessageFeedback.js.map