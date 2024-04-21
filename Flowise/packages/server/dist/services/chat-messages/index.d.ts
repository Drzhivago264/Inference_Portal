import { FindOptionsWhere } from 'typeorm';
import { chatType, IChatMessage } from '../../Interface';
import { ChatMessage } from '../../database/entities/ChatMessage';
declare const _default: {
    createChatMessage: (chatMessage: Partial<IChatMessage>) => Promise<ChatMessage>;
    getAllChatMessages: (chatflowId: string, chatTypeFilter: chatType | undefined, sortOrder?: string, chatId?: string | undefined, memoryType?: string | undefined, sessionId?: string | undefined, startDate?: string | undefined, endDate?: string | undefined, messageId?: string | undefined, feedback?: boolean | undefined) => Promise<any>;
    getAllInternalChatMessages: (chatflowId: string, chatTypeFilter: chatType | undefined, sortOrder?: string, chatId?: string | undefined, memoryType?: string | undefined, sessionId?: string | undefined, startDate?: string | undefined, endDate?: string | undefined, messageId?: string | undefined, feedback?: boolean | undefined) => Promise<any>;
    removeAllChatMessages: (chatId: string, chatflowid: string, deleteOptions: FindOptionsWhere<ChatMessage>) => Promise<any>;
};
export default _default;
