import { Request } from 'express';
/**
 * Upsert documents
 * @param {Request} req
 * @param {boolean} isInternal
 */
export declare const upsertVector: (req: Request, isInternal?: boolean) => Promise<any>;
