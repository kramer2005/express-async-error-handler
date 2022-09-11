import AsyncErrorHandler from "../../src/wrappers/AsyncErrorHandler";
import express from 'express'
import { AsyncErrorHandlerMiddleware } from "../../src";
import test from 'ava';
import axios from 'axios'

const app = express()

app.use(AsyncErrorHandlerMiddleware(
  (err, req, res) => {
    res.sendStatus(200)
  }
))

const unresolvedPromise = async () => {
  throw new Error("ERROR")
}

app.get("/", AsyncErrorHandler(async (req, res) => {
  await unresolvedPromise()
}))

const server = app.listen(2048)

test("async wrapper should return 200", async (t) => {
  await axios.get("http://localhost:2048/").then(it => {
    t.assert(it.status === 200)
  })
  server.close()
})
