import { NextFunction, Request, Response } from 'express';
import { InternalFlowiseError } from '../../errors/internalFlowiseError';
declare function errorHandlerMiddleware(err: InternalFlowiseError, req: Request, res: Response, next: NextFunction): Promise<void>;
export default errorHandlerMiddleware;
