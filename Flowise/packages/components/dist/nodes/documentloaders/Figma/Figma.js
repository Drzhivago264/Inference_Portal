"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
const figma_1 = require("langchain/document_loaders/web/figma");
class Figma_DocumentLoaders {
    constructor() {
        this.label = 'Figma';
        this.name = 'figma';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'figma.svg';
        this.category = 'Document Loaders';
        this.description = 'Load data from a Figma file';
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['figmaApi']
        };
        this.inputs = [
            {
                label: 'File Key',
                name: 'fileKey',
                type: 'string',
                placeholder: 'key',
                description: 'The file key can be read from any Figma file URL: https://www.figma.com/file/:key/:title. For example, in https://www.figma.com/file/12345/Website, the file key is 12345'
            },
            {
                label: 'Node IDs',
                name: 'nodeIds',
                type: 'string',
                placeholder: '0, 1, 2',
                description: 'A list of Node IDs, seperated by comma. Refer to <a target="_blank" href="https://www.figma.com/community/plugin/758276196886757462/Node-Inspector">official guide</a> on how to get Node IDs'
            },
            {
                label: 'Recursive',
                name: 'recursive',
                type: 'boolean',
                optional: true
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
        const nodeIds = nodeData.inputs?.nodeIds?.trim().split(',') || [];
        const fileKey = nodeData.inputs?.fileKey;
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const accessToken = (0, src_1.getCredentialParam)('accessToken', credentialData, nodeData);
        const figmaOptions = {
            accessToken,
            nodeIds,
            fileKey
        };
        const loader = new figma_1.FigmaFileLoader(figmaOptions);
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
module.exports = { nodeClass: Figma_DocumentLoaders };
//# sourceMappingURL=Figma.js.map