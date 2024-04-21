import { chatType } from '../Interface';
import { ChatMessage } from '../database/entities/ChatMessage';
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
export declare const utilGetChatMessage: (chatflowid: string, chatType: chatType | undefined, sortOrder?: string, chatId?: string, memoryType?: string, sessionId?: string, startDate?: string, endDate?: string, messageId?: string, feedback?: boolean) => Promise<ChatMessage[]>;
