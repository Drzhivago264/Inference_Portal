import { ChatMessageFeedback } from '../database/entities/ChatMessageFeedback';
/**
 * Method that get chat messages.
 * @param {string} chatflowid
 * @param {string} sortOrder
 * @param {string} chatId
 * @param {string} startDate
 * @param {string} endDate
 */
export declare const utilGetChatMessageFeedback: (chatflowid: string, chatId?: string, sortOrder?: string, startDate?: string, endDate?: string) => Promise<ChatMessageFeedback[]>;
