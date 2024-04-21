"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
class VectorStoreToDocument_DocumentLoaders {
    constructor() {
        this.label = 'VectorStore To Document';
        this.name = 'vectorStoreToDocument';
        this.version = 2.0;
        this.type = 'Document';
        this.icon = 'vectorretriever.svg';
        this.category = 'Document Loaders';
        this.description = 'Search documents with scores from vector store';
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Vector Store',
                name: 'vectorStore',
                type: 'VectorStore'
            },
            {
                label: 'Query',
                name: 'query',
                type: 'string',
                description: 'Query to retrieve documents from vector database. If not specified, user question will be used',
                optional: true,
                acceptVariable: true
            },
            {
                label: 'Minimum Score (%)',
                name: 'minScore',
                type: 'number',
                optional: true,
                placeholder: '75',
                step: 1,
                description: 'Minumum score for embeddings documents to be included'
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
    async init(nodeData, input) {
        const vectorStore = nodeData.inputs?.vectorStore;
        const minScore = nodeData.inputs?.minScore;
        const query = nodeData.inputs?.query;
        const output = nodeData.outputs?.output;
        const topK = vectorStore?.k ?? 4;
        const docs = await vectorStore.similaritySearchWithScore(query ?? input, topK);
        // eslint-disable-next-line no-console
        console.log('\x1b[94m\x1b[1m\n*****VectorStore Documents*****\n\x1b[0m\x1b[0m');
        // eslint-disable-next-line no-console
        console.log(docs);
        if (output === 'document') {
            let finaldocs = [];
            for (const doc of docs) {
                if (minScore && doc[1] < minScore / 100)
                    continue;
                finaldocs.push(doc[0]);
            }
            return finaldocs;
        }
        else {
            let finaltext = '';
            for (const doc of docs) {
                if (minScore && doc[1] < minScore / 100)
                    continue;
                finaltext += `${doc[0].pageContent}\n`;
            }
            return (0, utils_1.handleEscapeCharacters)(finaltext, false);
        }
    }
}
module.exports = { nodeClass: VectorStoreToDocument_DocumentLoaders };
//# sourceMappingURL=VectorStoreToDocument.js.map