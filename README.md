# Express Async Error Handler

[![Node.js CI](https://github.com/kramer2005/express-async-error-handler/actions/workflows/test.yaml/badge.svg)](https://github.com/kramer2005/express-async-error-handler/actions/workflows/test.yaml)

## Table of Contents  
[About](#about)  
[Setup](#setup)
- [Middleware](#middleware)
- [Wrapper](#wrapper)
- [Decorator](#decorator)

## About
This package implements a async error handler.

When you have unhandled promises inside Express routes, if no handler is used, you're server will probably crash if they throw an error. In those cases, you can use this package.

## Setup
### Middleware

First you need to create a generic handler function with the following signature:

```js
  (error: Error, req: Request, res: Response, next: NextFunction) => any
```

Example:
```js
  const handleErrorFunction = (error, req, res) => {
    res.status(500).send({error: error.message})
  }
```

Then you need to setup the middleware, as follows:

```js
  app.use(AsyncErrorHandlerMiddleware(handleErrorFunction))
```

### Wrapper

If you're not using classes for your routes, you can use as a wrapper function, example:

```js
  app.get("/", AsyncErrorHandler(
    async (req, res) => {
      res.send("OK")
    }
  ))
```

### Decorator

If you're using classes for your routes, you can use as a decorator, example:

```js
class Controller {
  
  @AsyncErrorHandler()
  async home(req, res) {
    res.send("OK")
  }

}
```