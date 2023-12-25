import { z } from "zod"
import { blogDto } from "../schema.ts"
import { Blog } from "../model.server.ts"
import { NotFound } from "~/utils/error/index.ts"
import { invalidateBlogCache } from "~/utils/blog/blog.server.ts"
import calculateReadingTime from "reading-time"

// Create
export const createBlogDto = blogDto.pick({
  slug: true,
  title: true,
  desc: true,
  banner: true,
  content: true,
  tags: true,
  isFeatured: true,
})
export type CreateBlogDto = z.infer<typeof createBlogDto>

export async function createBlog(data: CreateBlogDto) {
  const blog = new Blog(data)

  blog.timeToRead = calculateReadingTime(data.content).minutes
  await blog.save()

  return blog
}

type EditBlog = {
  id: string
} & CreateBlogDto

export async function editBlog(data: EditBlog) {
  const { id, slug, ...rest } = data
  const blog = await Blog.findById(id)
  if (!blog) {
    throw new NotFound()
  }

  if (slug != blog.slug) blog.slug = slug
  Object.assign(blog, rest)

  blog.timeToRead = calculateReadingTime(rest.content).minutes

  await blog.save()
  await invalidateBlogCache({ slug: blog.slug })

  return blog
}
