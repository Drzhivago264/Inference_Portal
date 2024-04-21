"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const apify_dataset_1 = require("langchain/document_loaders/web/apify_dataset");
const documents_1 = require("@langchain/core/documents");
class ApifyWebsiteContentCrawler_DocumentLoaders {
    constructor() {
        this.label = 'Apify Website Content Crawler';
        this.name = 'apifyWebsiteContentCrawler';
        this.type = 'Document';
        this.icon = 'apify-symbol-transparent.svg';
        this.version = 2.0;
        this.category = 'Document Loaders';
        this.description = 'Load data from Apify Website Content Crawler';
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Start URLs',
                name: 'urls',
                type: 'string',
                description: 'One or more URLs of pages where the crawler will start, separated by commas.',
                placeholder: 'https://js.langchain.com/docs/'
            },
            {
                label: 'Crawler type',
                type: 'options',
                name: 'crawlerType',
                options: [
                    {
                        label: 'Headless web browser (Chrome+Playwright)',
                        name: 'playwright:chrome'
                    },
                    {
                        label: 'Stealthy web browser (Firefox+Playwright)',
                        name: 'playwright:firefox'
                    },
                    {
                        label: 'Raw HTTP client (Cheerio)',
                        name: 'cheerio'
                    },
                    {
                        label: 'Raw HTTP client with JavaScript execution (JSDOM) [experimental]',
                        name: 'jsdom'
                    }
                ],
                description: 'Select the crawling engine, see <a target="_blank" href="https://apify.com/apify/website-content-crawler#crawling">documentation</a> for additional information.',
                default: 'playwright:firefox'
            },
            {
                label: 'Max crawling depth',
                name: 'maxCrawlDepth',
                type: 'number',
                optional: true,
                default: 1,
                additionalParams: true
            },
            {
                label: 'Max crawl pages',
                name: 'maxCrawlPages',
                type: 'number',
                optional: true,
                default: 3,
                additionalParams: true
            },
            {
                label: 'Additional input',
                name: 'additionalInput',
                type: 'json',
                default: JSON.stringify({}),
                description: 'For additional input options for the crawler see <a target="_blank" href="https://apify.com/apify/website-content-crawler/input-schema">documentation</a>.',
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
        this.credential = {
            label: 'Connect Apify API',
            name: 'credential',
            type: 'credential',
            credentialNames: ['apifyApi']
        };
    }
    async init(nodeData, _, options) {
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        // Get input options and merge with additional input
        const urls = nodeData.inputs?.urls;
        const crawlerType = nodeData.inputs?.crawlerType;
        const maxCrawlDepth = nodeData.inputs?.maxCrawlDepth;
        const maxCrawlPages = nodeData.inputs?.maxCrawlPages;
        const additionalInput = typeof nodeData.inputs?.additionalInput === 'object'
            ? nodeData.inputs?.additionalInput
            : JSON.parse(nodeData.inputs?.additionalInput);
        const input = {
            startUrls: urls.split(',').map((url) => ({ url: url.trim() })),
            crawlerType,
            maxCrawlDepth: parseInt(maxCrawlDepth, 10),
            maxCrawlPages: parseInt(maxCrawlPages, 10),
            ...additionalInput
        };
        // Get Apify API token from credential data
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const apifyApiToken = (0, utils_1.getCredentialParam)('apifyApiToken', credentialData, nodeData);
        const loader = await apify_dataset_1.ApifyDatasetLoader.fromActorCall('apify/website-content-crawler', input, {
            datasetMappingFunction: (item) => new documents_1.Document({
                pageContent: (item.text || ''),
                metadata: { source: item.url }
            }),
            clientOptions: {
                token: apifyApiToken
            }
        });
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
module.exports = { nodeClass: ApifyWebsiteContentCrawler_DocumentLoaders };
//# sourceMappingURL=ApifyWebsiteContentCrawler.js.map