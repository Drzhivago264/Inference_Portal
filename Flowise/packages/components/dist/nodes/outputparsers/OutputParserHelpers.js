"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectOutputParser = exports.formatResponse = exports.CATEGORY = void 0;
const prompts_1 = require("@langchain/core/prompts");
exports.CATEGORY = 'Output Parsers';
const formatResponse = (response) => {
    if (typeof response === 'object') {
        return { json: response };
    }
    return response;
};
exports.formatResponse = formatResponse;
const injectOutputParser = (outputParser, chain, promptValues = undefined) => {
    if (outputParser && chain.prompt) {
        const formatInstructions = outputParser.getFormatInstructions();
        if (chain.prompt instanceof prompts_1.PromptTemplate) {
            let pt = chain.prompt;
            pt.template = pt.template + '\n{format_instructions}';
            chain.prompt.partialVariables = { format_instructions: formatInstructions };
        }
        else if (chain.prompt instanceof prompts_1.ChatPromptTemplate) {
            let pt = chain.prompt;
            pt.promptMessages.forEach((msg) => {
                if (msg instanceof prompts_1.SystemMessagePromptTemplate) {
                    ;
                    msg.prompt.partialVariables = { format_instructions: outputParser.getFormatInstructions() };
                    msg.prompt.template = (msg.prompt.template + '\n{format_instructions}');
                }
            });
        }
        else if (chain.prompt instanceof prompts_1.FewShotPromptTemplate) {
            chain.prompt.examplePrompt.partialVariables = { format_instructions: formatInstructions };
            chain.prompt.examplePrompt.template = chain.prompt.examplePrompt.template + '\n{format_instructions}';
        }
        chain.prompt.inputVariables.push('format_instructions');
        if (promptValues) {
            promptValues = { ...promptValues, format_instructions: outputParser.getFormatInstructions() };
        }
    }
    return promptValues;
};
exports.injectOutputParser = injectOutputParser;
//# sourceMappingURL=OutputParserHelpers.js.map