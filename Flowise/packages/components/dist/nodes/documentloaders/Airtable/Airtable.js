"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const documents_1 = require("@langchain/core/documents");
const base_1 = require("langchain/document_loaders/base");
const utils_1 = require("../../../src/utils");
class Airtable_DocumentLoaders {
    constructor() {
        this.label = 'Airtable';
        this.name = 'airtable';
        this.version = 3.0;
        this.type = 'Document';
        this.icon = 'airtable.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from Airtable table`;
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['airtableApi']
        };
        this.inputs = [
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Base Id',
                name: 'baseId',
                type: 'string',
                placeholder: 'app11RobdGoX0YNsC',
                description: 'If your table URL looks like: https://airtable.com/app11RobdGoX0YNsC/tblJdmvbrgizbYICO/viw9UrP77Id0CE4ee, app11RovdGoX0YNsC is the base id'
            },
            {
                label: 'Table Id',
                name: 'tableId',
                type: 'string',
                placeholder: 'tblJdmvbrgizbYICO',
                description: 'If your table URL looks like: https://airtable.com/app11RobdGoX0YNsC/tblJdmvbrgizbYICO/viw9UrP77Id0CE4ee, tblJdmvbrgizbYICO is the table id'
            },
            {
                label: 'View Id',
                name: 'viewId',
                type: 'string',
                placeholder: 'viw9UrP77Id0CE4ee',
                description: 'If your view URL looks like: https://airtable.com/app11RobdGoX0YNsC/tblJdmvbrgizbYICO/viw9UrP77Id0CE4ee, viw9UrP77Id0CE4ee is the view id',
                optional: true
            },
            {
                label: 'Include Only Fields',
                name: 'fields',
                type: 'string',
                placeholder: 'Name, Assignee, fld1u0qUz0SoOQ9Gg, fldew39v6LBN5CjUl',
                optional: true,
                additionalParams: true,
                description: 'Comma-separated list of field names or IDs to include. If empty, then ALL fields are used. Use field IDs if field names contain commas.'
            },
            {
                label: 'Return All',
                name: 'returnAll',
                type: 'boolean',
                optional: true,
                default: true,
                additionalParams: true,
                description: 'If all results should be returned or only up to a given limit'
            },
            {
                label: 'Limit',
                name: 'limit',
                type: 'number',
                optional: true,
                default: 100,
                additionalParams: true,
                description: 'Number of results to return. Ignored when Return All is enabled.'
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
        const baseId = nodeData.inputs?.baseId;
        const tableId = nodeData.inputs?.tableId;
        const viewId = nodeData.inputs?.viewId;
        const fieldsInput = nodeData.inputs?.fields;
        const fields = fieldsInput ? fieldsInput.split(',').map((field) => field.trim()) : [];
        const returnAll = nodeData.inputs?.returnAll;
        const limit = nodeData.inputs?.limit;
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const accessToken = (0, utils_1.getCredentialParam)('accessToken', credentialData, nodeData);
        const airtableOptions = {
            baseId,
            tableId,
            viewId,
            fields,
            returnAll,
            accessToken,
            limit: limit ? parseInt(limit, 10) : 100
        };
        const loader = new AirtableLoader(airtableOptions);
        if (!baseId || !tableId) {
            throw new Error('Base ID and Table ID must be provided.');
        }
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
class AirtableLoader extends base_1.BaseDocumentLoader {
    constructor({ baseId, tableId, viewId, fields = [], accessToken, limit = 100, returnAll = false }) {
        super();
        this.baseId = baseId;
        this.tableId = tableId;
        this.viewId = viewId;
        this.fields = fields;
        this.accessToken = accessToken;
        this.limit = limit;
        this.returnAll = returnAll;
    }
    async load() {
        if (this.returnAll) {
            return this.loadAll();
        }
        return this.loadLimit();
    }
    async fetchAirtableData(url, data) {
        try {
            const headers = {
                Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            };
            const response = await axios_1.default.post(url, data, { headers });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Failed to fetch ${url} from Airtable: ${error.message}, status: ${error.response?.status}`);
            }
            else {
                throw new Error(`Failed to fetch ${url} from Airtable: ${error}`);
            }
        }
    }
    createDocumentFromPage(page) {
        // Generate the URL
        const pageUrl = `https://api.airtable.com/v0/${this.baseId}/${this.tableId}/${page.id}`;
        // Return a langchain document
        return new documents_1.Document({
            pageContent: JSON.stringify(page.fields, null, 2),
            metadata: {
                url: pageUrl
            }
        });
    }
    async loadLimit() {
        let data = {
            maxRecords: this.limit,
            view: this.viewId
        };
        if (this.fields.length > 0) {
            data.fields = this.fields;
        }
        let response;
        let returnPages = [];
        // Paginate if the user specifies a limit > 100 (like 200) but not return all.
        do {
            response = await this.fetchAirtableData(`https://api.airtable.com/v0/${this.baseId}/${this.tableId}/listRecords`, data);
            returnPages.push(...response.records);
            data.offset = response.offset;
            // Stop if we have fetched enough records
            if (returnPages.length >= this.limit)
                break;
        } while (response.offset !== undefined);
        // Truncate array to the limit if necessary
        if (returnPages.length > this.limit) {
            returnPages.length = this.limit;
        }
        return returnPages.map((page) => this.createDocumentFromPage(page));
    }
    async loadAll() {
        let data = {
            view: this.viewId
        };
        if (this.fields.length > 0) {
            data.fields = this.fields;
        }
        let response;
        let returnPages = [];
        do {
            response = await this.fetchAirtableData(`https://api.airtable.com/v0/${this.baseId}/${this.tableId}/listRecords`, data);
            returnPages.push(...response.records);
            data.offset = response.offset;
        } while (response.offset !== undefined);
        return returnPages.map((page) => this.createDocumentFromPage(page));
    }
}
module.exports = {
    nodeClass: Airtable_DocumentLoaders
};
//# sourceMappingURL=Airtable.js.map