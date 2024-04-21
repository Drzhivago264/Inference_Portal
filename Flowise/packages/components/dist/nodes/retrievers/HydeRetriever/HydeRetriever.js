"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@langchain/core/prompts");
const hyde_1 = require("langchain/retrievers/hyde");
const utils_1 = require("../../../src/utils");
class HydeRetriever_Retrievers {
    constructor() {
        this.label = 'HyDE Retriever';
        this.name = 'HydeRetriever';
        this.version = 3.0;
        this.type = 'HydeRetriever';
        this.icon = 'hyderetriever.svg';
        this.category = 'Retrievers';
        this.description = 'Use HyDE retriever to retrieve from a vector store';
        this.baseClasses = [this.type, 'BaseRetriever'];
        this.inputs = [
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
            },
            {
                label: 'Vector Store',
                name: 'vectorStore',
                type: 'VectorStore'
            },
            {
                label: 'Query',
                name: 'query',
                type: 'string',
                description: 'Query to retrieve documents from retriever. If not specified, user question will be used',
                optional: true,
                acceptVariable: true
            },
            {
                label: 'Select Defined Prompt',
                name: 'promptKey',
                description: 'Select a pre-defined prompt',
                type: 'options',
                options: [
                    {
                        label: 'websearch',
                        name: 'websearch',
                        description: `Please write a passage to answer the question
Question: {question}
Passage:`
                    },
                    {
                        label: 'scifact',
                        name: 'scifact',
                        description: `Please write a scientific paper passage to support/refute the claim
Claim: {question}
Passage:`
                    },
                    {
                        label: 'arguana',
                        name: 'arguana',
                        description: `Please write a counter argument for the passage
Passage: {question}
Counter Argument:`
                    },
                    {
                        label: 'trec-covid',
                        name: 'trec-covid',
                        description: `Please write a scientific paper passage to answer the question
Question: {question}
Passage:`
                    },
                    {
                        label: 'fiqa',
                        name: 'fiqa',
                        description: `Please write a financial article passage to answer the question
Question: {question}
Passage:`
                    },
                    {
                        label: 'dbpedia-entity',
                        name: 'dbpedia-entity',
                        description: `Please write a passage to answer the question.
Question: {question}
Passage:`
                    },
                    {
                        label: 'trec-news',
                        name: 'trec-news',
                        description: `Please write a news passage about the topic.
Topic: {question}
Passage:`
                    },
                    {
                        label: 'mr-tydi',
                        name: 'mr-tydi',
                        description: `Please write a passage in Swahili/Korean/Japanese/Bengali to answer the question in detail.
Question: {question}
Passage:`
                    }
                ],
                default: 'websearch'
            },
            {
                label: 'Custom Prompt',
                name: 'customPrompt',
                description: 'If custom prompt is used, this will override Defined Prompt',
                placeholder: 'Please write a passage to answer the question\nQuestion: {question}\nPassage:',
                type: 'string',
                rows: 4,
                additionalParams: true,
                optional: true
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                default: 4,
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'HyDE Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Document',
                name: 'document',
                description: 'Array of document objects containing metadata and pageContent',
                baseClasses: ['Document', 'json']
            },
            {
                label: 'Text',
                name: 'text',
                description: 'Concatenated string from pageContent of documents',
                baseClasses: ['string', 'json']
            }
        ];
    }
    async init(nodeData, input) {
        const llm = nodeData.inputs?.model;
        const vectorStore = nodeData.inputs?.vectorStore;
        const promptKey = nodeData.inputs?.promptKey;
        const customPrompt = nodeData.inputs?.customPrompt;
        const query = nodeData.inputs?.query;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const output = nodeData.outputs?.output;
        const obj = {
            llm,
            vectorStore,
            k
        };
        if (customPrompt)
            obj.promptTemplate = prompts_1.PromptTemplate.fromTemplate(customPrompt);
        else if (promptKey)
            obj.promptTemplate = promptKey;
        const retriever = new hyde_1.HydeRetriever(obj);
        if (output === 'retriever')
            return retriever;
        else if (output === 'document')
            return await retriever.getRelevantDocuments(query ? query : input);
        else if (output === 'text') {
            let finaltext = '';
            const docs = await retriever.getRelevantDocuments(query ? query : input);
            for (const doc of docs)
                finaltext += `${doc.pageContent}\n`;
            return (0, utils_1.handleEscapeCharacters)(finaltext, false);
        }
        return retriever;
    }
}
module.exports = { nodeClass: HydeRetriever_Retrievers };
//# sourceMappingURL=HydeRetriever.js.map