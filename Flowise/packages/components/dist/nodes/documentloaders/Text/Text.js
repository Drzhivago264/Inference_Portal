"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = require("langchain/document_loaders/fs/text");
const src_1 = require("../../../src");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Text_DocumentLoaders {
    constructor() {
        this.label = 'Text File';
        this.name = 'textFile';
        this.version = 3.0;
        this.type = 'Document';
        this.icon = 'Txt.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from text files`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Txt File',
                name: 'txtFile',
                type: 'file',
                fileType: '.txt, .html, .aspx, .asp, .cpp, .c, .cs, .css, .go, .h, .java, .js, .less, .ts, .php, .proto, .python, .py, .rst, .ruby, .rb, .rs, .scala, .sc, .scss, .sol, .sql, .swift, .markdown, .md, .tex, .ltx, .vb, .xml'
            },
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Metadata',
                name: 'metadata',
                type: 'json',
                optional: true,
                additionalParams: true
            }
        ];
        this.outputs = [
            {
                label: 'Document',
                name: 'document',
                description: 'Array of document objects containing metadata and pageContent',
                baseClasses: [...this.baseClasses, 'json']
            },
            {
                label: 'Text',
                name: 'text',
                description: 'Concatenated string from pageContent of documents',
                baseClasses: ['string', 'json']
            }
        ];
    }
    async init(nodeData, _, options) {
        const textSplitter = nodeData.inputs?.textSplitter;
        const txtFileBase64 = nodeData.inputs?.txtFile;
        const metadata = nodeData.inputs?.metadata;
        const output = nodeData.outputs?.output;
        let alldocs = [];
        let files = [];
        //FILE-STORAGE::["CONTRIBUTING.md","LICENSE.md","README.md"]
        if (txtFileBase64.startsWith('FILE-STORAGE::')) {
            const fileName = txtFileBase64.replace('FILE-STORAGE::', '');
            if (fileName.startsWith('[') && fileName.endsWith(']')) {
                files = JSON.parse(fileName);
            }
            else {
                files = [fileName];
            }
            const chatflowid = options.chatflowid;
            for (const file of files) {
                const fileInStorage = path_1.default.join((0, src_1.getStoragePath)(), chatflowid, file);
                const fileData = fs_1.default.readFileSync(fileInStorage);
                const blob = new Blob([fileData]);
                const loader = new text_1.TextLoader(blob);
                if (textSplitter) {
                    const docs = await loader.loadAndSplit(textSplitter);
                    alldocs.push(...docs);
                }
                else {
                    const docs = await loader.load();
                    alldocs.push(...docs);
                }
            }
        }
        else {
            if (txtFileBase64.startsWith('[') && txtFileBase64.endsWith(']')) {
                files = JSON.parse(txtFileBase64);
            }
            else {
                files = [txtFileBase64];
            }
            for (const file of files) {
                const splitDataURI = file.split(',');
                splitDataURI.pop();
                const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
                const blob = new Blob([bf]);
                const loader = new text_1.TextLoader(blob);
                if (textSplitter) {
                    const docs = await loader.loadAndSplit(textSplitter);
                    alldocs.push(...docs);
                }
                else {
                    const docs = await loader.load();
                    alldocs.push(...docs);
                }
            }
        }
        let finaldocs = [];
        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata);
            for (const doc of alldocs) {
                const newdoc = {
                    ...doc,
                    metadata: {
                        ...doc.metadata,
                        ...parsedMetadata
                    }
                };
                finaldocs.push(newdoc);
            }
        }
        else {
            finaldocs = alldocs;
        }
        if (output === 'document') {
            return finaldocs;
        }
        else {
            let finaltext = '';
            for (const doc of finaldocs) {
                finaltext += `${doc.pageContent}\n`;
            }
            return (0, src_1.handleEscapeCharacters)(finaltext, false);
        }
    }
}
module.exports = { nodeClass: Text_DocumentLoaders };
//# sourceMappingURL=Text.js.map