import express, { Request, Response } from 'express'
import { AsyncErrorHandlerMiddleware } from "../../src";
import test from 'ava';
import axios from 'axios'
import AsyncErrorHandler from '../../src/decorators/AsyncErrorHandler';

const app = express()

app.use(AsyncErrorHandlerMiddleware(
  (err, req, res) => {
    res.sendStatus(200)
  }
))

const unresolvedPromise = async () => {
  throw new Error("ERROR")
}

class Controller {
  @AsyncErrorHandler()
  async home(req: Request, res: Response) {
    await unresolvedPromise()
  }
}

const controller = new Controller

app.get("/", controller.home)

const server = app.listen(2048)

test("async decorator should return 200", async (t) => {
  await axios.get("http://localhost:2048/").then(it => {
    t.assert(it.status === 200)
  })
  server.close()
})
