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
const s3_1 = require("langchain/document_loaders/web/s3");
const unstructured_1 = require("langchain/document_loaders/fs/unstructured");
const utils_1 = require("../../../src/utils");
const client_s3_1 = require("@aws-sdk/client-s3");
const node_stream_1 = require("node:stream");
const fsDefault = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const os = __importStar(require("node:os"));
class S3_DocumentLoaders {
    constructor() {
        this.label = 'S3';
        this.name = 'S3';
        this.version = 2.0;
        this.type = 'Document';
        this.icon = 's3.svg';
        this.category = 'Document Loaders';
        this.description = 'Load Data from S3 Buckets';
        this.baseClasses = [this.type];
        this.credential = {
            label: 'AWS Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['awsApi']
        };
        this.inputs = [
            {
                label: 'Bucket',
                name: 'bucketName',
                type: 'string'
            },
            {
                label: 'Object Key',
                name: 'keyName',
                type: 'string',
                description: 'The object key (or key name) that uniquely identifies object in an Amazon S3 bucket',
                placeholder: 'AI-Paper.pdf'
            },
            {
                label: 'Region',
                name: 'region',
                type: 'options',
                options: [
                    { label: 'af-south-1', name: 'af-south-1' },
                    { label: 'ap-east-1', name: 'ap-east-1' },
                    { label: 'ap-northeast-1', name: 'ap-northeast-1' },
                    { label: 'ap-northeast-2', name: 'ap-northeast-2' },
                    { label: 'ap-northeast-3', name: 'ap-northeast-3' },
                    { label: 'ap-south-1', name: 'ap-south-1' },
                    { label: 'ap-south-2', name: 'ap-south-2' },
                    { label: 'ap-southeast-1', name: 'ap-southeast-1' },
                    { label: 'ap-southeast-2', name: 'ap-southeast-2' },
                    { label: 'ap-southeast-3', name: 'ap-southeast-3' },
                    { label: 'ap-southeast-4', name: 'ap-southeast-4' },
                    { label: 'ap-southeast-5', name: 'ap-southeast-5' },
                    { label: 'ap-southeast-6', name: 'ap-southeast-6' },
                    { label: 'ca-central-1', name: 'ca-central-1' },
                    { label: 'ca-west-1', name: 'ca-west-1' },
                    { label: 'cn-north-1', name: 'cn-north-1' },
                    { label: 'cn-northwest-1', name: 'cn-northwest-1' },
                    { label: 'eu-central-1', name: 'eu-central-1' },
                    { label: 'eu-central-2', name: 'eu-central-2' },
                    { label: 'eu-north-1', name: 'eu-north-1' },
                    { label: 'eu-south-1', name: 'eu-south-1' },
                    { label: 'eu-south-2', name: 'eu-south-2' },
                    { label: 'eu-west-1', name: 'eu-west-1' },
                    { label: 'eu-west-2', name: 'eu-west-2' },
                    { label: 'eu-west-3', name: 'eu-west-3' },
                    { label: 'il-central-1', name: 'il-central-1' },
                    { label: 'me-central-1', name: 'me-central-1' },
                    { label: 'me-south-1', name: 'me-south-1' },
                    { label: 'sa-east-1', name: 'sa-east-1' },
                    { label: 'us-east-1', name: 'us-east-1' },
                    { label: 'us-east-2', name: 'us-east-2' },
                    { label: 'us-gov-east-1', name: 'us-gov-east-1' },
                    { label: 'us-gov-west-1', name: 'us-gov-west-1' },
                    { label: 'us-west-1', name: 'us-west-1' },
                    { label: 'us-west-2', name: 'us-west-2' }
                ],
                default: 'us-east-1'
            },
            {
                label: 'Unstructured API URL',
                name: 'unstructuredAPIUrl',
                description: 'Your Unstructured.io URL. Read <a target="_blank" href="https://unstructured-io.github.io/unstructured/introduction.html#getting-started">more</a> on how to get started',
                type: 'string',
                default: 'http://localhost:8000/general/v0/general'
            },
            {
                label: 'Unstructured API KEY',
                name: 'unstructuredAPIKey',
                type: 'password',
                optional: true
            },
            {
                label: 'Element Type',
                name: 'elementType',
                description: 'Unstructured partition document into different types, select the types to return. If not selected, all types will be returned',
                type: 'multiOptions',
                options: [
                    {
                        label: 'FigureCaption',
                        name: 'FigureCaption'
                    },
                    {
                        label: 'NarrativeText',
                        name: 'NarrativeText'
                    },
                    {
                        label: 'ListItem',
                        name: 'ListItem'
                    },
                    {
                        label: 'Title',
                        name: 'Title'
                    },
                    {
                        label: 'Address',
                        name: 'Address'
                    },
                    {
                        label: 'Table',
                        name: 'Table'
                    },
                    {
                        label: 'PageBreak',
                        name: 'PageBreak'
                    },
                    {
                        label: 'Header',
                        name: 'Header'
                    },
                    {
                        label: 'Footer',
                        name: 'Footer'
                    },
                    {
                        label: 'UncategorizedText',
                        name: 'UncategorizedText'
                    },
                    {
                        label: 'Image',
                        name: 'Image'
                    },
                    {
                        label: 'Formula',
                        name: 'Formula'
                    }
                ],
                default: [],
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
        const bucketName = nodeData.inputs?.bucketName;
        const keyName = nodeData.inputs?.keyName;
        const region = nodeData.inputs?.region;
        const unstructuredAPIUrl = nodeData.inputs?.unstructuredAPIUrl;
        const unstructuredAPIKey = nodeData.inputs?.unstructuredAPIKey;
        const metadata = nodeData.inputs?.metadata;
        const elementType = nodeData.inputs?.elementType;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const accessKeyId = (0, utils_1.getCredentialParam)('awsKey', credentialData, nodeData);
        const secretAccessKey = (0, utils_1.getCredentialParam)('awsSecret', credentialData, nodeData);
        const loader = new s3_1.S3Loader({
            bucket: bucketName,
            key: keyName,
            s3Config: {
                region,
                credentials: {
                    accessKeyId,
                    secretAccessKey
                }
            },
            unstructuredAPIURL: unstructuredAPIUrl,
            unstructuredAPIKey: unstructuredAPIKey
        });
        const s3Config = {
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        };
        let elementTypes = [];
        if (elementType) {
            try {
                elementTypes = JSON.parse(elementType);
            }
            catch (e) {
                elementTypes = [];
            }
        }
        loader.load = async () => {
            const tempDir = fsDefault.mkdtempSync(path.join(os.tmpdir(), 's3fileloader-'));
            const filePath = path.join(tempDir, keyName);
            try {
                const s3Client = new client_s3_1.S3Client(s3Config);
                const getObjectCommand = new client_s3_1.GetObjectCommand({
                    Bucket: bucketName,
                    Key: keyName
                });
                const response = await s3Client.send(getObjectCommand);
                const objectData = await new Promise((resolve, reject) => {
                    const chunks = [];
                    if (response.Body instanceof node_stream_1.Readable) {
                        response.Body.on('data', (chunk) => chunks.push(chunk));
                        response.Body.on('end', () => resolve(Buffer.concat(chunks)));
                        response.Body.on('error', reject);
                    }
                    else {
                        reject(new Error('Response body is not a readable stream.'));
                    }
                });
                fsDefault.mkdirSync(path.dirname(filePath), { recursive: true });
                fsDefault.writeFileSync(filePath, objectData);
            }
            catch (e) {
                throw new Error(`Failed to download file ${keyName} from S3 bucket ${bucketName}: ${e.message}`);
            }
            try {
                const options = {
                    apiUrl: unstructuredAPIUrl,
                    apiKey: unstructuredAPIKey
                };
                const unstructuredLoader = new unstructured_1.UnstructuredLoader(filePath, options);
                const docs = await unstructuredLoader.load();
                fsDefault.rmdirSync(path.dirname(filePath), { recursive: true });
                return docs;
            }
            catch {
                fsDefault.rmdirSync(path.dirname(filePath), { recursive: true });
                throw new Error(`Failed to load file ${filePath} using unstructured loader.`);
            }
        };
        const docs = await loader.load();
        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata);
            const finaldocs = docs.map((doc) => {
                return {
                    ...doc,
                    metadata: {
                        ...doc.metadata,
                        ...parsedMetadata
                    }
                };
            });
            return elementTypes.length ? finaldocs.filter((doc) => elementTypes.includes(doc.metadata.category)) : finaldocs;
        }
        return elementTypes.length ? docs.filter((doc) => elementTypes.includes(doc.metadata.category)) : docs;
    }
}
module.exports = { nodeClass: S3_DocumentLoaders };
//# sourceMappingURL=S3File.js.map