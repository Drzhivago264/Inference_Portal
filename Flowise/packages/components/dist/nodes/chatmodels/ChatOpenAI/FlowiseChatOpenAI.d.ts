import type { ClientOptions } from 'openai';
import { ChatOpenAI as LangchainChatOpenAI, OpenAIChatInput, LegacyOpenAIInput, AzureOpenAIInput } from '@langchain/openai';
import { BaseChatModelParams } from '@langchain/core/language_models/chat_models';
import { IMultiModalOption, IVisionChatModal } from '../../../src';
export declare class ChatOpenAI extends LangchainChatOpenAI implements IVisionChatModal {
    configuredModel: string;
    configuredMaxToken?: number;
    multiModalOption: IMultiModalOption;
    id: string;
    constructor(id: string, fields?: Partial<OpenAIChatInput> & Partial<AzureOpenAIInput> & BaseChatModelParams & {
        configuration?: ClientOptions & LegacyOpenAIInput;
    }, 
    /** @deprecated */
    configuration?: ClientOptions & LegacyOpenAIInput);
    revertToOriginalModel(): void;
    setMultiModalOption(multiModalOption: IMultiModalOption): void;
    setVisionModel(): void;
}
