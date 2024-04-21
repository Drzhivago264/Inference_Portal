"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const text_splitter_1 = require("langchain/text_splitter");
class MarkdownTextSplitter_TextSplitters {
    constructor() {
        this.label = 'Markdown Text Splitter';
        this.name = 'markdownTextSplitter';
        this.version = 1.0;
        this.type = 'MarkdownTextSplitter';
        this.icon = 'markdownTextSplitter.svg';
        this.category = 'Text Splitters';
        this.description = `Split your content into documents based on the Markdown headers`;
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(text_splitter_1.MarkdownTextSplitter)];
        this.inputs = [
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
        const chunkSize = nodeData.inputs?.chunkSize;
        const chunkOverlap = nodeData.inputs?.chunkOverlap;
        const obj = {};
        if (chunkSize)
            obj.chunkSize = parseInt(chunkSize, 10);
        if (chunkOverlap)
            obj.chunkOverlap = parseInt(chunkOverlap, 10);
        const splitter = new text_splitter_1.MarkdownTextSplitter(obj);
        return splitter;
    }
}
module.exports = { nodeClass: MarkdownTextSplitter_TextSplitters };
//# sourceMappingURL=MarkdownTextSplitter.js.map