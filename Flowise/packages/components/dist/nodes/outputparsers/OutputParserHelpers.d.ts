import { BaseOutputParser } from '@langchain/core/output_parsers';
import { BaseLanguageModel, BaseLanguageModelCallOptions } from '@langchain/core/language_models/base';
import { LLMChain } from 'langchain/chains';
import { ICommonObject } from '../../src';
export declare const CATEGORY = "Output Parsers";
export declare const formatResponse: (response: string | object) => string | object;
export declare const injectOutputParser: (outputParser: BaseOutputParser<unknown>, chain: LLMChain<string | object | BaseLanguageModel<any, BaseLanguageModelCallOptions>>, promptValues?: ICommonObject | undefined) => ICommonObject | undefined;
