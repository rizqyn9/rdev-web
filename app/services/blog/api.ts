import { z } from "zod"
import { Blog } from "./model.server.ts"

export const blogDto = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  tags: z.array(z.string()).default([]),
})

export type BlogDto = z.infer<typeof blogDto>

export async function createBlog(blog: BlogDto) {
  const newBlog = new Blog(blog)

  await newBlog.save().catch((err: Error) => {
    console.log(err.message)
  })

  return newBlog
}

export async function blogList() {
  const blogs = await Blog.find({})
  return blogs.map((x) => ({
    id: x._id.toString(),
    title: x.title,
    slug: x.slug,
    content: x.content,
  }))
}
