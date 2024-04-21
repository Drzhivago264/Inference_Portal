"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchapi_1 = require("langchain/document_loaders/web/searchapi");
const src_1 = require("../../../src");
// Provides access to multiple search engines using the SearchApi.
// For available parameters & engines, refer to: https://www.searchapi.io/docs/google
class SearchAPI_DocumentLoaders {
    constructor() {
        this.label = 'SearchApi For Web Search';
        this.name = 'searchApi';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'searchapi.svg';
        this.category = 'Document Loaders';
        this.description = 'Load data from real-time search results';
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: false,
            credentialNames: ['searchApi']
        };
        this.inputs = [
            {
                label: 'Query',
                name: 'query',
                type: 'string',
                optional: true
            },
            {
                label: 'Custom Parameters',
                name: 'customParameters',
                type: 'json',
                optional: true,
                additionalParams: true
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
        const customParameters = nodeData.inputs?.customParameters;
        const metadata = nodeData.inputs?.metadata;
        // Fetch the API credentials for this node
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const searchApiKey = (0, src_1.getCredentialParam)('searchApiKey', credentialData, nodeData);
        // Check and parse custom parameters (should be JSON or object)
        const parsedParameters = typeof customParameters === 'object' ? customParameters : JSON.parse(customParameters || '{}');
        // Prepare the configuration for the SearchApiLoader
        const loaderConfig = {
            q: query,
            apiKey: searchApiKey,
            ...parsedParameters
        };
        // Initialize the loader with the given configuration
        const loader = new searchapi_1.SearchApiLoader(loaderConfig);
        // Fetch documents, split if a text splitter is provided
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
module.exports = { nodeClass: SearchAPI_DocumentLoaders };
//# sourceMappingURL=SearchAPI.js.map