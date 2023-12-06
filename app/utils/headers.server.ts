import { HeadersFunction } from "@remix-run/node"

export const reuseUsefulLoaderHeaders: HeadersFunction = ({
  loaderHeaders,
  parentHeaders,
}) => {
  const headers = new Headers()
  const usefulHeaders = ["Cache-Control", "Vary", "Server-Timing"]
  for (const headerName of usefulHeaders) {
    if (loaderHeaders.has(headerName)) {
      headers.set(headerName, loaderHeaders.get(headerName)!)
    }
  }
  const appendHeaders = ["Server-Timing"]
  for (const headerName of appendHeaders) {
    if (parentHeaders.has(headerName)) {
      headers.append(headerName, parentHeaders.get(headerName)!)
    }
  }
  const useIfNotExistsHeaders = ["Cache-Control", "Vary"]
  for (const headerName of useIfNotExistsHeaders) {
    if (!headers.has(headerName) && parentHeaders.has(headerName)) {
      headers.set(headerName, parentHeaders.get(headerName)!)
    }
  }

  return headers
}
