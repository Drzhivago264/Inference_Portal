import { ChatFlow } from '../database/entities/ChatFlow';
export declare const containsBase64File: (chatflow: ChatFlow) => boolean;
export declare const updateFlowDataWithFilePaths: (chatflowid: string, flowData: string) => string;
