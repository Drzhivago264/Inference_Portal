"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const utils_1 = require("../../../src/utils");
class ChatOpenAICustom_ChatModels {
    constructor() {
        this.label = 'ChatOpenAI Custom';
        this.name = 'chatOpenAICustom';
        this.version = 3.0;
        this.type = 'ChatOpenAI-Custom';
        this.icon = 'openai.svg';
        this.category = 'Chat Models';
        this.description = 'Custom/FineTuned model using OpenAI Chat compatible API';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(openai_1.ChatOpenAI)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['openAIApi'],
            optional: true
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
                type: 'string',
                placeholder: 'ft:gpt-3.5-turbo:my-org:custom_suffix:id'
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
                label: 'Max Tokens',
                name: 'maxTokens',
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
                label: 'Frequency Penalty',
                name: 'frequencyPenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Presence Penalty',
                name: 'presencePenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Timeout',
                name: 'timeout',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'BasePath',
                name: 'basepath',
                type: 'string',
                optional: true,
                additionalParams: true
            },
            {
                label: 'BaseOptions',
                name: 'baseOptions',
                type: 'json',
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const temperature = nodeData.inputs?.temperature;
        const modelName = nodeData.inputs?.modelName;
        const maxTokens = nodeData.inputs?.maxTokens;
        const topP = nodeData.inputs?.topP;
        const frequencyPenalty = nodeData.inputs?.frequencyPenalty;
        const presencePenalty = nodeData.inputs?.presencePenalty;
        const timeout = nodeData.inputs?.timeout;
        const streaming = nodeData.inputs?.streaming;
        const basePath = nodeData.inputs?.basepath;
        const baseOptions = nodeData.inputs?.baseOptions;
        const cache = nodeData.inputs?.cache;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const openAIApiKey = (0, utils_1.getCredentialParam)('openAIApiKey', credentialData, nodeData);
        const obj = {
            temperature: parseFloat(temperature),
            modelName,
            openAIApiKey,
            streaming: streaming ?? true
        };
        if (maxTokens)
            obj.maxTokens = parseInt(maxTokens, 10);
        if (topP)
            obj.topP = parseFloat(topP);
        if (frequencyPenalty)
            obj.frequencyPenalty = parseFloat(frequencyPenalty);
        if (presencePenalty)
            obj.presencePenalty = parseFloat(presencePenalty);
        if (timeout)
            obj.timeout = parseInt(timeout, 10);
        if (cache)
            obj.cache = cache;
        let parsedBaseOptions = undefined;
        if (baseOptions) {
            try {
                parsedBaseOptions = typeof baseOptions === 'object' ? baseOptions : JSON.parse(baseOptions);
            }
            catch (exception) {
                throw new Error("Invalid JSON in the ChatOpenAI's BaseOptions: " + exception);
            }
        }
        const model = new openai_1.ChatOpenAI(obj, {
            basePath,
            baseOptions: parsedBaseOptions
        });
        return model;
    }
}
module.exports = { nodeClass: ChatOpenAICustom_ChatModels };
//# sourceMappingURL=ChatOpenAICustom.js.map