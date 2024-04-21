import { IChatMessageFeedback } from '../Interface';
/**
 * Method that updates chat message feedback.
 * @param {string} id
 * @param {Partial<IChatMessageFeedback>} chatMessageFeedback
 */
export declare const utilUpdateChatMessageFeedback: (id: string, chatMessageFeedback: Partial<IChatMessageFeedback>) => Promise<{
    status: string;
}>;
