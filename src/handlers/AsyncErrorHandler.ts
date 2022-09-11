import { NextFunction, Request, Response } from "express";
import { errorHandlerFn } from "../middleware/AsyncErrorHandlerMiddleware";

type WrapperType = (fn?: (req: Request, res: Response, next: NextFunction) => any) => any
type DecoratorType = () => any

const AsyncErrorHandler: (WrapperType | DecoratorType) = (fn) => {
  if (fn) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next)
      } catch (error: any) {
        errorHandlerFn(error, req, res, next)
      }
    }
  }

  return (target: Object,
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
}

export default AsyncErrorHandler