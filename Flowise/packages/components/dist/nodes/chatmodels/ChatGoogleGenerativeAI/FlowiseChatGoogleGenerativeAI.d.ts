import { BaseMessage } from '@langchain/core/messages';
import { CallbackManagerForLLMRun } from '@langchain/core/callbacks/manager';
import { BaseChatModel, type BaseChatModelParams } from '@langchain/core/language_models/chat_models';
import { ChatGenerationChunk, ChatResult } from '@langchain/core/outputs';
import { Content, Tool } from '@google/generative-ai';
import type { SafetySetting } from '@google/generative-ai';
import { ICommonObject, IMultiModalOption, IVisionChatModal } from '../../../src';
import { StructuredToolInterface } from '@langchain/core/tools';
export interface GoogleGenerativeAIChatInput extends BaseChatModelParams {
    modelName?: string;
    model?: string;
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
    stopSequences?: string[];
    safetySettings?: SafetySetting[];
    apiKey?: string;
    streaming?: boolean;
}
declare class LangchainChatGoogleGenerativeAI extends BaseChatModel implements GoogleGenerativeAIChatInput {
    modelName: string;
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
    stopSequences: string[];
    safetySettings?: SafetySetting[];
    apiKey?: string;
    streaming: boolean;
    private client;
    get _isMultimodalModel(): boolean;
    constructor(fields?: GoogleGenerativeAIChatInput);
    getClient(tools?: Tool[]): void;
    _combineLLMOutput(): never[];
    _llmType(): string;
    bindTools(tools: (StructuredToolInterface | Record<string, unknown>)[], kwargs?: Partial<ICommonObject>): import("@langchain/core/runnables").Runnable<import("@langchain/core/language_models/base").BaseLanguageModelInput, import("@langchain/core/messages").BaseMessageChunk, import("@langchain/core/language_models/base").BaseLanguageModelCallOptions>;
    convertFunctionResponse(prompts: Content[]): void;
    _generateNonStreaming(prompt: Content[], options: this['ParsedCallOptions'], _runManager?: CallbackManagerForLLMRun): Promise<ChatResult>;
    _generate(messages: BaseMessage[], options: this['ParsedCallOptions'], runManager?: CallbackManagerForLLMRun): Promise<ChatResult>;
    _streamResponseChunks(messages: BaseMessage[], options: this['ParsedCallOptions'], runManager?: CallbackManagerForLLMRun): AsyncGenerator<ChatGenerationChunk>;
}
export declare class ChatGoogleGenerativeAI extends LangchainChatGoogleGenerativeAI implements IVisionChatModal {
    configuredModel: string;
    configuredMaxToken?: number;
    multiModalOption: IMultiModalOption;
    id: string;
    constructor(id: string, fields?: GoogleGenerativeAIChatInput);
    revertToOriginalModel(): void;
    setMultiModalOption(multiModalOption: IMultiModalOption): void;
    setVisionModel(): void;
}
export {};
