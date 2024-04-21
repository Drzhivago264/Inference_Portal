import { ChatMessage } from '../database/entities/ChatMessage';
import { IChatMessage } from '../Interface';
/**
 * Method that add chat messages.
 * @param {Partial<IChatMessage>} chatMessage
 */
export declare const utilAddChatMessage: (chatMessage: Partial<IChatMessage>) => Promise<ChatMessage>;
