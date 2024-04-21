"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIModerationRunner = void 0;
const chains_1 = require("langchain/chains");
class OpenAIModerationRunner {
    constructor(openAIApiKey) {
        this.openAIApiKey = '';
        this.moderationErrorMessage = "Text was found that violates OpenAI's content policy.";
        this.openAIApiKey = openAIApiKey;
    }
    async checkForViolations(input) {
        if (!this.openAIApiKey) {
            throw Error('OpenAI API key not found');
        }
        // Create a new instance of the OpenAIModerationChain
        const moderation = new chains_1.OpenAIModerationChain({
            openAIApiKey: this.openAIApiKey,
            throwError: false // If set to true, the call will throw an error when the moderation chain detects violating content. If set to false, violating content will return "Text was found that violates OpenAI's content policy.".
        });
        // Send the user's input to the moderation chain and wait for the result
        const { output: moderationOutput, results } = await moderation.call({
            input: input
        });
        if (results[0].flagged) {
            throw Error(this.moderationErrorMessage);
        }
        return moderationOutput;
    }
    setErrorMessage(message) {
        this.moderationErrorMessage = message;
    }
}
exports.OpenAIModerationRunner = OpenAIModerationRunner;
//# sourceMappingURL=OpenAIModerationRunner.js.map