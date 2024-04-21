import { Logger } from 'winston';
import { Server } from 'socket.io';
import { BaseCallbackHandler } from '@langchain/core/callbacks/base';
import { BaseTracer, Run } from '@langchain/core/tracers/base';
import { ChainValues } from '@langchain/core/utils/types';
import { ICommonObject, INodeData } from './Interface';
export declare class ConsoleCallbackHandler extends BaseTracer {
    name: "console_callback_handler";
    logger: Logger;
    protected persistRun(_run: Run): Promise<void>;
    constructor(logger: Logger);
    getParents(run: Run): Run[];
    getBreadcrumbs(run: Run): string;
    onChainStart(run: Run): void;
    onChainEnd(run: Run): void;
    onChainError(run: Run): void;
    onLLMStart(run: Run): void;
    onLLMEnd(run: Run): void;
    onLLMError(run: Run): void;
    onToolStart(run: Run): void;
    onToolEnd(run: Run): void;
    onToolError(run: Run): void;
    onAgentAction(run: Run): void;
}
/**
 * Custom chain handler class
 */
export declare class CustomChainHandler extends BaseCallbackHandler {
    name: string;
    isLLMStarted: boolean;
    socketIO: Server;
    socketIOClientId: string;
    skipK: number;
    returnSourceDocuments: boolean;
    cachedResponse: boolean;
    constructor(socketIO: Server, socketIOClientId: string, skipK?: number, returnSourceDocuments?: boolean);
    handleLLMStart(): void;
    handleLLMNewToken(token: string): void;
    handleLLMEnd(): void;
    handleChainEnd(outputs: ChainValues, _: string, parentRunId?: string): void | Promise<void>;
}
export declare const additionalCallbacks: (nodeData: INodeData, options: ICommonObject) => Promise<any>;
export declare class AnalyticHandler {
    nodeData: INodeData;
    options: ICommonObject;
    handlers: ICommonObject;
    constructor(nodeData: INodeData, options: ICommonObject);
    init(): Promise<void>;
    onChainStart(name: string, input: string, parentIds?: ICommonObject): Promise<ICommonObject>;
    onChainEnd(returnIds: ICommonObject, output: string | object, shutdown?: boolean): Promise<void>;
    onChainError(returnIds: ICommonObject, error: string | object, shutdown?: boolean): Promise<void>;
    onLLMStart(name: string, input: string, parentIds: ICommonObject): Promise<ICommonObject>;
    onLLMEnd(returnIds: ICommonObject, output: string): Promise<void>;
    onLLMError(returnIds: ICommonObject, error: string | object): Promise<void>;
    onToolStart(name: string, input: string | object, parentIds: ICommonObject): Promise<ICommonObject>;
    onToolEnd(returnIds: ICommonObject, output: string | object): Promise<void>;
    onToolError(returnIds: ICommonObject, error: string | object): Promise<void>;
}
