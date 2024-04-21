import { IChatMessageFeedback } from '../../Interface';
declare const _default: {
    getAllChatMessageFeedback: (chatflowid: string, chatId: string | undefined, sortOrder: string | undefined, startDate: string | undefined, endDate: string | undefined) => Promise<import("../../database/entities/ChatMessageFeedback").ChatMessageFeedback[]>;
    createChatMessageFeedbackForChatflow: (requestBody: Partial<IChatMessageFeedback>) => Promise<any>;
    updateChatMessageFeedbackForChatflow: (chatflowId: string, requestBody: Partial<IChatMessageFeedback>) => Promise<any>;
};
export default _default;
