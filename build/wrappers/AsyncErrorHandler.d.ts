import { NextFunction, Request, Response } from "express";
declare const AsyncErrorHandler: (fn: (req: Request, res: Response, next: NextFunction) => any) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default AsyncErrorHandler;
