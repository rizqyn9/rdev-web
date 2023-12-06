export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forwarded-Host") ??
    request.headers.get("host") ??
    new URL(request.url).host
  const protocol = host.includes("localhost") ? "http" : "https"
  return `${protocol}://${host}`
}

function removeTrailingSlash(s: string) {
  return s.endsWith("/") ? s.slice(0, -1) : s
}

export function getOrigin(requestInfo?: { origin?: string; path: string }) {
  return requestInfo?.origin ?? "https://kentcdodds.com"
}

export function getUrl(requestInfo?: { origin: string; path: string }) {
  return removeTrailingSlash(
    `${getOrigin(requestInfo)}${requestInfo?.path ?? ""}`
  )
}
