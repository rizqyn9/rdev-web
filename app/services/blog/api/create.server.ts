import { z } from "zod"
import { blogDto } from "../schema.ts"
import { Blog } from "../model.server.ts"
import { NotFound } from "~/utils/error/index.ts"
import { invalidateBlogCache } from "~/utils/blog/blog.server.ts"

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

type EditBlog = {
  id: string
  content: string
}

export async function editBlog(data: EditBlog) {
  const blog = await Blog.findById(data.id)
  if (!blog) {
    throw new NotFound()
  }

  blog.content = data.content

  await blog.save()
  await invalidateBlogCache({ slug: blog.slug })

  return blog
}
