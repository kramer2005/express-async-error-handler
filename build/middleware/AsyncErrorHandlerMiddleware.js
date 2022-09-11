"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerFn = void 0;
let errorHandlerFn = (error, req, res, next) => next();
exports.errorHandlerFn = errorHandlerFn;
const AsyncErrorHandlerMiddleware = (errorHandler) => {
    exports.errorHandlerFn = errorHandler;
    return (req, res, next) => {
        next();
    };
};
exports.default = AsyncErrorHandlerMiddleware;
