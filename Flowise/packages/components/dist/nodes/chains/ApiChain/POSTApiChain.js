"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@langchain/core/prompts");
const postCore_1 = require("./postCore");
const handler_1 = require("../../../src/handler");
const utils_1 = require("../../../src/utils");
class POSTApiChain_Chains {
    constructor() {
        this.label = 'POST API Chain';
        this.name = 'postApiChain';
        this.version = 1.0;
        this.type = 'POSTApiChain';
        this.icon = 'post.svg';
        this.category = 'Chains';
        this.description = 'Chain to run queries against POST API';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(postCore_1.APIChain)];
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
                default: postCore_1.API_URL_RAW_PROMPT_TEMPLATE,
                rows: 4,
                additionalParams: true
            },
            {
                label: 'Answer Prompt',
                name: 'ansPrompt',
                type: 'string',
                description: 'Prompt used to tell LLMs how to return the API response. Must contains {api_response}, {api_url}, and {question}',
                default: postCore_1.API_RESPONSE_RAW_PROMPT_TEMPLATE,
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
        template: urlPrompt ? urlPrompt : postCore_1.API_URL_RAW_PROMPT_TEMPLATE
    });
    const apiResponsePrompt = new prompts_1.PromptTemplate({
        inputVariables: ['api_docs', 'question', 'api_url_body', 'api_response'],
        template: ansPrompt ? ansPrompt : postCore_1.API_RESPONSE_RAW_PROMPT_TEMPLATE
    });
    const chain = postCore_1.APIChain.fromLLMAndAPIDocs(llm, documents, {
        apiUrlPrompt,
        apiResponsePrompt,
        verbose: process.env.DEBUG === 'true' ? true : false,
        headers: typeof headers === 'object' ? headers : headers ? JSON.parse(headers) : {}
    });
    return chain;
};
module.exports = { nodeClass: POSTApiChain_Chains };
//# sourceMappingURL=POSTApiChain.js.map