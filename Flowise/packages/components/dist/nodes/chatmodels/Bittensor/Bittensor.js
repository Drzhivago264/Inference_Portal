"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bittensor_1 = require("langchain/experimental/chat_models/bittensor");
const utils_1 = require("../../../src/utils");
class Bittensor_ChatModels {
    constructor() {
        this.label = 'NIBittensorChat';
        this.name = 'NIBittensorChatModel';
        this.version = 2.0;
        this.type = 'BittensorChat';
        this.icon = 'NIBittensor.svg';
        this.category = 'Chat Models';
        this.description = 'Wrapper around Bittensor subnet 1 large language models';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(bittensor_1.NIBittensorChatModel)];
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
            }
        ];
    }
    async init(nodeData, _) {
        const system_prompt = nodeData.inputs?.system_prompt;
        const cache = nodeData.inputs?.cache;
        const obj = {
            systemPrompt: system_prompt
        };
        if (cache)
            obj.cache = cache;
        const model = new bittensor_1.NIBittensorChatModel(obj);
        return model;
    }
}
module.exports = { nodeClass: Bittensor_ChatModels };
//# sourceMappingURL=Bittensor.js.map