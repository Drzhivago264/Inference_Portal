import { GoogleLLMResponse } from "../types.js";
export declare class GoogleAISafetyError extends Error {
    response: GoogleLLMResponse;
    reply: any;
    constructor(response: GoogleLLMResponse, message?: string);
}
