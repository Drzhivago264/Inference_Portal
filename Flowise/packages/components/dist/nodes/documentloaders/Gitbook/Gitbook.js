"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitbook_1 = require("langchain/document_loaders/web/gitbook");
class Gitbook_DocumentLoaders {
    constructor() {
        this.label = 'GitBook';
        this.name = 'gitbook';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'gitbook.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from GitBook`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Web Path',
                name: 'webPath',
                type: 'string',
                placeholder: 'https://docs.gitbook.com/product-tour/navigation',
                description: 'If want to load all paths from the GitBook provide only root path e.g.https://docs.gitbook.com/ '
            },
            {
                label: 'Should Load All Paths',
                name: 'shouldLoadAllPaths',
                type: 'boolean',
                description: 'Load from all paths in a given GitBook',
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
    async init(nodeData) {
        const webPath = nodeData.inputs?.webPath;
        const shouldLoadAllPaths = nodeData.inputs?.shouldLoadAllPaths;
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        const loader = shouldLoadAllPaths ? new gitbook_1.GitbookLoader(webPath, { shouldLoadAllPaths }) : new gitbook_1.GitbookLoader(webPath);
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
module.exports = {
    nodeClass: Gitbook_DocumentLoaders
};
//# sourceMappingURL=Gitbook.js.map