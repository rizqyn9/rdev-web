export class ApiError extends Error {}

export class NotFound extends ApiError {}

export function getErrorMessage(err: unknown) {
  let msg = "Unhandled error"
  if (err instanceof Error) {
    msg = err.message
  } else if (err) {
    msg = String(err)
  }
  return msg
}
