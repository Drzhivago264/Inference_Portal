"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const tools_1 = require("@langchain/core/tools");
const tools_2 = require("@langchain/core/tools");
const utils_1 = require("../../../src/utils");
const agents_1 = require("../../../src/agents");
class Retriever_Tools {
    constructor() {
        this.label = 'Retriever Tool';
        this.name = 'retrieverTool';
        this.version = 2.0;
        this.type = 'RetrieverTool';
        this.icon = 'retrievertool.svg';
        this.category = 'Tools';
        this.description = 'Use a retriever as allowed tool for agent';
        this.baseClasses = [this.type, 'DynamicTool', ...(0, utils_1.getBaseClasses)(tools_2.DynamicTool)];
        this.inputs = [
            {
                label: 'Retriever Name',
                name: 'name',
                type: 'string',
                placeholder: 'search_state_of_union'
            },
            {
                label: 'Retriever Description',
                name: 'description',
                type: 'string',
                description: 'When should agent uses to retrieve documents',
                rows: 3,
                placeholder: 'Searches and returns documents regarding the state-of-the-union.'
            },
            {
                label: 'Retriever',
                name: 'retriever',
                type: 'BaseRetriever'
            },
            {
                label: 'Return Source Documents',
                name: 'returnSourceDocuments',
                type: 'boolean',
                optional: true
            }
        ];
    }
    async init(nodeData) {
        const name = nodeData.inputs?.name;
        const description = nodeData.inputs?.description;
        const retriever = nodeData.inputs?.retriever;
        const returnSourceDocuments = nodeData.inputs?.returnSourceDocuments;
        const input = {
            name,
            description
        };
        const func = async ({ input }, runManager) => {
            const docs = await retriever.getRelevantDocuments(input, runManager?.getChild('retriever'));
            const content = docs.map((doc) => doc.pageContent).join('\n\n');
            const sourceDocuments = JSON.stringify(docs);
            return returnSourceDocuments ? content + agents_1.SOURCE_DOCUMENTS_PREFIX + sourceDocuments : content;
        };
        const schema = zod_1.z.object({
            input: zod_1.z.string().describe('query to look up in retriever')
        });
        const tool = new tools_1.DynamicStructuredTool({ ...input, func, schema });
        return tool;
    }
}
module.exports = { nodeClass: Retriever_Tools };
//# sourceMappingURL=RetrieverTool.js.map