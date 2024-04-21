"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const text_splitter_1 = require("langchain/text_splitter");
const node_html_markdown_1 = require("node-html-markdown");
class HtmlToMarkdownTextSplitter_TextSplitters {
    constructor() {
        this.label = 'HtmlToMarkdown Text Splitter';
        this.name = 'htmlToMarkdownTextSplitter';
        this.version = 1.0;
        this.type = 'HtmlToMarkdownTextSplitter';
        this.icon = 'htmlToMarkdownTextSplitter.svg';
        this.category = 'Text Splitters';
        this.description = `Converts Html to Markdown and then split your content into documents based on the Markdown headers`;
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(HtmlToMarkdownTextSplitter)];
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
        const splitter = new HtmlToMarkdownTextSplitter(obj);
        return splitter;
    }
}
class HtmlToMarkdownTextSplitter extends text_splitter_1.MarkdownTextSplitter {
    constructor(fields) {
        {
            super(fields);
        }
    }
    splitText(text) {
        return new Promise((resolve) => {
            const markdown = node_html_markdown_1.NodeHtmlMarkdown.translate(text);
            super.splitText(markdown).then((result) => {
                resolve(result);
            });
        });
    }
}
module.exports = { nodeClass: HtmlToMarkdownTextSplitter_TextSplitters };
//# sourceMappingURL=HtmlToMarkdownTextSplitter.js.map