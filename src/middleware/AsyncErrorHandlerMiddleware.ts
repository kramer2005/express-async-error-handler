import { NextFunction, Request, Response } from "express"

export let errorHandlerFn = (error: Error, req: Request, res: Response, next: NextFunction) => next()

const AsyncErrorHandlerMiddleware = (errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => void) => {
  errorHandlerFn = errorHandler
  return (req: Request, res: Response, next: NextFunction) => {
    next()
  }
}

export default AsyncErrorHandlerMiddleware