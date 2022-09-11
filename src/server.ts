import express from 'express'
import { AsyncErrorHandlerDecorator, AsyncErrorHandlerMiddleware, AsyncErrorHandlerWrapper } from '.'

export const app = express()

app.use(AsyncErrorHandlerMiddleware(
  (err, req, res) => {
    res.sendStatus(200)
  }
))

const unresolvedPromise = async () => {
  throw new Error("ERROR")
}

app.get("/wrapper", AsyncErrorHandlerWrapper(async (req, res) => {
  await unresolvedPromise()
}))

class Controller {

  @AsyncErrorHandlerDecorator()
  async home() {
    await unresolvedPromise()
  }

}

app.get("/decorator", (new Controller).home)
