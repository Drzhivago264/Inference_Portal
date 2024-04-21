import { Tool } from '@langchain/core/tools';
export declare const desc = "A portal to the internet. Use this when you need to get specific content from a website. \nInput should be a  url (i.e. https://www.google.com). The output will be the text response of the GET request.";
export interface Headers {
    [key: string]: string;
}
export interface RequestParameters {
    headers?: Headers;
    url?: string;
    description?: string;
    maxOutputLength?: number;
}
export declare class RequestsGetTool extends Tool {
    name: string;
    url: string;
    description: string;
    maxOutputLength: number;
    headers: {};
    constructor(args?: RequestParameters);
    /** @ignore */
    _call(input: string): Promise<string>;
}
