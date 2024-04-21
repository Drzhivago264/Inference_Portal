import { ChatMessageFeedback } from '../database/entities/ChatMessageFeedback';
import { IChatMessageFeedback } from '../Interface';
/**
 * Method that add chat message feedback.
 * @param {Partial<IChatMessageFeedback>} chatMessageFeedback
 */
export declare const utilAddChatMessageFeedback: (chatMessageFeedback: Partial<IChatMessageFeedback>) => Promise<ChatMessageFeedback>;
