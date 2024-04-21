"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatOpenAI = void 0;
const openai_1 = require("@langchain/openai");
class ChatOpenAI extends openai_1.ChatOpenAI {
    constructor(id, fields, 
    /** @deprecated */
    configuration) {
        super(fields, configuration);
        this.id = id;
        this.configuredModel = fields?.modelName ?? '';
        this.configuredMaxToken = fields?.maxTokens;
    }
    revertToOriginalModel() {
        super.modelName = this.configuredModel;
        super.maxTokens = this.configuredMaxToken;
    }
    setMultiModalOption(multiModalOption) {
        this.multiModalOption = multiModalOption;
    }
    setVisionModel() {
        if (this.modelName !== 'gpt-4-turbo' && !this.modelName.includes('vision')) {
            super.modelName = 'gpt-4-turbo';
            super.maxTokens = this.configuredMaxToken ? this.configuredMaxToken : 1024;
        }
    }
}
exports.ChatOpenAI = ChatOpenAI;
//# sourceMappingURL=FlowiseChatOpenAI.js.map