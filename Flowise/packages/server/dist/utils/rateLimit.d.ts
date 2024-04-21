import { NextFunction, Request, Response } from 'express';
import { IChatFlow } from '../Interface';
export declare function getRateLimiter(req: Request, res: Response, next: NextFunction): void;
export declare function createRateLimiter(chatFlow: IChatFlow): Promise<void>;
export declare function initializeRateLimiter(chatFlowPool: IChatFlow[]): Promise<void>;
