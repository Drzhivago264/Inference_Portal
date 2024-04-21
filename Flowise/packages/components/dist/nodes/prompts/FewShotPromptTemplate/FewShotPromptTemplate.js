"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const prompts_1 = require("@langchain/core/prompts");
class FewShotPromptTemplate_Prompts {
    constructor() {
        this.label = 'Few Shot Prompt Template';
        this.name = 'fewShotPromptTemplate';
        this.version = 1.0;
        this.type = 'FewShotPromptTemplate';
        this.icon = 'prompt.svg';
        this.category = 'Prompts';
        this.description = 'Prompt template you can build with examples';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(prompts_1.FewShotPromptTemplate)];
        this.inputs = [
            {
                label: 'Examples',
                name: 'examples',
                type: 'string',
                rows: 4,
                placeholder: `[
  { "word": "happy", "antonym": "sad" },
  { "word": "tall", "antonym": "short" },
]`
            },
            {
                label: 'Example Prompt',
                name: 'examplePrompt',
                type: 'PromptTemplate'
            },
            {
                label: 'Prefix',
                name: 'prefix',
                type: 'string',
                rows: 4,
                placeholder: `Give the antonym of every input`
            },
            {
                label: 'Suffix',
                name: 'suffix',
                type: 'string',
                rows: 4,
                placeholder: `Word: {input}\nAntonym:`
            },
            {
                label: 'Example Separator',
                name: 'exampleSeparator',
                type: 'string',
                placeholder: `\n\n`
            },
            {
                label: 'Template Format',
                name: 'templateFormat',
                type: 'options',
                options: [
                    {
                        label: 'f-string',
                        name: 'f-string'
                    },
                    {
                        label: 'jinja-2',
                        name: 'jinja-2'
                    }
                ],
                default: `f-string`
            }
        ];
    }
    async init(nodeData) {
        const examplesStr = nodeData.inputs?.examples;
        const prefix = nodeData.inputs?.prefix;
        const suffix = nodeData.inputs?.suffix;
        const exampleSeparator = nodeData.inputs?.exampleSeparator;
        const templateFormat = nodeData.inputs?.templateFormat;
        const examplePrompt = nodeData.inputs?.examplePrompt;
        const inputVariables = (0, utils_1.getInputVariables)(suffix);
        let examples = [];
        if (examplesStr) {
            try {
                examples = typeof examplesStr === 'object' ? examplesStr : JSON.parse(examplesStr);
            }
            catch (exception) {
                throw new Error("Invalid JSON in the FewShotPromptTemplate's examples: " + exception);
            }
        }
        try {
            const obj = {
                examples,
                examplePrompt,
                prefix,
                suffix,
                inputVariables,
                exampleSeparator,
                templateFormat
            };
            const prompt = new prompts_1.FewShotPromptTemplate(obj);
            return prompt;
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = { nodeClass: FewShotPromptTemplate_Prompts };
//# sourceMappingURL=FewShotPromptTemplate.js.map