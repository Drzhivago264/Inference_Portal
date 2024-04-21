"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("langchain/document_loaders/fs/json");
const src_1 = require("../../../src");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Jsonlines_DocumentLoaders {
    constructor() {
        this.label = 'Json Lines File';
        this.name = 'jsonlinesFile';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'jsonlines.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from JSON Lines files`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Jsonlines File',
                name: 'jsonlinesFile',
                type: 'file',
                fileType: '.jsonl'
            },
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Pointer Extraction',
                name: 'pointerName',
                type: 'string',
                placeholder: 'Enter pointer name',
                optional: false
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
        const jsonLinesFileBase64 = nodeData.inputs?.jsonlinesFile;
        const pointerName = nodeData.inputs?.pointerName;
        const metadata = nodeData.inputs?.metadata;
        let alldocs = [];
        let files = [];
        let pointer = '/' + pointerName.trim();
        //FILE-STORAGE::["CONTRIBUTING.md","LICENSE.md","README.md"]
        if (jsonLinesFileBase64.startsWith('FILE-STORAGE::')) {
            const fileName = jsonLinesFileBase64.replace('FILE-STORAGE::', '');
            if (fileName.startsWith('[') && fileName.endsWith(']')) {
                files = JSON.parse(fileName);
            }
            else {
                files = [fileName];
            }
            const chatflowid = options.chatflowid;
            for (const file of files) {
                const fileInStorage = path_1.default.join((0, src_1.getStoragePath)(), chatflowid, file);
                const fileData = fs_1.default.readFileSync(fileInStorage);
                const blob = new Blob([fileData]);
                const loader = new json_1.JSONLinesLoader(blob, pointer);
                if (textSplitter) {
                    const docs = await loader.loadAndSplit(textSplitter);
                    alldocs.push(...docs);
                }
                else {
                    const docs = await loader.load();
                    alldocs.push(...docs);
                }
            }
        }
        else {
            if (jsonLinesFileBase64.startsWith('[') && jsonLinesFileBase64.endsWith(']')) {
                files = JSON.parse(jsonLinesFileBase64);
            }
            else {
                files = [jsonLinesFileBase64];
            }
            for (const file of files) {
                const splitDataURI = file.split(',');
                splitDataURI.pop();
                const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
                const blob = new Blob([bf]);
                const loader = new json_1.JSONLinesLoader(blob, pointer);
                if (textSplitter) {
                    const docs = await loader.loadAndSplit(textSplitter);
                    alldocs.push(...docs);
                }
                else {
                    const docs = await loader.load();
                    alldocs.push(...docs);
                }
            }
        }
        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata);
            let finaldocs = [];
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
            return finaldocs;
        }
        return alldocs;
    }
}
module.exports = { nodeClass: Jsonlines_DocumentLoaders };
//# sourceMappingURL=Jsonlines.js.map