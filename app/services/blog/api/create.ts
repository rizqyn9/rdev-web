import { z } from "zod"
import { blogDto } from "../schema.ts"
import { Blog } from "../model.server.ts"

// Create
const createBlogDto = blogDto.pick({
  slug: true,
  title: true,
  desc: true,
  banner: true,
  content: true,
  tags: true,
  isFeatured: true,
})
export type CreateBlogDto = z.infer<typeof createBlogDto>

export async function createBlog(blog: CreateBlogDto) {
  const newBlog = new Blog(blog)

  await newBlog.save()

  return newBlog
}
