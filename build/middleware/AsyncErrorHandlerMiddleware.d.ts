import { NextFunction, Request, Response } from "express";
export declare let errorHandlerFn: (error: Error, req: Request, res: Response, next: NextFunction) => void;
declare const AsyncErrorHandlerMiddleware: (errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => void;
export default AsyncErrorHandlerMiddleware;
