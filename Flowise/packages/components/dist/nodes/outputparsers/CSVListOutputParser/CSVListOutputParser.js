"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_parsers_1 = require("@langchain/core/output_parsers");
const src_1 = require("../../../src");
const OutputParserHelpers_1 = require("../OutputParserHelpers");
class CSVListOutputParser {
    constructor() {
        this.label = 'CSV Output Parser';
        this.name = 'csvOutputParser';
        this.version = 1.0;
        this.type = 'CSVListOutputParser';
        this.description = 'Parse the output of an LLM call as a comma-separated list of values';
        this.icon = 'csv.svg';
        this.category = OutputParserHelpers_1.CATEGORY;
        this.baseClasses = [this.type, ...(0, src_1.getBaseClasses)(output_parsers_1.BaseOutputParser)];
        this.inputs = [
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
        const autoFix = nodeData.inputs?.autofixParser;
        const commaSeparatedListOutputParser = new output_parsers_1.CommaSeparatedListOutputParser();
        Object.defineProperty(commaSeparatedListOutputParser, 'autoFix', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: autoFix
        });
        return commaSeparatedListOutputParser;
    }
}
module.exports = { nodeClass: CSVListOutputParser };
//# sourceMappingURL=CSVListOutputParser.js.map