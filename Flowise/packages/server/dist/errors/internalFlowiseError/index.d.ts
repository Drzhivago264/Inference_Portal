export declare class InternalFlowiseError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
