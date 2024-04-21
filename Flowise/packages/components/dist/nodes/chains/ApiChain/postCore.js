"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIChain = exports.API_RESPONSE_RAW_PROMPT_TEMPLATE = exports.API_URL_RAW_PROMPT_TEMPLATE = void 0;
const chains_1 = require("langchain/chains");
const prompts_1 = require("@langchain/core/prompts");
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.API_URL_RAW_PROMPT_TEMPLATE = `You are given the below API Documentation:
{api_docs}
Using this documentation, generate a json string with two keys: "url" and "data".
The value of "url" should be a string, which is the API url to call for answering the user question.
The value of "data" should be a dictionary of key-value pairs you want to POST to the url as a JSON body.
Be careful to always use double quotes for strings in the json string.
You should build the json string in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.

Question:{question}
json string:`;
exports.API_RESPONSE_RAW_PROMPT_TEMPLATE = `${exports.API_URL_RAW_PROMPT_TEMPLATE} {api_url_body}

Here is the response from the API:

{api_response}

Summarize this response to answer the original question.

Summary:`;
const defaultApiUrlPrompt = new prompts_1.PromptTemplate({
    inputVariables: ['api_docs', 'question'],
    template: exports.API_URL_RAW_PROMPT_TEMPLATE
});
const defaultApiResponsePrompt = new prompts_1.PromptTemplate({
    inputVariables: ['api_docs', 'question', 'api_url_body', 'api_response'],
    template: exports.API_RESPONSE_RAW_PROMPT_TEMPLATE
});
class APIChain extends chains_1.BaseChain {
    get inputKeys() {
        return [this.inputKey];
    }
    get outputKeys() {
        return [this.outputKey];
    }
    constructor(fields) {
        super(fields);
        this.headers = {};
        this.inputKey = 'question';
        this.outputKey = 'output';
        this.apiRequestChain = fields.apiRequestChain;
        this.apiAnswerChain = fields.apiAnswerChain;
        this.apiDocs = fields.apiDocs;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.headers = fields.headers ?? this.headers;
    }
    /** @ignore */
    async _call(values, runManager) {
        try {
            const question = values[this.inputKey];
            const api_url_body = await this.apiRequestChain.predict({ question, api_docs: this.apiDocs }, runManager?.getChild());
            const { url, data } = JSON.parse(api_url_body);
            const res = await (0, node_fetch_1.default)(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            const api_response = await res.text();
            const answer = await this.apiAnswerChain.predict({ question, api_docs: this.apiDocs, api_url_body, api_response }, runManager?.getChild());
            return { [this.outputKey]: answer };
        }
        catch (error) {
            return { [this.outputKey]: error };
        }
    }
    _chainType() {
        return 'api_chain';
    }
    static async deserialize(data) {
        const { api_request_chain, api_answer_chain, api_docs } = data;
        if (!api_request_chain) {
            throw new Error('LLMChain must have api_request_chain');
        }
        if (!api_answer_chain) {
            throw new Error('LLMChain must have api_answer_chain');
        }
        if (!api_docs) {
            throw new Error('LLMChain must have api_docs');
        }
        return new APIChain({
            apiAnswerChain: await chains_1.LLMChain.deserialize(api_answer_chain),
            apiRequestChain: await chains_1.LLMChain.deserialize(api_request_chain),
            apiDocs: api_docs
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            api_answer_chain: this.apiAnswerChain.serialize(),
            api_request_chain: this.apiRequestChain.serialize(),
            api_docs: this.apiDocs
        };
    }
    static fromLLMAndAPIDocs(llm, apiDocs, options = {}) {
        const { apiUrlPrompt = defaultApiUrlPrompt, apiResponsePrompt = defaultApiResponsePrompt } = options;
        const apiRequestChain = new chains_1.LLMChain({ prompt: apiUrlPrompt, llm });
        const apiAnswerChain = new chains_1.LLMChain({ prompt: apiResponsePrompt, llm });
        return new this({
            apiAnswerChain,
            apiRequestChain,
            apiDocs,
            ...options
        });
    }
}
exports.APIChain = APIChain;
//# sourceMappingURL=postCore.js.map