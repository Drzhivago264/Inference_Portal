"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notionapi_1 = require("langchain/document_loaders/web/notionapi");
const src_1 = require("../../../src");
class NotionPage_DocumentLoaders {
    constructor() {
        this.label = 'Notion Page';
        this.name = 'notionPage';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'notion-page.svg';
        this.category = 'Document Loaders';
        this.description = 'Load data from Notion Page (including child pages all as separate documents)';
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
                label: 'Notion Page Id',
                name: 'pageId',
                type: 'string',
                description: 'The last The 32 char hex in the url path. For example: https://www.notion.so/skarard/LangChain-Notion-API-b34ca03f219c4420a6046fc4bdfdf7b4, b34ca03f219c4420a6046fc4bdfdf7b4 is the Page ID'
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
        const pageId = nodeData.inputs?.pageId;
        const metadata = nodeData.inputs?.metadata;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const notionIntegrationToken = (0, src_1.getCredentialParam)('notionIntegrationToken', credentialData, nodeData);
        const obj = {
            clientOptions: {
                auth: notionIntegrationToken
            },
            id: pageId,
            type: 'page'
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
module.exports = { nodeClass: NotionPage_DocumentLoaders };
//# sourceMappingURL=NotionPage.js.map