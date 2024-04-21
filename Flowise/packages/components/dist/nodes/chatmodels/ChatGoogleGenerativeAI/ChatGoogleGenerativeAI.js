"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const utils_1 = require("../../../src/utils");
const modelLoader_1 = require("../../../src/modelLoader");
const FlowiseChatGoogleGenerativeAI_1 = require("./FlowiseChatGoogleGenerativeAI");
class GoogleGenerativeAI_ChatModels {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.CHAT, 'chatGoogleGenerativeAI');
            }
        };
        this.label = 'ChatGoogleGenerativeAI';
        this.name = 'chatGoogleGenerativeAI';
        this.version = 2.0;
        this.type = 'ChatGoogleGenerativeAI';
        this.icon = 'GoogleGemini.svg';
        this.category = 'Chat Models';
        this.description = 'Wrapper around Google Gemini large language models that use the Chat endpoint';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(FlowiseChatGoogleGenerativeAI_1.ChatGoogleGenerativeAI)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['googleGenerativeAI'],
            optional: false,
            description: 'Google Generative AI credential.'
        };
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'gemini-pro'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Max Output Tokens',
                name: 'maxOutputTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Next Highest Probability Tokens',
                name: 'topK',
                type: 'number',
                description: `Decode using top-k sampling: consider the set of top_k most probable tokens. Must be positive`,
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Harm Category',
                name: 'harmCategory',
                type: 'multiOptions',
                description: 'Refer to <a target="_blank" href="https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/configure-safety-attributes#safety_attribute_definitions">official guide</a> on how to use Harm Category',
                options: [
                    {
                        label: 'Dangerous',
                        name: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT
                    },
                    {
                        label: 'Harassment',
                        name: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT
                    },
                    {
                        label: 'Hate Speech',
                        name: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH
                    },
                    {
                        label: 'Sexually Explicit',
                        name: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT
                    }
                ],
                optional: true,
                additionalParams: true
            },
            {
                label: 'Harm Block Threshold',
                name: 'harmBlockThreshold',
                type: 'multiOptions',
                description: 'Refer to <a target="_blank" href="https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/configure-safety-attributes#safety_setting_thresholds">official guide</a> on how to use Harm Block Threshold',
                options: [
                    {
                        label: 'Low and Above',
                        name: generative_ai_1.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
                    },
                    {
                        label: 'Medium and Above',
                        name: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
                    },
                    {
                        label: 'None',
                        name: generative_ai_1.HarmBlockThreshold.BLOCK_NONE
                    },
                    {
                        label: 'Only High',
                        name: generative_ai_1.HarmBlockThreshold.BLOCK_ONLY_HIGH
                    },
                    {
                        label: 'Threshold Unspecified',
                        name: generative_ai_1.HarmBlockThreshold.HARM_BLOCK_THRESHOLD_UNSPECIFIED
                    }
                ],
                optional: true,
                additionalParams: true
            },
            {
                label: 'Allow Image Uploads',
                name: 'allowImageUploads',
                type: 'boolean',
                description: 'Automatically uses vision model when image is being uploaded from chat. Only works with LLMChain, Conversation Chain, ReAct Agent, and Conversational Agent',
                default: false,
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const apiKey = (0, utils_1.getCredentialParam)('googleGenerativeAPIKey', credentialData, nodeData);
        const temperature = nodeData.inputs?.temperature;
        const modelName = nodeData.inputs?.modelName;
        const maxOutputTokens = nodeData.inputs?.maxOutputTokens;
        const topP = nodeData.inputs?.topP;
        const topK = nodeData.inputs?.topK;
        const harmCategory = nodeData.inputs?.harmCategory;
        const harmBlockThreshold = nodeData.inputs?.harmBlockThreshold;
        const cache = nodeData.inputs?.cache;
        const streaming = nodeData.inputs?.streaming;
        const allowImageUploads = nodeData.inputs?.allowImageUploads;
        const obj = {
            apiKey: apiKey,
            modelName: modelName,
            streaming: streaming ?? true
        };
        if (maxOutputTokens)
            obj.maxOutputTokens = parseInt(maxOutputTokens, 10);
        if (topP)
            obj.topP = parseFloat(topP);
        if (topK)
            obj.topK = parseFloat(topK);
        if (cache)
            obj.cache = cache;
        if (temperature)
            obj.temperature = parseFloat(temperature);
        // Safety Settings
        let harmCategories = (0, utils_1.convertMultiOptionsToStringArray)(harmCategory);
        let harmBlockThresholds = (0, utils_1.convertMultiOptionsToStringArray)(harmBlockThreshold);
        if (harmCategories.length != harmBlockThresholds.length)
            throw new Error(`Harm Category & Harm Block Threshold are not the same length`);
        const safetySettings = harmCategories.map((harmCategory, index) => {
            return {
                category: harmCategory,
                threshold: harmBlockThresholds[index]
            };
        });
        if (safetySettings.length > 0)
            obj.safetySettings = safetySettings;
        const multiModalOption = {
            image: {
                allowImageUploads: allowImageUploads ?? false
            }
        };
        const model = new FlowiseChatGoogleGenerativeAI_1.ChatGoogleGenerativeAI(nodeData.id, obj);
        model.setMultiModalOption(multiModalOption);
        return model;
    }
}
module.exports = { nodeClass: GoogleGenerativeAI_ChatModels };
//# sourceMappingURL=ChatGoogleGenerativeAI.js.map