"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bittensor_1 = require("langchain/experimental/llms/bittensor");
const utils_1 = require("../../../src/utils");
class Bittensor_LLMs {
    constructor() {
        this.label = 'NIBittensorLLM';
        this.name = 'NIBittensorLLM';
        this.version = 2.0;
        this.type = 'Bittensor';
        this.icon = 'NIBittensor.svg';
        this.category = 'LLMs';
        this.description = 'Wrapper around Bittensor subnet 1 large language models';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(bittensor_1.NIBittensorLLM)];
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'System prompt',
                name: 'system_prompt',
                type: 'string',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Top Responses',
                name: 'topResponses',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _) {
        const system_prompt = nodeData.inputs?.system_prompt;
        const topResponses = Number(nodeData.inputs?.topResponses);
        const cache = nodeData.inputs?.cache;
        const obj = {
            systemPrompt: system_prompt,
            topResponses: topResponses
        };
        if (cache)
            obj.cache = cache;
        const model = new bittensor_1.NIBittensorLLM(obj);
        return model;
    }
}
module.exports = { nodeClass: Bittensor_LLMs };
//# sourceMappingURL=Bittensor.js.map