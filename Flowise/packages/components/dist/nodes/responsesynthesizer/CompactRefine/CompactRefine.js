"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class CompactRefine_LlamaIndex {
    constructor() {
        this.label = 'Compact and Refine';
        this.name = 'compactrefineLlamaIndex';
        this.version = 1.0;
        this.type = 'CompactRefine';
        this.icon = 'compactrefine.svg';
        this.category = 'Response Synthesizer';
        this.description =
            'CompactRefine is a slight variation of Refine that first compacts the text chunks into the smallest possible number of chunks.';
        this.baseClasses = [this.type, 'ResponseSynthesizer'];
        this.tags = ['LlamaIndex'];
        this.inputs = [
            {
                label: 'Refine Prompt',
                name: 'refinePrompt',
                type: 'string',
                rows: 4,
                default: `The original query is as follows: {query}
We have provided an existing answer: {existingAnswer}
We have the opportunity to refine the existing answer (only if needed) with some more context below.
------------
{context}
------------
Given the new context, refine the original answer to better answer the query. If the context isn't useful, return the original answer.
Refined Answer:`,
                warning: `Prompt can contains no variables, or up to 3 variables. Variables must be {existingAnswer}, {context} and {query}`,
                optional: true
            },
            {
                label: 'Text QA Prompt',
                name: 'textQAPrompt',
                type: 'string',
                rows: 4,
                default: `Context information is below.
---------------------
{context}
---------------------
Given the context information and not prior knowledge, answer the query.
Query: {query}
Answer:`,
                warning: `Prompt can contains no variables, or up to 2 variables. Variables must be {context} and {query}`,
                optional: true
            }
        ];
    }
    async init(nodeData) {
        const refinePrompt = nodeData.inputs?.refinePrompt;
        const textQAPrompt = nodeData.inputs?.textQAPrompt;
        const refinePromptTemplate = ({ context = '', existingAnswer = '', query = '' }) => refinePrompt.replace('{existingAnswer}', existingAnswer).replace('{context}', context).replace('{query}', query);
        const textQAPromptTemplate = ({ context = '', query = '' }) => textQAPrompt.replace('{context}', context).replace('{query}', query);
        return new base_1.ResponseSynthesizerClass({ textQAPromptTemplate, refinePromptTemplate, type: 'CompactAndRefine' });
    }
}
module.exports = { nodeClass: CompactRefine_LlamaIndex };
//# sourceMappingURL=CompactRefine.js.map