import { Request } from 'express';
import { Server } from 'socket.io';
/**
 * Build Chatflow
 * @param {Request} req
 * @param {Server} socketIO
 * @param {boolean} isInternal
 */
export declare const utilBuildChatflow: (req: Request, socketIO?: Server, isInternal?: boolean) => Promise<any>;
