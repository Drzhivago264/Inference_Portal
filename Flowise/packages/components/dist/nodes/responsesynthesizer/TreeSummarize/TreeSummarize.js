"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class TreeSummarize_LlamaIndex {
    constructor() {
        this.label = 'TreeSummarize';
        this.name = 'treeSummarizeLlamaIndex';
        this.version = 1.0;
        this.type = 'TreeSummarize';
        this.icon = 'treesummarize.svg';
        this.category = 'Response Synthesizer';
        this.description =
            'Given a set of text chunks and the query, recursively construct a tree and return the root node as the response. Good for summarization purposes.';
        this.baseClasses = [this.type, 'ResponseSynthesizer'];
        this.tags = ['LlamaIndex'];
        this.inputs = [
            {
                label: 'Prompt',
                name: 'prompt',
                type: 'string',
                rows: 4,
                default: `Context information from multiple sources is below.
---------------------
{context}
---------------------
Given the information from multiple sources and not prior knowledge, answer the query.
Query: {query}
Answer:`,
                warning: `Prompt can contains no variables, or up to 2 variables. Variables must be {context} and {query}`,
                optional: true
            }
        ];
    }
    async init(nodeData) {
        const prompt = nodeData.inputs?.prompt;
        const textQAPromptTemplate = ({ context = '', query = '' }) => prompt.replace('{context}', context).replace('{query}', query);
        return new base_1.ResponseSynthesizerClass({ textQAPromptTemplate, type: 'TreeSummarize' });
    }
}
module.exports = { nodeClass: TreeSummarize_LlamaIndex };
//# sourceMappingURL=TreeSummarize.js.map