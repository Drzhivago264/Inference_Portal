"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../../src/Interface");
const utils_1 = require("../../../src/utils");
class PromptTemplate_Prompts {
    constructor() {
        this.label = 'Prompt Template';
        this.name = 'promptTemplate';
        this.version = 1.0;
        this.type = 'PromptTemplate';
        this.icon = 'prompt.svg';
        this.category = 'Prompts';
        this.description = 'Schema to represent a basic prompt for an LLM';
        this.baseClasses = [...(0, utils_1.getBaseClasses)(Interface_1.PromptTemplate)];
        this.inputs = [
            {
                label: 'Template',
                name: 'template',
                type: 'string',
                rows: 4,
                placeholder: `What is a good name for a company that makes {product}?`
            },
            {
                label: 'Format Prompt Values',
                name: 'promptValues',
                type: 'json',
                optional: true,
                acceptVariable: true,
                list: true
            }
        ];
    }
    async init(nodeData) {
        const template = nodeData.inputs?.template;
        const promptValuesStr = nodeData.inputs?.promptValues;
        let promptValues = {};
        if (promptValuesStr) {
            try {
                promptValues = typeof promptValuesStr === 'object' ? promptValuesStr : JSON.parse(promptValuesStr);
            }
            catch (exception) {
                throw new Error("Invalid JSON in the PromptTemplate's promptValues: " + exception);
            }
        }
        const inputVariables = (0, utils_1.getInputVariables)(template);
        try {
            const options = {
                template,
                inputVariables
            };
            const prompt = new Interface_1.PromptTemplate(options);
            prompt.promptValues = promptValues;
            return prompt;
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = { nodeClass: PromptTemplate_Prompts };
//# sourceMappingURL=PromptTemplate.js.map