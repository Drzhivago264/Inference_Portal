"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = require("langchain/document_loaders/fs/text");
const directory_1 = require("langchain/document_loaders/fs/directory");
const json_1 = require("langchain/document_loaders/fs/json");
const csv_1 = require("langchain/document_loaders/fs/csv");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const docx_1 = require("langchain/document_loaders/fs/docx");
class Folder_DocumentLoaders {
    constructor() {
        this.label = 'Folder with Files';
        this.name = 'folderFiles';
        this.version = 2.0;
        this.type = 'Document';
        this.icon = 'folder.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from folder with multiple files`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Folder Path',
                name: 'folderPath',
                type: 'string',
                placeholder: ''
            },
            {
                label: 'Recursive',
                name: 'recursive',
                type: 'boolean',
                additionalParams: false
            },
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Pdf Usage',
                name: 'pdfUsage',
                type: 'options',
                options: [
                    {
                        label: 'One document per page',
                        name: 'perPage'
                    },
                    {
                        label: 'One document per file',
                        name: 'perFile'
                    }
                ],
                default: 'perPage',
                optional: true,
                additionalParams: true
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
        const folderPath = nodeData.inputs?.folderPath;
        const metadata = nodeData.inputs?.metadata;
        const recursive = nodeData.inputs?.recursive;
        const pdfUsage = nodeData.inputs?.pdfUsage;
        const loader = new directory_1.DirectoryLoader(folderPath, {
            '.json': (path) => new json_1.JSONLoader(path),
            '.txt': (path) => new text_1.TextLoader(path),
            '.csv': (path) => new csv_1.CSVLoader(path),
            '.docx': (path) => new docx_1.DocxLoader(path),
            '.pdf': (path) => pdfUsage === 'perFile'
                ? // @ts-ignore
                    new pdf_1.PDFLoader(path, { splitPages: false, pdfjs: () => Promise.resolve().then(() => __importStar(require('pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js'))) })
                : // @ts-ignore
                    new pdf_1.PDFLoader(path, { pdfjs: () => Promise.resolve().then(() => __importStar(require('pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js'))) }),
            '.aspx': (path) => new text_1.TextLoader(path),
            '.asp': (path) => new text_1.TextLoader(path),
            '.cpp': (path) => new text_1.TextLoader(path),
            '.c': (path) => new text_1.TextLoader(path),
            '.cs': (path) => new text_1.TextLoader(path),
            '.css': (path) => new text_1.TextLoader(path),
            '.go': (path) => new text_1.TextLoader(path),
            '.h': (path) => new text_1.TextLoader(path),
            '.kt': (path) => new text_1.TextLoader(path),
            '.java': (path) => new text_1.TextLoader(path),
            '.js': (path) => new text_1.TextLoader(path),
            '.less': (path) => new text_1.TextLoader(path),
            '.ts': (path) => new text_1.TextLoader(path),
            '.php': (path) => new text_1.TextLoader(path),
            '.proto': (path) => new text_1.TextLoader(path),
            '.python': (path) => new text_1.TextLoader(path),
            '.py': (path) => new text_1.TextLoader(path),
            '.rst': (path) => new text_1.TextLoader(path),
            '.ruby': (path) => new text_1.TextLoader(path),
            '.rb': (path) => new text_1.TextLoader(path),
            '.rs': (path) => new text_1.TextLoader(path),
            '.scala': (path) => new text_1.TextLoader(path),
            '.sc': (path) => new text_1.TextLoader(path),
            '.scss': (path) => new text_1.TextLoader(path),
            '.sol': (path) => new text_1.TextLoader(path),
            '.sql': (path) => new text_1.TextLoader(path),
            '.swift': (path) => new text_1.TextLoader(path),
            '.markdown': (path) => new text_1.TextLoader(path),
            '.md': (path) => new text_1.TextLoader(path),
            '.tex': (path) => new text_1.TextLoader(path),
            '.ltx': (path) => new text_1.TextLoader(path),
            '.html': (path) => new text_1.TextLoader(path),
            '.vb': (path) => new text_1.TextLoader(path),
            '.xml': (path) => new text_1.TextLoader(path) // XML
        }, recursive);
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
module.exports = { nodeClass: Folder_DocumentLoaders };
//# sourceMappingURL=Folder.js.map