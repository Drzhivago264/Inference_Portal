"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGoogleGenerativeAI = void 0;
const messages_1 = require("@langchain/core/messages");
const chat_models_1 = require("@langchain/core/language_models/chat_models");
const outputs_1 = require("@langchain/core/outputs");
const generative_ai_1 = require("@google/generative-ai");
const function_calling_1 = require("@langchain/core/utils/function_calling");
const zod_to_json_schema_1 = require("zod-to-json-schema");
class LangchainChatGoogleGenerativeAI extends chat_models_1.BaseChatModel {
    get _isMultimodalModel() {
        return this.modelName.includes('vision') || this.modelName.startsWith('gemini-1.5');
    }
    constructor(fields) {
        super(fields ?? {});
        this.modelName = 'gemini-pro';
        this.stopSequences = [];
        this.streaming = false;
        this.modelName = fields?.model?.replace(/^models\//, '') ?? fields?.modelName?.replace(/^models\//, '') ?? 'gemini-pro';
        this.maxOutputTokens = fields?.maxOutputTokens ?? this.maxOutputTokens;
        if (this.maxOutputTokens && this.maxOutputTokens < 0) {
            throw new Error('`maxOutputTokens` must be a positive integer');
        }
        this.temperature = fields?.temperature ?? this.temperature;
        if (this.temperature && (this.temperature < 0 || this.temperature > 1)) {
            throw new Error('`temperature` must be in the range of [0.0,1.0]');
        }
        this.topP = fields?.topP ?? this.topP;
        if (this.topP && this.topP < 0) {
            throw new Error('`topP` must be a positive integer');
        }
        if (this.topP && this.topP > 1) {
            throw new Error('`topP` must be below 1.');
        }
        this.topK = fields?.topK ?? this.topK;
        if (this.topK && this.topK < 0) {
            throw new Error('`topK` must be a positive integer');
        }
        this.stopSequences = fields?.stopSequences ?? this.stopSequences;
        this.apiKey = fields?.apiKey ?? process.env['GOOGLE_API_KEY'];
        if (!this.apiKey) {
            throw new Error('Please set an API key for Google GenerativeAI ' +
                'in the environment variable GOOGLE_API_KEY ' +
                'or in the `apiKey` field of the ' +
                'ChatGoogleGenerativeAI constructor');
        }
        this.safetySettings = fields?.safetySettings ?? this.safetySettings;
        if (this.safetySettings && this.safetySettings.length > 0) {
            const safetySettingsSet = new Set(this.safetySettings.map((s) => s.category));
            if (safetySettingsSet.size !== this.safetySettings.length) {
                throw new Error('The categories in `safetySettings` array must be unique');
            }
        }
        this.streaming = fields?.streaming ?? this.streaming;
        this.getClient();
    }
    getClient(tools) {
        this.client = new generative_ai_1.GoogleGenerativeAI(this.apiKey ?? '').getGenerativeModel({
            model: this.modelName,
            tools,
            safetySettings: this.safetySettings,
            generationConfig: {
                candidateCount: 1,
                stopSequences: this.stopSequences,
                maxOutputTokens: this.maxOutputTokens,
                temperature: this.temperature,
                topP: this.topP,
                topK: this.topK
            }
        });
    }
    _combineLLMOutput() {
        return [];
    }
    _llmType() {
        return 'googlegenerativeai';
    }
    bindTools(tools, kwargs) {
        //@ts-ignore
        return this.bind({ tools: convertToGeminiTools(tools), ...kwargs });
    }
    convertFunctionResponse(prompts) {
        for (let i = 0; i < prompts.length; i += 1) {
            if (prompts[i].role === 'function') {
                if (prompts[i - 1].role === 'model') {
                    const toolName = prompts[i - 1].parts[0].functionCall?.name ?? '';
                    prompts[i].parts = [
                        {
                            functionResponse: {
                                name: toolName,
                                response: {
                                    name: toolName,
                                    content: prompts[i].parts[0].text
                                }
                            }
                        }
                    ];
                }
            }
        }
    }
    async _generateNonStreaming(prompt, options, _runManager) {
        //@ts-ignore
        const tools = options.tools ?? [];
        this.convertFunctionResponse(prompt);
        if (tools.length > 0) {
            this.getClient(tools);
        }
        else {
            this.getClient();
        }
        const res = await this.caller.callWithOptions({ signal: options?.signal }, async () => {
            let output;
            try {
                output = await this.client.generateContent({
                    contents: prompt
                });
            }
            catch (e) {
                if (e.message?.includes('400 Bad Request')) {
                    e.status = 400;
                }
                throw e;
            }
            return output;
        });
        const generationResult = mapGenerateContentResultToChatResult(res.response);
        await _runManager?.handleLLMNewToken(generationResult.generations?.length ? generationResult.generations[0].text : '');
        return generationResult;
    }
    async _generate(messages, options, runManager) {
        const prompt = convertBaseMessagesToContent(messages, this._isMultimodalModel);
        // Handle streaming
        if (this.streaming) {
            const tokenUsage = {};
            const stream = this._streamResponseChunks(messages, options, runManager);
            const finalChunks = {};
            for await (const chunk of stream) {
                const index = chunk.generationInfo?.completion ?? 0;
                if (finalChunks[index] === undefined) {
                    finalChunks[index] = chunk;
                }
                else {
                    finalChunks[index] = finalChunks[index].concat(chunk);
                }
            }
            const generations = Object.entries(finalChunks)
                .sort(([aKey], [bKey]) => parseInt(aKey, 10) - parseInt(bKey, 10))
                .map(([_, value]) => value);
            return { generations, llmOutput: { estimatedTokenUsage: tokenUsage } };
        }
        return this._generateNonStreaming(prompt, options, runManager);
    }
    async *_streamResponseChunks(messages, options, runManager) {
        const prompt = convertBaseMessagesToContent(messages, this._isMultimodalModel);
        //@ts-ignore
        if (options.tools !== undefined && options.tools.length > 0) {
            const result = await this._generateNonStreaming(prompt, options, runManager);
            const generationMessage = result.generations[0].message;
            if (generationMessage === undefined) {
                throw new Error('Could not parse Groq output.');
            }
            const toolCallChunks = generationMessage.tool_calls?.map((toolCall, i) => ({
                name: toolCall.name,
                args: JSON.stringify(toolCall.args),
                id: toolCall.id,
                index: i
            }));
            yield new outputs_1.ChatGenerationChunk({
                message: new messages_1.AIMessageChunk({
                    content: generationMessage.content,
                    additional_kwargs: generationMessage.additional_kwargs,
                    tool_call_chunks: toolCallChunks
                }),
                text: generationMessage.tool_calls?.length ? '' : generationMessage.content
            });
        }
        else {
            const stream = await this.caller.callWithOptions({ signal: options?.signal }, async () => {
                this.getClient();
                const { stream } = await this.client.generateContentStream({
                    contents: prompt
                });
                return stream;
            });
            for await (const response of stream) {
                const chunk = convertResponseContentToChatGenerationChunk(response);
                if (!chunk) {
                    continue;
                }
                yield chunk;
                await runManager?.handleLLMNewToken(chunk.text ?? '');
            }
        }
    }
}
class ChatGoogleGenerativeAI extends LangchainChatGoogleGenerativeAI {
    constructor(id, fields) {
        super(fields);
        this.id = id;
        this.configuredModel = fields?.modelName ?? '';
        this.configuredMaxToken = fields?.maxOutputTokens;
    }
    revertToOriginalModel() {
        super.modelName = this.configuredModel;
        super.maxOutputTokens = this.configuredMaxToken;
    }
    setMultiModalOption(multiModalOption) {
        this.multiModalOption = multiModalOption;
    }
    setVisionModel() {
        if (this.modelName !== 'gemini-pro-vision' && this.modelName !== 'gemini-1.5-pro-latest') {
            super.modelName = 'gemini-1.5-pro-latest';
            super.maxOutputTokens = this.configuredMaxToken ? this.configuredMaxToken : 8192;
        }
    }
}
exports.ChatGoogleGenerativeAI = ChatGoogleGenerativeAI;
function getMessageAuthor(message) {
    const type = message._getType();
    if (messages_1.ChatMessage.isInstance(message)) {
        return message.role;
    }
    return message.name ?? type;
}
function convertAuthorToRole(author) {
    switch (author) {
        /**
         *  Note: Gemini currently is not supporting system messages
         *  we will convert them to human messages and merge with following
         * */
        case 'ai':
        case 'model': // getMessageAuthor returns message.name. code ex.: return message.name ?? type;
            return 'model';
        case 'system':
        case 'human':
            return 'user';
        case 'function':
        case 'tool':
            return 'function';
        default:
            throw new Error(`Unknown / unsupported author: ${author}`);
    }
}
function convertMessageContentToParts(content, isMultimodalModel) {
    if (typeof content === 'string') {
        return [{ text: content }];
    }
    return content.map((c) => {
        if (c.type === 'text') {
            return {
                text: c.text
            };
        }
        if (c.type === 'tool_use') {
            return {
                functionCall: c.functionCall
            };
        }
        /*if (c.type === "tool_use" || c.type === "tool_result") {
            // TODO: Fix when SDK types are fixed
            return {
              ...contentPart,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any;
        }*/
        if (c.type === 'image_url') {
            if (!isMultimodalModel) {
                throw new Error(`This model does not support images`);
            }
            let source;
            if (typeof c.image_url === 'string') {
                source = c.image_url;
            }
            else if (typeof c.image_url === 'object' && 'url' in c.image_url) {
                source = c.image_url.url;
            }
            else {
                throw new Error('Please provide image as base64 encoded data URL');
            }
            const [dm, data] = source.split(',');
            if (!dm.startsWith('data:')) {
                throw new Error('Please provide image as base64 encoded data URL');
            }
            const [mimeType, encoding] = dm.replace(/^data:/, '').split(';');
            if (encoding !== 'base64') {
                throw new Error('Please provide image as base64 encoded data URL');
            }
            return {
                inlineData: {
                    data,
                    mimeType
                }
            };
        }
        throw new Error(`Unknown content type ${c.type}`);
    });
}
function convertBaseMessagesToContent(messages, isMultimodalModel) {
    return messages.reduce((acc, message, index) => {
        if (!(0, messages_1.isBaseMessage)(message)) {
            throw new Error('Unsupported message input');
        }
        const author = getMessageAuthor(message);
        if (author === 'system' && index !== 0) {
            throw new Error('System message should be the first one');
        }
        const role = convertAuthorToRole(author);
        const prevContent = acc.content[acc.content.length];
        if (!acc.mergeWithPreviousContent && prevContent && prevContent.role === role) {
            throw new Error('Google Generative AI requires alternate messages between authors');
        }
        const parts = convertMessageContentToParts(message.content, isMultimodalModel);
        if (acc.mergeWithPreviousContent) {
            const prevContent = acc.content[acc.content.length - 1];
            if (!prevContent) {
                throw new Error('There was a problem parsing your system message. Please try a prompt without one.');
            }
            prevContent.parts.push(...parts);
            return {
                mergeWithPreviousContent: false,
                content: acc.content
            };
        }
        const content = {
            role,
            parts
        };
        return {
            mergeWithPreviousContent: author === 'system',
            content: [...acc.content, content]
        };
    }, { content: [], mergeWithPreviousContent: false }).content;
}
function mapGenerateContentResultToChatResult(response) {
    // if rejected or error, return empty generations with reason in filters
    if (!response.candidates || response.candidates.length === 0 || !response.candidates[0]) {
        return {
            generations: [],
            llmOutput: {
                filters: response?.promptFeedback
            }
        };
    }
    const [candidate] = response.candidates;
    const { content, ...generationInfo } = candidate;
    const text = content.parts.map(({ text }) => text).join('');
    if (content.parts.some((part) => part.functionCall)) {
        const toolCalls = [];
        for (const fcPart of content.parts) {
            const fc = fcPart.functionCall;
            if (fc) {
                const { name, args } = fc;
                toolCalls.push({ name, args });
            }
        }
        const functionCalls = toolCalls.map((tool) => {
            return { functionCall: { name: tool.name, args: tool.args }, type: 'tool_use' };
        });
        const generation = {
            text,
            message: new messages_1.AIMessage({
                content: functionCalls,
                name: !content ? undefined : content.role,
                additional_kwargs: generationInfo,
                tool_calls: toolCalls
            }),
            generationInfo
        };
        return {
            generations: [generation]
        };
    }
    else {
        const generation = {
            text,
            message: new messages_1.AIMessage({
                content: text,
                name: !content ? undefined : content.role,
                additional_kwargs: generationInfo
            }),
            generationInfo
        };
        return {
            generations: [generation]
        };
    }
}
function convertResponseContentToChatGenerationChunk(response) {
    if (!response.candidates || response.candidates.length === 0) {
        return null;
    }
    const [candidate] = response.candidates;
    const { content, ...generationInfo } = candidate;
    const text = content?.parts[0]?.text ?? '';
    return new outputs_1.ChatGenerationChunk({
        text,
        message: new messages_1.AIMessageChunk({
            content: text,
            name: !content ? undefined : content.role,
            // Each chunk can have unique "generationInfo", and merging strategy is unclear,
            // so leave blank for now.
            additional_kwargs: {}
        }),
        generationInfo
    });
}
function zodToGeminiParameters(zodObj) {
    // Gemini doesn't accept either the $schema or additionalProperties
    // attributes, so we need to explicitly remove them.
    const jsonSchema = (0, zod_to_json_schema_1.zodToJsonSchema)(zodObj);
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { $schema, additionalProperties, ...rest } = jsonSchema;
    return rest;
}
function convertToGeminiTools(structuredTools) {
    return [
        {
            functionDeclarations: structuredTools.map((structuredTool) => {
                if ((0, function_calling_1.isStructuredTool)(structuredTool)) {
                    const jsonSchema = zodToGeminiParameters(structuredTool.schema);
                    return {
                        name: structuredTool.name,
                        description: structuredTool.description,
                        parameters: jsonSchema
                    };
                }
                return structuredTool;
            })
        }
    ];
}
//# sourceMappingURL=FlowiseChatGoogleGenerativeAI.js.map