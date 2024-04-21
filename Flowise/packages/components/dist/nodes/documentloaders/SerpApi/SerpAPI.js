"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serpapi_1 = require("langchain/document_loaders/web/serpapi");
const src_1 = require("../../../src");
class SerpAPI_DocumentLoaders {
    constructor() {
        this.label = 'SerpApi For Web Search';
        this.name = 'serpApi';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'serp.svg';
        this.category = 'Document Loaders';
        this.description = 'Load and process data from web search results';
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: false,
            credentialNames: ['serpApi']
        };
        this.inputs = [
            {
                label: 'Query',
                name: 'query',
                type: 'string'
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
    }
    async init(nodeData, _, options) {
        const textSplitter = nodeData.inputs?.textSplitter;
        const query = nodeData.inputs?.query;
        const metadata = nodeData.inputs?.metadata;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const serpApiKey = (0, src_1.getCredentialParam)('serpApiKey', credentialData, nodeData);
        const loader = new serpapi_1.SerpAPILoader({ q: query, apiKey: serpApiKey });
        const docs = textSplitter ? await loader.loadAndSplit() : await loader.load();
        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata);
            return docs.map((doc) => {
                return {
                    ...doc,
                    metadata: {
                        ...doc.metadata,
                        ...parsedMetadata
                    }
                };
            });
        }
        return docs;
    }
}
module.exports = { nodeClass: SerpAPI_DocumentLoaders };
//# sourceMappingURL=SerpAPI.js.map