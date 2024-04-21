"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notionapi_1 = require("langchain/document_loaders/web/notionapi");
const src_1 = require("../../../src");
class NotionDB_DocumentLoaders {
    constructor() {
        this.label = 'Notion Database';
        this.name = 'notionDB';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'notion-db.svg';
        this.category = 'Document Loaders';
        this.description = 'Load data from Notion Database (each row is a separate document with all properties as metadata)';
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['notionApi']
        };
        this.inputs = [
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Notion Database Id',
                name: 'databaseId',
                type: 'string',
                description: 'If your URL looks like - https://www.notion.so/abcdefh?v=long_hash_2, then abcdefh is the database ID'
            },
            {
                label: 'Metadata',
                name: 'metadata',
                type: 'json',
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const textSplitter = nodeData.inputs?.textSplitter;
        const databaseId = nodeData.inputs?.databaseId;
        const metadata = nodeData.inputs?.metadata;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const notionIntegrationToken = (0, src_1.getCredentialParam)('notionIntegrationToken', credentialData, nodeData);
        const obj = {
            clientOptions: {
                auth: notionIntegrationToken
            },
            id: databaseId,
            callerOptions: {
                maxConcurrency: 64 // Default value
            },
            propertiesAsHeader: true,
            type: 'database'
        };
        const loader = new notionapi_1.NotionAPILoader(obj);
        let docs = [];
        if (textSplitter) {
            docs = await loader.loadAndSplit(textSplitter);
        }
        else {
            docs = await loader.load();
        }
        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata);
            let finaldocs = [];
            for (const doc of docs) {
                const newdoc = {
                    ...doc,
                    metadata: {
                        ...doc.metadata,
                        ...parsedMetadata
                    }
                };
                finaldocs.push(newdoc);
            }
            return finaldocs;
        }
        return docs;
    }
}
module.exports = { nodeClass: NotionDB_DocumentLoaders };
//# sourceMappingURL=NotionDB.js.map