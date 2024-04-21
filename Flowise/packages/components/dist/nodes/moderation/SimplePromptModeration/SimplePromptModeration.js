"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
const Moderation_1 = require("../Moderation");
const SimplePromptModerationRunner_1 = require("./SimplePromptModerationRunner");
class SimplePromptModeration {
    constructor() {
        this.label = 'Simple Prompt Moderation';
        this.name = 'inputModerationSimple';
        this.version = 2.0;
        this.type = 'Moderation';
        this.icon = 'moderation.svg';
        this.category = 'Moderation';
        this.description = 'Check whether input consists of any text from Deny list, and prevent being sent to LLM';
        this.baseClasses = [this.type, ...(0, src_1.getBaseClasses)(Moderation_1.Moderation)];
        this.inputs = [
            {
                label: 'Deny List',
                name: 'denyList',
                type: 'string',
                rows: 4,
                placeholder: `ignore previous instructions\ndo not follow the directions\nyou must ignore all previous instructions`,
                description: 'An array of string literals (enter one per line) that should not appear in the prompt text.'
            },
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel',
                description: 'Use LLM to detect if the input is similar to those specified in Deny List',
                optional: true
            },
            {
                label: 'Error Message',
                name: 'moderationErrorMessage',
                type: 'string',
                rows: 2,
                default: 'Cannot Process! Input violates content moderation policies.',
                optional: true
            }
        ];
    }
    async init(nodeData) {
        const denyList = nodeData.inputs?.denyList;
        const model = nodeData.inputs?.model;
        const moderationErrorMessage = nodeData.inputs?.moderationErrorMessage;
        return new SimplePromptModerationRunner_1.SimplePromptModerationRunner(denyList, moderationErrorMessage, model);
    }
}
module.exports = { nodeClass: SimplePromptModeration };
//# sourceMappingURL=SimplePromptModeration.js.map