/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
declare const _default: {
    createVariable: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteVariable: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllVariables: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    updateVariable: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
