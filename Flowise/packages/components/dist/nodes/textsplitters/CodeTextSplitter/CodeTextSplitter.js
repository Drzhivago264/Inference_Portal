"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const text_splitter_1 = require("langchain/text_splitter");
class CodeTextSplitter_TextSplitters {
    constructor() {
        this.label = 'Code Text Splitter';
        this.name = 'codeTextSplitter';
        this.version = 1.0;
        this.type = 'CodeTextSplitter';
        this.icon = 'codeTextSplitter.svg';
        this.category = 'Text Splitters';
        this.description = `Split documents based on language-specific syntax`;
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(text_splitter_1.RecursiveCharacterTextSplitter)];
        this.inputs = [
            {
                label: 'Language',
                name: 'language',
                type: 'options',
                options: [
                    {
                        label: 'cpp',
                        name: 'cpp'
                    },
                    {
                        label: 'go',
                        name: 'go'
                    },
                    {
                        label: 'java',
                        name: 'java'
                    },
                    {
                        label: 'js',
                        name: 'js'
                    },
                    {
                        label: 'php',
                        name: 'php'
                    },
                    {
                        label: 'proto',
                        name: 'proto'
                    },
                    {
                        label: 'python',
                        name: 'python'
                    },
                    {
                        label: 'rst',
                        name: 'rst'
                    },
                    {
                        label: 'ruby',
                        name: 'ruby'
                    },
                    {
                        label: 'rust',
                        name: 'rust'
                    },
                    {
                        label: 'scala',
                        name: 'scala'
                    },
                    {
                        label: 'swift',
                        name: 'swift'
                    },
                    {
                        label: 'markdown',
                        name: 'markdown'
                    },
                    {
                        label: 'latex',
                        name: 'latex'
                    },
                    {
                        label: 'html',
                        name: 'html'
                    },
                    {
                        label: 'sol',
                        name: 'sol'
                    }
                ]
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
        const chunkSize = nodeData.inputs?.chunkSize;
        const chunkOverlap = nodeData.inputs?.chunkOverlap;
        const language = nodeData.inputs?.language;
        const obj = {};
        if (chunkSize)
            obj.chunkSize = parseInt(chunkSize, 10);
        if (chunkOverlap)
            obj.chunkOverlap = parseInt(chunkOverlap, 10);
        const splitter = text_splitter_1.RecursiveCharacterTextSplitter.fromLanguage(language, obj);
        return splitter;
    }
}
module.exports = { nodeClass: CodeTextSplitter_TextSplitters };
//# sourceMappingURL=CodeTextSplitter.js.map