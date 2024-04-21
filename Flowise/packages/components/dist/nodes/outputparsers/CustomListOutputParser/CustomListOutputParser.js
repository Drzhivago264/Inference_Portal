"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_parsers_1 = require("@langchain/core/output_parsers");
const OutputParserHelpers_1 = require("../OutputParserHelpers");
const src_1 = require("../../../src");
class CustomListOutputParser {
    constructor() {
        this.label = 'Custom List Output Parser';
        this.name = 'customListOutputParser';
        this.version = 1.0;
        this.type = 'CustomListOutputParser';
        this.description = 'Parse the output of an LLM call as a list of values.';
        this.icon = 'list.svg';
        this.category = OutputParserHelpers_1.CATEGORY;
        this.baseClasses = [this.type, ...(0, src_1.getBaseClasses)(output_parsers_1.BaseOutputParser)];
        this.inputs = [
            {
                label: 'Length',
                name: 'length',
                type: 'number',
                step: 1,
                description: 'Number of values to return',
                optional: true
            },
            {
                label: 'Separator',
                name: 'separator',
                type: 'string',
                description: 'Separator between values',
                default: ',',
                optional: true
            },
            {
                label: 'Autofix',
                name: 'autofixParser',
                type: 'boolean',
                optional: true,
                description: 'In the event that the first call fails, will make another call to the model to fix any errors.'
            }
        ];
    }
    async init(nodeData) {
        const separator = nodeData.inputs?.separator;
        const lengthStr = nodeData.inputs?.length;
        const autoFix = nodeData.inputs?.autofixParser;
        const parser = new output_parsers_1.CustomListOutputParser({
            length: lengthStr ? parseInt(lengthStr, 10) : undefined,
            separator: separator
        });
        Object.defineProperty(parser, 'autoFix', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: autoFix
        });
        return parser;
    }
}
module.exports = { nodeClass: CustomListOutputParser };
//# sourceMappingURL=CustomListOutputParser.js.map