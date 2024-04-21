import { NextFunction, Request, Response } from 'express';
declare const logger: import("winston").Logger;
/**
 * This function is used by express as a middleware.
 * @example
 *   this.app = express()
 *   this.app.use(expressRequestLogger)
 */
export declare function expressRequestLogger(req: Request, res: Response, next: NextFunction): void;
export default logger;
