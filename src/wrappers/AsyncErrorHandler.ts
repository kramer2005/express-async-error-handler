import { NextFunction, Request, Response } from "express"
import { errorHandlerFn } from "../middleware/AsyncErrorHandlerMiddleware"

const AsyncErrorHandler = (fn: (req: Request, res: Response, next: NextFunction) => any) => {
  const errorHandledRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error: any) {
      errorHandlerFn(error, req, res, next)
    }
  }

  return errorHandledRoute
}

export default AsyncErrorHandler