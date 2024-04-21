"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedrockChat = void 0;
const bedrock_1 = require("@langchain/community/chat_models/bedrock");
class BedrockChat extends bedrock_1.BedrockChat {
    constructor(id, fields) {
        super(fields);
        this.id = id;
        this.configuredModel = fields?.model || '';
        this.configuredMaxToken = fields?.maxTokens;
    }
    revertToOriginalModel() {
        super.model = this.configuredModel;
        super.maxTokens = this.configuredMaxToken;
    }
    setMultiModalOption(multiModalOption) {
        this.multiModalOption = multiModalOption;
    }
    setVisionModel() {
        if (!this.model.startsWith('claude-3')) {
            super.model = 'anthropic.claude-3-haiku-20240307-v1:0';
            super.maxTokens = this.configuredMaxToken ? this.configuredMaxToken : 1024;
        }
    }
}
exports.BedrockChat = BedrockChat;
//# sourceMappingURL=FlowiseAWSChatBedrock.js.map