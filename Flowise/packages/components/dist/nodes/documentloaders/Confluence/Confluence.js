"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const confluence_1 = require("langchain/document_loaders/web/confluence");
const src_1 = require("../../../src");
class Confluence_DocumentLoaders {
    constructor() {
        this.label = 'Confluence';
        this.name = 'confluence';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'confluence.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from a Confluence Document`;
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['confluenceCloudApi', 'confluenceServerDCApi']
        };
        this.inputs = [
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                placeholder: 'https://example.atlassian.net/wiki'
            },
            {
                label: 'Space Key',
                name: 'spaceKey',
                type: 'string',
                placeholder: '~EXAMPLE362906de5d343d49dcdbae5dEXAMPLE',
                description: 'Refer to <a target="_blank" href="https://community.atlassian.com/t5/Confluence-questions/How-to-find-the-key-for-a-space/qaq-p/864760">official guide</a> on how to get Confluence Space Key'
            },
            {
                label: 'Limit',
                name: 'limit',
                type: 'number',
                default: 0,
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
        const spaceKey = nodeData.inputs?.spaceKey;
        const baseUrl = nodeData.inputs?.baseUrl;
        const limit = nodeData.inputs?.limit;
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const accessToken = (0, src_1.getCredentialParam)('accessToken', credentialData, nodeData);
        const personalAccessToken = (0, src_1.getCredentialParam)('personalAccessToken', credentialData, nodeData);
        const username = (0, src_1.getCredentialParam)('username', credentialData, nodeData);
        let confluenceOptions = {
            baseUrl,
            spaceKey,
            limit
        };
        if (accessToken) {
            // Confluence Cloud credentials
            confluenceOptions.username = username;
            confluenceOptions.accessToken = accessToken;
        }
        else if (personalAccessToken) {
            // Confluence Server/Data Center credentials
            confluenceOptions.personalAccessToken = personalAccessToken;
        }
        const loader = new confluence_1.ConfluencePagesLoader(confluenceOptions);
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
module.exports = { nodeClass: Confluence_DocumentLoaders };
//# sourceMappingURL=Confluence.js.map