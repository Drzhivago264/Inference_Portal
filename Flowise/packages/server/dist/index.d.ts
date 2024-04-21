import express from 'express';
import { Server } from 'socket.io';
import { DataSource } from 'typeorm';
import { IChatFlow } from './Interface';
import { NodesPool } from './NodesPool';
import { ChatflowPool } from './ChatflowPool';
import { CachePool } from './CachePool';
import { Telemetry } from './utils/telemetry';
declare global {
    namespace Express {
        interface Request {
            io?: Server;
        }
    }
}
export declare class App {
    app: express.Application;
    nodesPool: NodesPool;
    chatflowPool: ChatflowPool;
    cachePool: CachePool;
    telemetry: Telemetry;
    AppDataSource: DataSource;
    constructor();
    initDatabase(): Promise<void>;
    config(socketIO?: Server): Promise<void>;
    stopApp(): Promise<void>;
}
export declare function getAllChatFlow(): Promise<IChatFlow[]>;
export declare function start(): Promise<void>;
export declare function getInstance(): App | undefined;
