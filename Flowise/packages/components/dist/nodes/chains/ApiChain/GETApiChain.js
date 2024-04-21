"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_RESPONSE_RAW_PROMPT_TEMPLATE = exports.API_URL_RAW_PROMPT_TEMPLATE = void 0;
const prompts_1 = require("@langchain/core/prompts");
const chains_1 = require("langchain/chains");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
exports.API_URL_RAW_PROMPT_TEMPLATE = `You are given the below API Documentation:
{api_docs}
Using this documentation, generate the full API url to call for answering the user question.
You should build the API url in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.

Question:{question}
API url:`;
exports.API_RESPONSE_RAW_PROMPT_TEMPLATE = 'Given this {api_response} response for {api_url}. use the given response to answer this {question}';
class GETApiChain_Chains {
    constructor() {
        this.label = 'GET API Chain';
        this.name = 'getApiChain';
        this.version = 1.0;
        this.type = 'GETApiChain';
        this.icon = 'get.svg';
        this.category = 'Chains';
        this.description = 'Chain to run queries against GET API';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(chains_1.APIChain)];
        this.inputs = [
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
            },
            {
                label: 'API Documentation',
                name: 'apiDocs',
                type: 'string',
                description: 'Description of how API works. Please refer to more <a target="_blank" href="https://github.com/langchain-ai/langchain/blob/master/libs/langchain/langchain/chains/api/open_meteo_docs.py">examples</a>',
                rows: 4
            },
            {
                label: 'Headers',
                name: 'headers',
                type: 'json',
                additionalParams: true,
                optional: true
            },
            {
                label: 'URL Prompt',
                name: 'urlPrompt',
                type: 'string',
                description: 'Prompt used to tell LLMs how to construct the URL. Must contains {api_docs} and {question}',
                default: exports.API_URL_RAW_PROMPT_TEMPLATE,
                rows: 4,
                additionalParams: true
            },
            {
                label: 'Answer Prompt',
                name: 'ansPrompt',
                type: 'string',
                description: 'Prompt used to tell LLMs how to return the API response. Must contains {api_response}, {api_url}, and {question}',
                default: exports.API_RESPONSE_RAW_PROMPT_TEMPLATE,
                rows: 4,
                additionalParams: true
            }
        ];
    }
    async init(nodeData) {
        const model = nodeData.inputs?.model;
        const apiDocs = nodeData.inputs?.apiDocs;
        const headers = nodeData.inputs?.headers;
        const urlPrompt = nodeData.inputs?.urlPrompt;
        const ansPrompt = nodeData.inputs?.ansPrompt;
        const chain = await getAPIChain(apiDocs, model, headers, urlPrompt, ansPrompt);
        return chain;
    }
    async run(nodeData, input, options) {
        const model = nodeData.inputs?.model;
        const apiDocs = nodeData.inputs?.apiDocs;
        const headers = nodeData.inputs?.headers;
        const urlPrompt = nodeData.inputs?.urlPrompt;
        const ansPrompt = nodeData.inputs?.ansPrompt;
        const chain = await getAPIChain(apiDocs, model, headers, urlPrompt, ansPrompt);
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        if (options.socketIO && options.socketIOClientId) {
            const handler = new handler_1.CustomChainHandler(options.socketIO, options.socketIOClientId, 2);
            const res = await chain.run(input, [loggerHandler, handler, ...callbacks]);
            return res;
        }
        else {
            const res = await chain.run(input, [loggerHandler, ...callbacks]);
            return res;
        }
    }
}
const getAPIChain = async (documents, llm, headers, urlPrompt, ansPrompt) => {
    const apiUrlPrompt = new prompts_1.PromptTemplate({
        inputVariables: ['api_docs', 'question'],
        template: urlPrompt ? urlPrompt : exports.API_URL_RAW_PROMPT_TEMPLATE
    });
    const apiResponsePrompt = new prompts_1.PromptTemplate({
        inputVariables: ['api_docs', 'question', 'api_url', 'api_response'],
        template: ansPrompt ? ansPrompt : exports.API_RESPONSE_RAW_PROMPT_TEMPLATE
    });
    const chain = chains_1.APIChain.fromLLMAndAPIDocs(llm, documents, {
        apiUrlPrompt,
        apiResponsePrompt,
        verbose: process.env.DEBUG === 'true' ? true : false,
        headers: typeof headers === 'object' ? headers : headers ? JSON.parse(headers) : {}
    });
    return chain;
};
module.exports = { nodeClass: GETApiChain_Chains };
//# sourceMappingURL=GETApiChain.js.map