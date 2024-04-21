import { IChatFlow } from '../../Interface';
import { ChatFlow } from '../../database/entities/ChatFlow';
declare const _default: {
    checkIfChatflowIsValidForStreaming: (chatflowId: string) => Promise<any>;
    checkIfChatflowIsValidForUploads: (chatflowId: string) => Promise<any>;
    deleteChatflow: (chatflowId: string) => Promise<any>;
    getAllChatflows: () => Promise<IChatFlow[]>;
    getChatflowByApiKey: (apiKeyId: string) => Promise<any>;
    getChatflowById: (chatflowId: string) => Promise<any>;
    saveChatflow: (newChatFlow: ChatFlow) => Promise<any>;
    updateChatflow: (chatflow: ChatFlow, updateChatFlow: ChatFlow) => Promise<any>;
    getSinglePublicChatflow: (chatflowId: string) => Promise<any>;
    getSinglePublicChatbotConfig: (chatflowId: string) => Promise<any>;
};
export default _default;
