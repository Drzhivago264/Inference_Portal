import { IChatMessageFeedback, ChatMessageRatingType } from '../../Interface';
export declare class ChatMessageFeedback implements IChatMessageFeedback {
    id: string;
    chatflowid: string;
    chatId: string;
    messageId: string;
    rating: ChatMessageRatingType;
    content?: string;
    createdDate: Date;
}
