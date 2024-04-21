"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilGetChatMessage = void 0;
const typeorm_1 = require("typeorm");
const ChatMessage_1 = require("../database/entities/ChatMessage");
const ChatMessageFeedback_1 = require("../database/entities/ChatMessageFeedback");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
/**
 * Method that get chat messages.
 * @param {string} chatflowid
 * @param {chatType} chatType
 * @param {string} sortOrder
 * @param {string} chatId
 * @param {string} memoryType
 * @param {string} sessionId
 * @param {string} startDate
 * @param {string} endDate
 * @param {boolean} feedback
 */
const utilGetChatMessage = async (chatflowid, chatType, sortOrder = 'ASC', chatId, memoryType, sessionId, startDate, endDate, messageId, feedback) => {
    const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
    const setDateToStartOrEndOfDay = (dateTimeStr, setHours) => {
        const date = new Date(dateTimeStr);
        if (isNaN(date.getTime())) {
            return undefined;
        }
        setHours === 'start' ? date.setHours(0, 0, 0, 0) : date.setHours(23, 59, 59, 999);
        return date;
    };
    const aMonthAgo = () => {
        const date = new Date();
        date.setMonth(new Date().getMonth() - 1);
        return date;
    };
    let fromDate;
    if (startDate)
        fromDate = setDateToStartOrEndOfDay(startDate, 'start');
    let toDate;
    if (endDate)
        toDate = setDateToStartOrEndOfDay(endDate, 'end');
    if (feedback) {
        const query = await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).createQueryBuilder('chat_message');
        // do the join with chat message feedback based on messageId for each chat message in the chatflow
        query
            .leftJoinAndMapOne('chat_message.feedback', ChatMessageFeedback_1.ChatMessageFeedback, 'feedback', 'feedback.messageId = chat_message.id')
            .where('chat_message.chatflowid = :chatflowid', { chatflowid });
        // based on which parameters are available add `andWhere` clauses to the query
        if (chatType) {
            query.andWhere('chat_message.chatType = :chatType', { chatType });
        }
        if (chatId) {
            query.andWhere('chat_message.chatId = :chatId', { chatId });
        }
        if (memoryType) {
            query.andWhere('chat_message.memoryType = :memoryType', { memoryType });
        }
        if (sessionId) {
            query.andWhere('chat_message.sessionId = :sessionId', { sessionId });
        }
        // set date range
        query.andWhere('chat_message.createdDate BETWEEN :fromDate AND :toDate', {
            fromDate: fromDate !== null && fromDate !== void 0 ? fromDate : aMonthAgo(),
            toDate: toDate !== null && toDate !== void 0 ? toDate : new Date()
        });
        // sort
        query.orderBy('chat_message.createdDate', sortOrder === 'DESC' ? 'DESC' : 'ASC');
        const messages = await query.getMany();
        return messages;
    }
    return await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).find({
        where: Object.assign(Object.assign(Object.assign({ chatflowid,
            chatType,
            chatId, memoryType: memoryType !== null && memoryType !== void 0 ? memoryType : undefined, sessionId: sessionId !== null && sessionId !== void 0 ? sessionId : undefined }, (fromDate && { createdDate: (0, typeorm_1.MoreThanOrEqual)(fromDate) })), (toDate && { createdDate: (0, typeorm_1.LessThanOrEqual)(toDate) })), { id: messageId !== null && messageId !== void 0 ? messageId : undefined }),
        order: {
            createdDate: sortOrder === 'DESC' ? 'DESC' : 'ASC'
        }
    });
};
exports.utilGetChatMessage = utilGetChatMessage;
//# sourceMappingURL=getChatMessage.js.map