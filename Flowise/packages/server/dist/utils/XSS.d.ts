import { Request, Response, NextFunction } from 'express';
export declare function sanitizeMiddleware(req: Request, res: Response, next: NextFunction): void;
export declare function getAllowedCorsOrigins(): string;
export declare function getCorsOptions(): any;
export declare function getAllowedIframeOrigins(): string;
