"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moderation_1 = require("../Moderation");
const OpenAIModerationRunner_1 = require("./OpenAIModerationRunner");
const src_1 = require("../../../src");
class OpenAIModeration {
    constructor() {
        this.label = 'OpenAI Moderation';
        this.name = 'inputModerationOpenAI';
        this.version = 1.0;
        this.type = 'Moderation';
        this.icon = 'openai.svg';
        this.category = 'Moderation';
        this.description = 'Check whether content complies with OpenAI usage policies.';
        this.baseClasses = [this.type, ...(0, src_1.getBaseClasses)(Moderation_1.Moderation)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['openAIApi']
        };
        this.inputs = [
            {
                label: 'Error Message',
                name: 'moderationErrorMessage',
                type: 'string',
                rows: 2,
                default: "Cannot Process! Input violates OpenAI's content moderation policies.",
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const openAIApiKey = (0, src_1.getCredentialParam)('openAIApiKey', credentialData, nodeData);
        const runner = new OpenAIModerationRunner_1.OpenAIModerationRunner(openAIApiKey);
        const moderationErrorMessage = nodeData.inputs?.moderationErrorMessage;
        if (moderationErrorMessage)
            runner.setErrorMessage(moderationErrorMessage);
        return runner;
    }
}
module.exports = { nodeClass: OpenAIModeration };
//# sourceMappingURL=OpenAIModeration.js.map