"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("langchain/document_loaders/web/github");
const src_1 = require("../../../src");
class Github_DocumentLoaders {
    constructor() {
        this.label = 'Github';
        this.name = 'github';
        this.version = 2.0;
        this.type = 'Document';
        this.icon = 'github.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from a GitHub repository`;
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Only needed when accessing private repo',
            optional: true,
            credentialNames: ['githubApi']
        };
        this.inputs = [
            {
                label: 'Repo Link',
                name: 'repoLink',
                type: 'string',
                placeholder: 'https://github.com/FlowiseAI/Flowise'
            },
            {
                label: 'Branch',
                name: 'branch',
                type: 'string',
                default: 'main'
            },
            {
                label: 'Recursive',
                name: 'recursive',
                type: 'boolean',
                optional: true
            },
            {
                label: 'Max Concurrency',
                name: 'maxConcurrency',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Ignore Paths',
                name: 'ignorePath',
                description: 'An array of paths to be ignored',
                placeholder: `["*.md"]`,
                type: 'string',
                rows: 4,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Retries',
                name: 'maxRetries',
                description: 'The maximum number of retries that can be made for a single call, with an exponential backoff between each attempt. Defaults to 2.',
                type: 'number',
                step: 1,
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
        const repoLink = nodeData.inputs?.repoLink;
        const branch = nodeData.inputs?.branch;
        const recursive = nodeData.inputs?.recursive;
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        const maxConcurrency = nodeData.inputs?.maxConcurrency;
        const maxRetries = nodeData.inputs?.maxRetries;
        const ignorePath = nodeData.inputs?.ignorePath;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const accessToken = (0, src_1.getCredentialParam)('accessToken', credentialData, nodeData);
        const githubOptions = {
            branch,
            recursive,
            unknown: 'warn'
        };
        if (accessToken)
            githubOptions.accessToken = accessToken;
        if (maxConcurrency)
            githubOptions.maxConcurrency = parseInt(maxConcurrency, 10);
        if (maxRetries)
            githubOptions.maxRetries = parseInt(maxRetries, 10);
        if (ignorePath)
            githubOptions.ignorePaths = JSON.parse(ignorePath);
        const loader = new github_1.GithubRepoLoader(repoLink, githubOptions);
        const docs = textSplitter ? await loader.loadAndSplit(textSplitter) : await loader.load();
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
module.exports = { nodeClass: Github_DocumentLoaders };
//# sourceMappingURL=Github.js.map