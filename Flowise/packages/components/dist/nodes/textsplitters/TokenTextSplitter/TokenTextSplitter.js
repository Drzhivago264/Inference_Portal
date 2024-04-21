"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const text_splitter_1 = require("langchain/text_splitter");
class TokenTextSplitter_TextSplitters {
    constructor() {
        this.label = 'Token Text Splitter';
        this.name = 'tokenTextSplitter';
        this.version = 1.0;
        this.type = 'TokenTextSplitter';
        this.icon = 'tiktoken.svg';
        this.category = 'Text Splitters';
        this.description = `Splits a raw text string by first converting the text into BPE tokens, then split these tokens into chunks and convert the tokens within a single chunk back into text.`;
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(text_splitter_1.TokenTextSplitter)];
        this.inputs = [
            {
                label: 'Encoding Name',
                name: 'encodingName',
                type: 'options',
                options: [
                    {
                        label: 'gpt2',
                        name: 'gpt2'
                    },
                    {
                        label: 'r50k_base',
                        name: 'r50k_base'
                    },
                    {
                        label: 'p50k_base',
                        name: 'p50k_base'
                    },
                    {
                        label: 'p50k_edit',
                        name: 'p50k_edit'
                    },
                    {
                        label: 'cl100k_base',
                        name: 'cl100k_base'
                    }
                ],
                default: 'gpt2'
            },
            {
                label: 'Chunk Size',
                name: 'chunkSize',
                type: 'number',
                default: 1000,
                optional: true
            },
            {
                label: 'Chunk Overlap',
                name: 'chunkOverlap',
                type: 'number',
                optional: true
            }
        ];
    }
    async init(nodeData) {
        const encodingName = nodeData.inputs?.encodingName;
        const chunkSize = nodeData.inputs?.chunkSize;
        const chunkOverlap = nodeData.inputs?.chunkOverlap;
        const obj = {};
        obj.encodingName = encodingName;
        if (chunkSize)
            obj.chunkSize = parseInt(chunkSize, 10);
        if (chunkOverlap)
            obj.chunkOverlap = parseInt(chunkOverlap, 10);
        const splitter = new text_splitter_1.TokenTextSplitter(obj);
        return splitter;
    }
}
module.exports = { nodeClass: TokenTextSplitter_TextSplitters };
//# sourceMappingURL=TokenTextSplitter.js.map