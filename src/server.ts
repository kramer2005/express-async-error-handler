import express from 'express'
import { AsyncErrorHandler, AsyncErrorHandlerMiddleware } from '.'

export const app = express()

app.use(AsyncErrorHandlerMiddleware(
  (err, req, res) => {
    res.sendStatus(200)
  }
))

const unresolvedPromise = async () => {
  throw new Error("ERROR")
}

app.get("/wrapper", AsyncErrorHandler(async (req, res) => {
  await unresolvedPromise()
}))

class Controller {

  @AsyncErrorHandler()
  async home() {
    await unresolvedPromise()
  }

}

app.get("/decorator", (new Controller).home)
