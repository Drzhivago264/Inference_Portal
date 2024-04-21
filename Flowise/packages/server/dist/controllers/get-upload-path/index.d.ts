/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getPathForUploads: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
