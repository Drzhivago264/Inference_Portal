import { Server } from 'socket.io';
export declare abstract class Moderation {
    abstract checkForViolations(input: string): Promise<string>;
}
export declare const checkInputs: (inputModerations: Moderation[], input: string) => Promise<string>;
export declare const streamResponse: (isStreaming: any, response: string, socketIO: Server, socketIOClientId: string) => void;
