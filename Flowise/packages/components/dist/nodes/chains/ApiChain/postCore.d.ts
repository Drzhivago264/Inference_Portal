import { BaseLanguageModel } from '@langchain/core/language_models/base';
import { CallbackManagerForChainRun } from '@langchain/core/callbacks/manager';
import { BaseChain, ChainInputs, LLMChain, SerializedAPIChain } from 'langchain/chains';
import { BasePromptTemplate } from '@langchain/core/prompts';
import { ChainValues } from '@langchain/core/utils/types';
export declare const API_URL_RAW_PROMPT_TEMPLATE = "You are given the below API Documentation:\n{api_docs}\nUsing this documentation, generate a json string with two keys: \"url\" and \"data\".\nThe value of \"url\" should be a string, which is the API url to call for answering the user question.\nThe value of \"data\" should be a dictionary of key-value pairs you want to POST to the url as a JSON body.\nBe careful to always use double quotes for strings in the json string.\nYou should build the json string in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.\n\nQuestion:{question}\njson string:";
export declare const API_RESPONSE_RAW_PROMPT_TEMPLATE: string;
export interface APIChainInput extends Omit<ChainInputs, 'memory'> {
    apiAnswerChain: LLMChain;
    apiRequestChain: LLMChain;
    apiDocs: string;
    inputKey?: string;
    headers?: Record<string, string>;
    /** Key to use for output, defaults to `output` */
    outputKey?: string;
}
export type APIChainOptions = {
    headers?: Record<string, string>;
    apiUrlPrompt?: BasePromptTemplate;
    apiResponsePrompt?: BasePromptTemplate;
};
export declare class APIChain extends BaseChain implements APIChainInput {
    apiAnswerChain: LLMChain;
    apiRequestChain: LLMChain;
    apiDocs: string;
    headers: {};
    inputKey: string;
    outputKey: string;
    get inputKeys(): string[];
    get outputKeys(): string[];
    constructor(fields: APIChainInput);
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "api_chain";
    static deserialize(data: SerializedAPIChain): Promise<APIChain>;
    serialize(): SerializedAPIChain;
    static fromLLMAndAPIDocs(llm: BaseLanguageModel, apiDocs: string, options?: APIChainOptions & Omit<APIChainInput, 'apiAnswerChain' | 'apiRequestChain' | 'apiDocs'>): APIChain;
}
