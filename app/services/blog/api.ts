import { z } from "zod"
import { Blog } from "./model.server.ts"

export const blogDto = z.object({
  slug: z.string(),
  content: z.string(),
})

export type BlogDto = z.infer<typeof blogDto>

export async function createBlog(blog: BlogDto) {
  const newBlog = new Blog(blog)

  return newBlog
}
