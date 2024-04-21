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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const src_1 = require("../../../src");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Pdf_DocumentLoaders {
    constructor() {
        this.label = 'Pdf File';
        this.name = 'pdfFile';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'pdf.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from PDF files`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Pdf File',
                name: 'pdfFile',
                type: 'file',
                fileType: '.pdf'
            },
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Usage',
                name: 'usage',
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
                default: 'perPage'
            },
            {
                label: 'Use Legacy Build',
                name: 'legacyBuild',
                type: 'boolean',
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
    async init(nodeData, _, options) {
        const textSplitter = nodeData.inputs?.textSplitter;
        const pdfFileBase64 = nodeData.inputs?.pdfFile;
        const usage = nodeData.inputs?.usage;
        const metadata = nodeData.inputs?.metadata;
        const legacyBuild = nodeData.inputs?.legacyBuild;
        let alldocs = [];
        let files = [];
        //FILE-STORAGE::["CONTRIBUTING.md","LICENSE.md","README.md"]
        if (pdfFileBase64.startsWith('FILE-STORAGE::')) {
            const fileName = pdfFileBase64.replace('FILE-STORAGE::', '');
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
                const bf = Buffer.from(fileData);
                await this.extractDocs(usage, bf, legacyBuild, textSplitter, alldocs);
            }
        }
        else {
            if (pdfFileBase64.startsWith('[') && pdfFileBase64.endsWith(']')) {
                files = JSON.parse(pdfFileBase64);
            }
            else {
                files = [pdfFileBase64];
            }
            for (const file of files) {
                const splitDataURI = file.split(',');
                splitDataURI.pop();
                const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
                await this.extractDocs(usage, bf, legacyBuild, textSplitter, alldocs);
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
    async extractDocs(usage, bf, legacyBuild, textSplitter, alldocs) {
        if (usage === 'perFile') {
            const loader = new pdf_1.PDFLoader(new Blob([bf]), {
                splitPages: false,
                pdfjs: () => 
                // @ts-ignore
                legacyBuild ? Promise.resolve().then(() => __importStar(require('pdfjs-dist/legacy/build/pdf.js'))) : Promise.resolve().then(() => __importStar(require('pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js')))
            });
            if (textSplitter) {
                const docs = await loader.loadAndSplit(textSplitter);
                alldocs.push(...docs);
            }
            else {
                const docs = await loader.load();
                alldocs.push(...docs);
            }
        }
        else {
            const loader = new pdf_1.PDFLoader(new Blob([bf]), {
                pdfjs: () => 
                // @ts-ignore
                legacyBuild ? Promise.resolve().then(() => __importStar(require('pdfjs-dist/legacy/build/pdf.js'))) : Promise.resolve().then(() => __importStar(require('pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js')))
            });
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
}
module.exports = { nodeClass: Pdf_DocumentLoaders };
//# sourceMappingURL=Pdf.js.map