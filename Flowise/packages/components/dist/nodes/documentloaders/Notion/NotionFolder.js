"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notion_1 = require("langchain/document_loaders/fs/notion");
class NotionFolder_DocumentLoaders {
    constructor() {
        this.label = 'Notion Folder';
        this.name = 'notionFolder';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'notion-folder.svg';
        this.category = 'Document Loaders';
        this.description = 'Load data from the exported and unzipped Notion folder';
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Notion Folder',
                name: 'notionFolder',
                type: 'string',
                description: 'Get folder path',
                placeholder: 'Paste folder path'
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
        const textSplitter = nodeData.inputs?.textSplitter;
        const notionFolder = nodeData.inputs?.notionFolder;
        const metadata = nodeData.inputs?.metadata;
        const loader = new notion_1.NotionLoader(notionFolder);
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
module.exports = { nodeClass: NotionFolder_DocumentLoaders };
//# sourceMappingURL=NotionFolder.js.map