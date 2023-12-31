import { z } from "zod"

const schema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"] as const),
  SESSION_SECRET: z.string(),
  MONGO_URI: z.string().min(1),
  IMAGEKIT_PUBLIC: z.string().min(1),
  IMAGEKIT_PRIVATE: z.string().min(1),
  IMAGEKIT_URI: z.string().min(1),
  IMAGEKIT_ID: z.string().min(1),
  CLOUDINARY_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  REDIS_URI: z.string().min(1),
  RESEND_API_KEY: z.string(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export function init() {
  const parsed = schema.safeParse(process.env)

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    )

    throw new Error("Invalid environment variables")
  }
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
  }
}

type ENV = ReturnType<typeof getEnv>

declare global {
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}
