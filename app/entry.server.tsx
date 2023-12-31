import { PassThrough } from "node:stream"

import {
  createReadableStreamFromReadable,
  type HandleDocumentRequestFunction,
} from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import isbot from "isbot"
import { renderToPipeableStream } from "react-dom/server"
import { makeTimings } from "./utils/timing.server.ts"
import { NonceProvider } from "./utils/nonce-provider.ts"
import { getEnv, init } from "./utils/env.server.ts"
import { connect } from "./services/db.server.ts"

const ABORT_DELAY = 5_000

init()
global.ENV = getEnv()

await connect()

type DocRequestArgs = Parameters<HandleDocumentRequestFunction>

export default function handleRequest(...args: DocRequestArgs) {
  const [
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext,
  ] = args
  const callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady"

  if (process.env.NODE_ENV !== "production") {
    responseHeaders.set("Cache-Control", "no-store")
  }

  const nonce = String(loadContext.cspNonce) ?? undefined

  return new Promise(async (resolve, reject) => {
    let didError = false
    // NOTE: this timing will only include things that are rendered in the shell
    // and will not include suspended components and deferred loaders
    const timings = makeTimings("render", "renderToPipeableStream")

    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={nonce}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </NonceProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough()
          responseHeaders.set("Content-Type", "text/html")
          responseHeaders.append("Server-Timing", timings.toString())
          resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          )
          pipe(body)
        },
        onShellError: (err: unknown) => {
          reject(err)
        },
        onError: (error: unknown) => {
          didError = true

          console.error(error)
        },
        nonce,
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
