"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groq_1 = require("@langchain/groq");
const utils_1 = require("../../../src/utils");
class Groq_ChatModels {
    constructor() {
        this.label = 'GroqChat';
        this.name = 'groqChat';
        this.version = 2.0;
        this.type = 'GroqChat';
        this.icon = 'groq.png';
        this.category = 'Chat Models';
        this.description = 'Wrapper around Groq API with LPU Inference Engine';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(groq_1.ChatGroq)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['groqApi'],
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
                placeholder: 'mixtral-8x7b-32768'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const modelName = nodeData.inputs?.modelName;
        const cache = nodeData.inputs?.cache;
        const temperature = nodeData.inputs?.temperature;
        const streaming = nodeData.inputs?.streaming;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const groqApiKey = (0, utils_1.getCredentialParam)('groqApiKey', credentialData, nodeData);
        const obj = {
            modelName,
            temperature: parseFloat(temperature),
            apiKey: groqApiKey,
            streaming: streaming ?? true
        };
        if (cache)
            obj.cache = cache;
        const model = new groq_1.ChatGroq(obj);
        return model;
    }
}
module.exports = { nodeClass: Groq_ChatModels };
//# sourceMappingURL=Groq.js.map