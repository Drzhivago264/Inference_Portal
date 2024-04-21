import { Request } from 'express';
import { ChatFlow } from '../database/entities/ChatFlow';
/**
 * Validate API Key
 * @param {Request} req
 * @param {Response} res
 * @param {ChatFlow} chatflow
 */
export declare const utilValidateKey: (req: Request, chatflow: ChatFlow) => Promise<boolean>;
