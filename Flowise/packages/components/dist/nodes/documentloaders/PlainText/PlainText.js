"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documents_1 = require("@langchain/core/documents");
const src_1 = require("../../../src");
class PlainText_DocumentLoaders {
    constructor() {
        this.label = 'Plain Text';
        this.name = 'plainText';
        this.version = 2.0;
        this.type = 'Document';
        this.icon = 'plaintext.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from plain text`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Text',
                name: 'text',
                type: 'string',
                rows: 4,
                placeholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
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
    async init(nodeData) {
        const textSplitter = nodeData.inputs?.textSplitter;
        const text = nodeData.inputs?.text;
        const metadata = nodeData.inputs?.metadata;
        const output = nodeData.outputs?.output;
        let alldocs = [];
        if (textSplitter) {
            const docs = await textSplitter.createDocuments([text]);
            alldocs.push(...docs);
        }
        else {
            alldocs.push(new documents_1.Document({
                pageContent: text
            }));
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
module.exports = { nodeClass: PlainText_DocumentLoaders };
//# sourceMappingURL=PlainText.js.map