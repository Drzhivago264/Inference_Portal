import { AnthropicInput, ChatAnthropic as LangchainChatAnthropic } from '@langchain/anthropic';
import { BaseLLMParams } from '@langchain/core/language_models/llms';
import { IVisionChatModal, IMultiModalOption } from '../../../src';
export declare class ChatAnthropic extends LangchainChatAnthropic implements IVisionChatModal {
    configuredModel: string;
    configuredMaxToken: number;
    multiModalOption: IMultiModalOption;
    id: string;
    constructor(id: string, fields: Partial<AnthropicInput> & BaseLLMParams & {
        anthropicApiKey?: string;
    });
    revertToOriginalModel(): void;
    setMultiModalOption(multiModalOption: IMultiModalOption): void;
    setVisionModel(): void;
}
