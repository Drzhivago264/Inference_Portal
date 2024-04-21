"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAnthropic = void 0;
const anthropic_1 = require("@langchain/anthropic");
class ChatAnthropic extends anthropic_1.ChatAnthropic {
    constructor(id, fields) {
        super(fields);
        this.id = id;
        this.configuredModel = fields?.modelName || '';
        this.configuredMaxToken = fields?.maxTokens ?? 2048;
    }
    revertToOriginalModel() {
        super.modelName = this.configuredModel;
        super.maxTokens = this.configuredMaxToken;
    }
    setMultiModalOption(multiModalOption) {
        this.multiModalOption = multiModalOption;
    }
    setVisionModel() {
        if (!this.modelName.startsWith('claude-3')) {
            super.modelName = 'claude-3-haiku-20240307';
            super.maxTokens = this.configuredMaxToken ? this.configuredMaxToken : 2048;
        }
    }
}
exports.ChatAnthropic = ChatAnthropic;
//# sourceMappingURL=FlowiseChatAnthropic.js.map