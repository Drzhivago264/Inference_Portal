import { Tool } from '@langchain/core/tools';
export declare const desc = "Use this when you want to POST to a website.\nInput should be a json string with two keys: \"url\" and \"data\".\nThe value of \"url\" should be a string, and the value of \"data\" should be a dictionary of \nkey-value pairs you want to POST to the url as a JSON body.\nBe careful to always use double quotes for strings in the json string\nThe output will be the text response of the POST request.";
export interface Headers {
    [key: string]: string;
}
export interface Body {
    [key: string]: any;
}
export interface RequestParameters {
    headers?: Headers;
    body?: Body;
    url?: string;
    description?: string;
    maxOutputLength?: number;
}
export declare class RequestsPostTool extends Tool {
    name: string;
    url: string;
    description: string;
    maxOutputLength: number;
    headers: {};
    body: {};
    constructor(args?: RequestParameters);
    /** @ignore */
    _call(input: string): Promise<string>;
}
