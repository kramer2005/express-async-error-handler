import { NextFunction, Request, Response } from "express"
import { errorHandlerFn } from "../middleware/AsyncErrorHandlerMiddleware"

const AsyncErrorHandler = () => {
  const errorHandledRoute = (target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>): any => {
      const fn = descriptor.value
      descriptor.value = async (req: Request, res: Response, next: NextFunction) => {
        try {
          await fn(req, res, next)
        } catch (error: any) {
          errorHandlerFn(error, req, res, next)
        }
      }
  }

  return errorHandledRoute
}

export default AsyncErrorHandler